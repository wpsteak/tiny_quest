export default function StageHeader({ level, index, total }) {
  const progress = ((index + 1) / total) * 100;
  return (
    <header className="stage-header">
      <div>
        <p className="eyebrow">{level.type}</p>
        <h2>{level.title}</h2>
      </div>
      <div className="progress-wrap" aria-label="關卡進度">
        <span>{index + 1} / {total}</span>
        <div className="progress-track">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </header>
  );
}
