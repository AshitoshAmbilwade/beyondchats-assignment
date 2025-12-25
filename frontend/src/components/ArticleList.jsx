import { useEffect, useState } from "react";
import { fetchArticles } from "../api/articles";
import ArticleCard from "./ArticleCard";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles()
      .then((res) => setArticles(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="loading">Loading articles...</p>;

  return (
    <div className="grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
