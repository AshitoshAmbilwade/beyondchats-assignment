import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// resolve absolute path to .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("ENV FILE PATH:", path.resolve(__dirname, "../.env"));
console.log("Laravel API:", process.env.LARAVEL_API);

import { fetchLatestArticle } from "./fetchLatestArticle.js";
import { googleSearch } from "./googleSearch.js";
import { scrapeArticle } from "./scrapeArticle.js";
import { rewriteWithLLM } from "./rewriteWithLLM.js";
import { publishArticle } from "./publishArticle.js";

async function run() {
  const article = await fetchLatestArticle();
  console.log("Fetched:", article.title);

  const links = await googleSearch(article.title);

  for (const link of links) {
    await scrapeArticle(link);
  }

  const updatedContent = await rewriteWithLLM(article, links);
  await publishArticle(article, updatedContent);

  console.log("✅ Updated article published");
}

run();
