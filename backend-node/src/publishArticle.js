import axios from "axios";

export async function publishArticle(original, content) {
  return axios.post(`${process.env.LARAVEL_API}/articles`, {
    title: `${original.title} (Updated)`,
    slug: `${original.slug}-updated`,
    content,
    source_url: `https://internal.local/articles/${original.id}`,
    type: "updated"
  });
}
