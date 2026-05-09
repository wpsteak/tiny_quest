import { levels } from "../data/levels.js";
import { chapters, getChapterRange, getChapterIndexOfLevel } from "../data/chapters.js";

export function getLevelItems(level) {
  if (level.cumulativeFrom !== undefined) {
    return [
      ...getLevelItems(levels[level.cumulativeFrom]),
      ...(level.newItems || [])
    ];
  }
  return level.items || [];
}

export function getTargetForLevel(level, item) {
  return (level.overrides && level.overrides[item.id]) || item.target;
}

export function getInitialPlacements(level, gameStates) {
  const items = getLevelItems(level);
  if (level.cumulativeFrom !== undefined) {
    const previousState = gameStates[level.cumulativeFrom] || {};
    const newItemIds = new Set((level.newItems || []).map((newItem) => newItem.id));
    return items.reduce((placements, item) => {
      placements[item.id] = newItemIds.has(item.id)
        ? "source"
        : previousState[item.id] || getTargetForLevel(level, item);
      return placements;
    }, {});
  }
  return items.reduce((placements, item) => {
    placements[item.id] = level.initialPlacements?.[item.id] || "source";
    return placements;
  }, {});
}

function dependsOn(levelIndex, ancestor) {
  let current = levelIndex;
  while (current !== undefined) {
    const cf = levels[current] && levels[current].cumulativeFrom;
    if (cf === undefined) return false;
    if (cf === ancestor) return true;
    current = cf;
  }
  return false;
}

function invalidateDownstream(state, ancestor) {
  let nextGameStates = state.gameStates;
  let nextCompleted = state.completedLevels;
  for (let i = ancestor + 1; i < levels.length; i += 1) {
    if (dependsOn(i, ancestor)) {
      if (nextGameStates[i] !== undefined) {
        if (nextGameStates === state.gameStates) nextGameStates = { ...state.gameStates };
        delete nextGameStates[i];
      }
      if (nextCompleted.includes(i)) {
        if (nextCompleted === state.completedLevels) nextCompleted = [...state.completedLevels];
        nextCompleted = nextCompleted.filter((idx) => idx !== i);
      }
    }
  }
  return { gameStates: nextGameStates, completedLevels: nextCompleted };
}

export function isLevelUnlocked(state, levelIndex) {
  const ci = getChapterIndexOfLevel(levelIndex);
  return levelIndex <= state.chapterProgress[ci];
}

function ensureGameState(gameStates, levelIndex) {
  if (gameStates[levelIndex]) return gameStates;
  const level = levels[levelIndex];
  if (level.mode !== "sort") return gameStates;
  return { ...gameStates, [levelIndex]: getInitialPlacements(level, gameStates) };
}

function feedbackForLevel(currentLevel, completedLevels) {
  if (currentLevel === levels.length - 1 && completedLevels.includes(currentLevel)) {
    return { kind: "completed", message: "課程完成。", tileResults: {} };
  }
  return { kind: "idle", message: "", tileResults: {} };
}

export function createInitialState({ devMode = false, requestedLevel = null } = {}) {
  let chapterProgress = chapters.map((chapter) => chapter.startIndex);
  if (devMode) {
    chapterProgress = chapters.map((_, ci) => getChapterRange(ci).end);
  }

  let currentLevel = 0;
  if (devMode && Number.isInteger(requestedLevel) && requestedLevel >= 0 && requestedLevel < levels.length) {
    currentLevel = requestedLevel;
  }

  const expanded = new Set([getChapterIndexOfLevel(currentLevel)]);
  const gameStates = ensureGameState({}, currentLevel);

  return {
    currentLevel,
    gameStates,
    completedLevels: [],
    chapterProgress,
    expandedChapters: [...expanded].sort((a, b) => a - b),
    selectedTileId: null,
    feedback: feedbackForLevel(currentLevel, [])
  };
}

export function hydrateState(initialState, snapshot) {
  if (!snapshot || typeof snapshot !== "object") return initialState;
  const next = { ...initialState };
  if (typeof snapshot.currentLevel === "number" && snapshot.currentLevel >= 0 && snapshot.currentLevel < levels.length) {
    next.currentLevel = snapshot.currentLevel;
  }
  if (Array.isArray(snapshot.chapterProgress) && snapshot.chapterProgress.length === chapters.length) {
    next.chapterProgress = snapshot.chapterProgress.map((v, i) =>
      typeof v === "number" ? v : initialState.chapterProgress[i]
    );
  }
  if (Array.isArray(snapshot.completedLevels)) {
    next.completedLevels = snapshot.completedLevels.filter(
      (i) => typeof i === "number" && i >= 0 && i < levels.length
    );
  }
  if (snapshot.gameStates && typeof snapshot.gameStates === "object") {
    next.gameStates = { ...snapshot.gameStates };
  }
  if (Array.isArray(snapshot.expandedChapters)) {
    next.expandedChapters = snapshot.expandedChapters.filter(
      (i) => typeof i === "number" && i >= 0 && i < chapters.length
    );
  }
  next.gameStates = ensureGameState(next.gameStates, next.currentLevel);
  next.feedback = feedbackForLevel(next.currentLevel, next.completedLevels);
  return next;
}

