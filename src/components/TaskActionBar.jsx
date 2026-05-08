export default function TaskActionBar({
  level,
  feedback,
  mainLabel,
  mainDisabled,
  onMainAction,
  isDevMode
}) {
  const showHint = feedback.kind !== "idle";
  const tone = feedback.kind === "fail" ? "bad" : feedback.kind === "success" || feedback.kind === "completed" ? "done" : "";
  const devPrefix = isDevMode ? "[測試模式] " : "";

  return (
    <section className={`task-action-bar ${tone}`.trim()}>
      <div className="task-text-block">
        {level.context && (
          <div className="task-row">
            <span className="task-label task-label-context">需求場景</span>
            <p dangerouslySetInnerHTML={{ __html: `${devPrefix}${level.context}` }} />
          </div>
        )}
        <div className="task-row">
          <span className="task-label task-label-goal">指引</span>
          <p
            dangerouslySetInnerHTML={{
              __html: level.context
                ? level.goal || ""
                : `${devPrefix}${level.goal || "閱讀說明後進入下一關。"}`
            }}
          />
        </div>
        {showHint && <p className="task-hint">{feedback.message}</p>}
      </div>
      <button className="primary-button" type="button" onClick={onMainAction} disabled={mainDisabled}>
        {mainLabel}
      </button>
    </section>
  );
}
