<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Carbon\Carbon;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape 5 oldest blog articles from BeyondChats (listing-only strategy)';

    public function handle()
    {
        $this->info('Scraping 5 oldest BeyondChats articles (listing-only)...');

        $baseUrl = 'https://beyondchats.com/blogs/';
        $response = Http::get($baseUrl);

        if (!$response->successful()) {
            $this->error('Failed to load blogs page');
            return;
        }

        $crawler = new Crawler($response->body());

        // Detect last page
        $lastPage = collect(
            $crawler->filter('a')->each(fn($n) =>
                preg_match('#/blogs/page/(\d+)/#', $n->attr('href') ?? '', $m) ? (int)$m[1] : null
            )
        )->filter()->max() ?? 1;

        $this->info("Detected last page: {$lastPage}");

        $articles = collect();

        // Crawl from last page backwards
        for ($page = $lastPage; $page >= 1; $page--) {
            $url = $page === 1 ? $baseUrl : "{$baseUrl}page/{$page}/";
            $this->line("Scanning: {$url}");

            $res = Http::get($url);
            if (!$res->successful()) continue;

            $pageCrawler = new Crawler($res->body());

            $pageCrawler->filter('article')->each(function (Crawler $node) use (&$articles) {
                try {
                    $linkNode = $node->filter('a')->first();
                    $url = $linkNode->attr('href');

                    if (
                        !str_starts_with($url, 'https://beyondchats.com/blogs/') ||
                        str_contains($url, '/tag/') ||
                        str_contains($url, '/page/')
                    ) return;

                    $title = trim($node->filter('h2, h3')->first()->text());

                    $dateText = $node->filter('time')->count()
                        ? $node->filter('time')->text()
                        : null;

                    $date = $dateText ? Carbon::parse($dateText) : Carbon::now();

                    $excerpt = $node->filter('p')->count()
                        ? trim($node->filter('p')->first()->text())
                        : null;

                    $articles->push([
                        'title' => $title,
                        'url'   => $url,
                        'date'  => $date,
                        'excerpt' => $excerpt,
                    ]);

                } catch (\Throwable $e) {
                    // skip broken cards
                }
            });
        }

        // Take oldest 5
        $oldestFive = $articles
            ->unique('url')
            ->sortBy('date')
            ->take(5);

        // Store in DB
        $this->info('Saving articles into database...');

        foreach ($oldestFive as $item) {

            if (Article::where('source_url', $item['url'])->exists()) {
                $this->line("Skipped (exists): {$item['url']}");
                continue;
            }

            Article::create([
                'title'      => $item['title'],
                'slug'       => Str::slug($item['title']),
                'content'    => $item['excerpt'] ?? 'Content intentionally skipped in Phase 1.',
                'source_url' => $item['url'],
                'type'       => 'original',
            ]);

            $this->info("Saved: {$item['title']}");
        }

        $this->info('✅ Phase 1 scraping completed.');
    }
}
