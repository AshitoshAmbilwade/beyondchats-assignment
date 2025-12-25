import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  // ❌ skip placeholder or invalid domains
  if (
    !url ||
    url.includes("example.com") ||
    !url.startsWith("http")
  ) {
    console.log("⏭️ Skipping invalid URL:", url);
    return null;
  }

  try {
    const { data } = await axios.get(url, {
      timeout: 5000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });

    const $ = cheerio.load(data);
    const text = $("p")
      .map((_, el) => $(el).text())
      .get()
      .join("\n");

    return text.slice(0, 5000); // safety cap
  } catch (err) {
    console.log("⚠️ Failed to scrape:", url);
    return null;
  }
}
