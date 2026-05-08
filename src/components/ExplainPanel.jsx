export default function ExplainPanel({ level, index, total }) {
  return (
    <article className="explain-panel">
      <header className="explain-head">
        <h2>{level.title}</h2>
        <span className="explain-progress">{index + 1} / {total}</span>
      </header>
      <div className="explain-body" dangerouslySetInnerHTML={{ __html: level.html }} />
    </article>
  );
}
