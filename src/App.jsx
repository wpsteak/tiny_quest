import { useEffect, useReducer } from "react";
import { levels } from "./data/levels.js";
import { chapters } from "./data/chapters.js";
import {
  reducer,
  createInitialState,
  hydrateState,
  persistableState
} from "./state/reducer.js";
import { loadStoredState, saveStoredState, clearStoredState } from "./state/storage.js";
import Sidebar from "./components/Sidebar.jsx";
import StageHeader from "./components/StageHeader.jsx";
import TaskActionBar from "./components/TaskActionBar.jsx";
import ExplainPanel from "./components/ExplainPanel.jsx";
import GamePanel from "./components/GamePanel.jsx";

const params = new URLSearchParams(window.location.search);
const isDevMode = params.get("dev") === "1";
const requestedLevel = (() => {
  const n = Number(params.get("level"));
  return Number.isInteger(n) ? n - 1 : null;
})();

function init() {
  const initial = createInitialState({ devMode: isDevMode, requestedLevel });
  const stored = loadStoredState();
  if (isDevMode) return initial;
  return hydrateState(initial, stored);
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const level = levels[state.currentLevel];
  const isExplain = level.mode === "explain";
  const isCompleted = state.completedLevels.includes(state.currentLevel);

  useEffect(() => {
    saveStoredState(persistableState(state));
  }, [state]);

  useEffect(() => {
    document.body.classList.toggle("mode-explain", isExplain);
  }, [isExplain]);

  useEffect(() => {
    if (!isDevMode) return;
    const url = new URL(window.location.href);
    url.searchParams.set("level", String(state.currentLevel + 1));
    window.history.replaceState(null, "", url.toString());
  }, [state.currentLevel]);

  function handleResetAll() {
    if (!window.confirm("整個重來會清掉所有章節進度與作答狀態。確定？")) return;
    clearStoredState();
    window.location.reload();
  }

  function handleNavigate(levelIndex) {
    dispatch({ type: "NAVIGATE", levelIndex });
  }

  function handleToggleChapter(ci) {
    dispatch({ type: "TOGGLE_CHAPTER", ci });
  }

  function handleMainAction() {
    if (level.mode === "sort" && !isCompleted) {
      dispatch({ type: "CHECK" });
    } else {
      dispatch({ type: "ADVANCE" });
    }
  }

  function handleMoveTile(itemId, zoneId) {
    dispatch({ type: "MOVE_TILE", itemId, zoneId });
  }

  function handleSelectTile(itemId) {
    dispatch({ type: "SELECT_TILE", itemId });
  }

  const isLast = state.currentLevel === levels.length - 1;
  const needsValidation = level.mode === "sort" && !isCompleted;
  const completedFinal = state.feedback.kind === "completed";

  let mainLabel;
  if (needsValidation) mainLabel = "驗證";
  else if (isLast) mainLabel = "完成";
  else mainLabel = level.mode === "explain" ? "繼續" : "下一關";

  return (
    <main className="app-shell">
      <Sidebar
        chapters={chapters}
        levels={levels}
        currentLevel={state.currentLevel}
        chapterProgress={state.chapterProgress}
        expandedChapters={state.expandedChapters}
        onNavigate={handleNavigate}
        onToggleChapter={handleToggleChapter}
        onResetAll={handleResetAll}
      />
      <section className="stage" aria-live="polite">
        <StageHeader level={level} index={state.currentLevel} total={levels.length} />
        {!isExplain && (
          <TaskActionBar
            level={level}
            feedback={state.feedback}
            mainLabel={mainLabel}
            mainDisabled={completedFinal}
            onMainAction={handleMainAction}
            isDevMode={isDevMode}
          />
        )}
        {isExplain ? (
          <ExplainPanel level={level} index={state.currentLevel} total={levels.length} />
        ) : (
          <GamePanel
            level={level}
            placements={state.gameStates[state.currentLevel] || {}}
            selectedTileId={state.selectedTileId}
            feedback={state.feedback}
            isLocked={isCompleted}
            onMoveTile={handleMoveTile}
            onSelectTile={handleSelectTile}
          />
        )}
        {isExplain && (
          <footer className="stage-footer">
            <div className="footer-actions">
              <button
                className="primary-button"
                type="button"
                onClick={handleMainAction}
                disabled={completedFinal}
              >
                {mainLabel}
              </button>
            </div>
          </footer>
        )}
      </section>
    </main>
  );
}
