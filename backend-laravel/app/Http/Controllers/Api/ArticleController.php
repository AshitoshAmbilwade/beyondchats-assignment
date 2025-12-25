<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        return response()->json(
            Article::orderBy('created_at', 'asc')->get()
        );
    }

    // GET /api/articles/{id}
    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    // POST /api/articles
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'      => 'required|string',
            'slug'       => 'required|string|unique:articles,slug',
            'content'    => 'nullable|string',
            'source_url' => 'required|url|unique:articles,source_url',
            'type'       => 'in:original,updated',
        ]);

        $article = Article::create($data);

        return response()->json($article, 201);
    }

    // PUT /api/articles/{id}
    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $data = $request->validate([
            'title'   => 'sometimes|string',
            'content' => 'sometimes|string',
            'type'    => 'in:original,updated',
        ]);

        $article->update($data);

        return response()->json($article);
    }

    // DELETE /api/articles/{id}
    public function destroy($id)
    {
        Article::findOrFail($id)->delete();

        return response()->json(['message' => 'Article deleted']);
    }
}
