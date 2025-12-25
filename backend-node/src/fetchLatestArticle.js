import axios from "axios";

export async function fetchLatestArticle() {
  const baseUrl = process.env.LARAVEL_API ||"http://127.0.0.1:8000/api";

  if (!baseUrl) {
    throw new Error("LARAVEL_API is undefined. Check .env loading.");
  }

  const res = await axios.get(`${baseUrl}/articles`);

  if (!res.data || res.data.length === 0) {
    throw new Error("No articles found in Laravel API");
  }

  // latest = last created
  return res.data[res.data.length - 1];
}