export function persistableState(state) {
  return {
    currentLevel: state.currentLevel,
    chapterProgress: state.chapterProgress,
    completedLevels: state.completedLevels,
    gameStates: state.gameStates,
    expandedChapters: state.expandedChapters
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case "NAVIGATE": {
      const { levelIndex } = action;
      if (levelIndex === state.currentLevel) return state;
      const gameStates = ensureGameState(state.gameStates, levelIndex);
      return {
        ...state,
        currentLevel: levelIndex,
        gameStates,
        selectedTileId: null,
        feedback: feedbackForLevel(levelIndex, state.completedLevels)
      };
    }
    case "TOGGLE_CHAPTER": {
      const { ci } = action;
      const isExpanded = state.expandedChapters.includes(ci);
      return {
        ...state,
        expandedChapters: isExpanded
          ? state.expandedChapters.filter((idx) => idx !== ci)
          : [...state.expandedChapters, ci].sort((a, b) => a - b)
      };
    }
    case "SELECT_TILE": {
      return { ...state, selectedTileId: action.itemId };
    }
    case "MOVE_TILE": {
      const { itemId, zoneId } = action;
      if (state.completedLevels.includes(state.currentLevel)) return state;
      const placements = {
        ...(state.gameStates[state.currentLevel] || {}),
        [itemId]: zoneId
      };
      const nextGameStates = { ...state.gameStates, [state.currentLevel]: placements };
      const invalidated = invalidateDownstream(
        { ...state, gameStates: nextGameStates },
        state.currentLevel
      );
      return {
        ...state,
        gameStates: invalidated.gameStates,
        completedLevels: invalidated.completedLevels,
        selectedTileId: null,
        feedback: { kind: "idle", message: "", tileResults: {} }
      };
    }
    case "CHECK": {
      const level = levels[state.currentLevel];
      if (level.mode !== "sort") return state;
      const items = getLevelItems(level);
      const placements = state.gameStates[state.currentLevel] || {};
      const tileResults = {};
      let wrongCount = 0;
      let placedCount = 0;
      items.forEach((item) => {
        const placement = placements[item.id];
        if (!placement || placement === "source") {
          wrongCount += 1;
          return;
        }
        placedCount += 1;
        const isCorrect = getTargetForLevel(level, item) === placement;
        tileResults[item.id] = isCorrect ? "correct" : "wrong";
        if (!isCorrect) wrongCount += 1;
      });

      if (wrongCount === 0 && placedCount === items.length) {
        const isLast = state.currentLevel === levels.length - 1;
        const newCompleted = state.completedLevels.includes(state.currentLevel)
          ? state.completedLevels
          : [...state.completedLevels, state.currentLevel];
        const newProgress = [...state.chapterProgress];
        if (!isLast) {
          const nextLevel = state.currentLevel + 1;
          const ci = getChapterIndexOfLevel(nextLevel);
          if (newProgress[ci] < nextLevel) newProgress[ci] = nextLevel;
        }
        return {
          ...state,
          completedLevels: newCompleted,
          chapterProgress: newProgress,
          feedback: {
            kind: isLast ? "completed" : "success",
            message: isLast ? "課程完成。" : level.success,
            tileResults
          }
        };
      }
      return {
        ...state,
        feedback: {
          kind: "fail",
          message: `還有 ${wrongCount} 個需要調整。${level.failureHint}`,
          tileResults
        }
      };
    }
    case "ADVANCE": {
      const level = levels[state.currentLevel];
      let newProgress = state.chapterProgress;
      if (level.mode === "explain") {
        const nextLevel = state.currentLevel + 1;
        if (nextLevel < levels.length) {
          const ci = getChapterIndexOfLevel(nextLevel);
          if (state.chapterProgress[ci] < nextLevel) {
            newProgress = [...state.chapterProgress];
            newProgress[ci] = nextLevel;
          }
        }
      }
      if (state.currentLevel >= levels.length - 1) {
        return newProgress === state.chapterProgress ? state : { ...state, chapterProgress: newProgress };
      }
      const nextIndex = state.currentLevel + 1;
      const ci = getChapterIndexOfLevel(nextIndex);
      if (nextIndex > newProgress[ci]) {
        return newProgress === state.chapterProgress ? state : { ...state, chapterProgress: newProgress };
      }
      const gameStates = ensureGameState(state.gameStates, nextIndex);
      return {
        ...state,
        chapterProgress: newProgress,
        currentLevel: nextIndex,
        gameStates,
        selectedTileId: null,
        feedback: feedbackForLevel(nextIndex, state.completedLevels)
      };
    }
    default:
      return state;
  }
}
