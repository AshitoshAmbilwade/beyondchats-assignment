import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div className={`card ${article.type}`}>
      <div className="card-header">
        <h3>{article.title}</h3>
        <span className={`badge ${article.type}`}>
          {article.type}
        </span>
      </div>

      <p className="excerpt">
        {article.content.slice(0, 140)}...
      </p>

      <Link to={`/articles/${article.id}`} className="read-more">
        Read full article →
      </Link>
    </div>
  );
}
