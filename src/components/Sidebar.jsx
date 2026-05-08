import { getChapterRange } from "../data/chapters.js";

export default function Sidebar({
  chapters,
  levels,
  currentLevel,
  chapterProgress,
  expandedChapters,
  onNavigate,
  onToggleChapter,
  onResetAll
}) {
  return (
    <aside className="lesson-nav" aria-label="關卡導覽">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">M</span>
        <div>
          <h1>模組化小屋</h1>
          <p>從空間整理學程式設計</p>
        </div>
      </div>
      <ol className="level-list">
        {chapters.map((chapter, ci) => {
          const { start, end } = getChapterRange(ci);
          const isExpanded = expandedChapters.includes(ci);
          const containsCurrent = currentLevel >= start && currentLevel <= end;
          return (
            <li key={ci} className="chapter">
              <button
                type="button"
                className="chapter-toggle"
                aria-expanded={isExpanded}
                aria-current={containsCurrent}
                onClick={() => onToggleChapter(ci)}
              >
                <span className="chapter-chevron" aria-hidden="true">{isExpanded ? "▾" : "▸"}</span>
                <span className="chapter-name">{chapter.name}</span>
                <span className="chapter-badge">{end - start + 1}</span>
              </button>
              {isExpanded && (
                <ol className="chapter-levels">
                  {levels.slice(start, end + 1).map((level, offset) => {
                    const i = start + offset;
                    const isUnlocked = i <= chapterProgress[ci];
                    const isExplain = level.mode === "explain";
                    return (
                      <li key={i}>
                        <button
                          type="button"
                          className={`level-button ${isExplain ? "is-explain" : "is-sort"}`}
                          disabled={!isUnlocked}
                          aria-current={i === currentLevel}
                          onClick={() => isUnlocked && onNavigate(i)}
                        >
                          <span className="level-num">{i + 1}</span>
                          <span className="level-title">{level.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
      <div className="nav-actions">
        <button type="button" className="text-button" onClick={onResetAll}>整個重來</button>
      </div>
    </aside>
  );
}
