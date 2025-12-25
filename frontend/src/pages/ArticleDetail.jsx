import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api/articles"; // adjust path if needed

const ArticleDetail = () => {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await fetchArticleById(id);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  // ---- states ----
  if (loading) {
    return (
      <main className="container">
        <p>Loading article...</p>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="container">
        <h2>Article not found</h2>
      </main>
    );
  }

  // ---- success ----
  return (
    <main className="container">
      <h1>{article.title}</h1>

      <span className={`badge ${article.type}`}>
        {article.type}
      </span>

      <div className="content">
        {article.content.split("\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {article.references?.length > 0 && (
        <>
          <h3 style={{ marginTop: "40px" }}>References</h3>
          <ul>
            {article.references.map((ref, i) => (
              <li key={i}>
                <a href={ref} target="_blank" rel="noreferrer">
                  {ref}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
};

export default ArticleDetail;
