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

  {article.references && (
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
