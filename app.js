const levels = [
  {
    type: "說明",
    title: "寫程式像打造家裡隔間",
    mode: "explain",
    html: `
      <p>一開始所有東西都堆在同一個大空間裡，找東西會變慢，也很容易互相干擾。程式如果所有邏輯都塞在 <strong>main</strong> 裡，也會遇到同樣問題。</p>
      <p>模組化就像替家裡隔間：客廳處理聊天與休息，廚房處理料理，臥室處理睡眠。每個空間有清楚責任，彼此用門、走道和規則連接。</p>
      <ul>
        <li><strong>空間</strong> 像 module：負責一類事情。</li>
        <li><strong>家具</strong> 像 function：放在最能說明用途的位置。</li>
        <li><strong>門口規則</strong> 像 input / output：外部只需要知道怎麼使用，不必知道裡面怎麼擺。</li>
      </ul>
    `
  },
  {
    type: "互動關卡",
    title: "把家具放回合適空間",
    mode: "sort",
    sourceTitle: "家具堆",
    zoneTitle: "家裡空間",
    prompt: "拖曳家具到最合理的房間。也可以先點家具，再點房間。",
    success: "整理完成：每個空間的責任更清楚了。",
    failureHint: "先想這個家具通常在哪裡使用，而不是它現在被放在哪裡。",
    zones: [
      { id: "living", name: "客廳", hint: "休息、聊天、看電視" },
      { id: "bedroom", name: "臥室", hint: "睡眠與個人物品" },
      { id: "kitchen", name: "廚房", hint: "料理與餐具" }
    ],
    items: [
      { id: "sofa", label: "沙發", icon: "🛋️", target: "living" },
      { id: "tv", label: "電視", icon: "📺", target: "living" },
      { id: "bed", label: "床", icon: "🛏️", target: "bedroom" },
      { id: "wardrobe", label: "衣櫃", icon: "👕", target: "bedroom" },
      { id: "pan", label: "平底鍋", icon: "🍳", target: "kitchen" },
      { id: "plate", label: "餐盤", icon: "🍽️", target: "kitchen" }
    ]
  },
  {
    type: "互動關卡",
    title: "小需求先放在現有空間",
    mode: "sort",
    cumulativeFrom: 1,
    sourceTitle: "新增物品",
    zoneTitle: "現有空間",
    prompt: "延續上一關的家，現在只多了一個啞鈴。家人只是想在客廳邊看電視邊練一下，這時候還不需要立刻新增健身房。請把這個小需求放到最自然的既有空間。",
    success: "這是合理的暫放：只有一個小需求時，先放在現有空間可以降低複雜度。模組化不是看到新東西就馬上拆新模組，而是先觀察責任是否真的變大。",
    failureHint: "現在還沒有健身房。只有一個啞鈴時，想想哪個既有空間最能容納這個小需求。",
    zones: [
      { id: "living", name: "客廳", hint: "休息、看電視，也可容納小需求" },
      { id: "bedroom", name: "臥室", hint: "睡眠與個人物品" },
      { id: "kitchen", name: "廚房", hint: "料理與餐具" }
    ],
    newItems: [
      { id: "dumbbell", label: "啞鈴", icon: "🏋️", target: "living" }
    ]
  },
  {
    type: "互動關卡",
    title: "東西變多時，新增更清楚的空間",
    mode: "sort",
    cumulativeFrom: 2,
    sourceTitle: "又新增的物品",
    zoneTitle: "重新規劃空間",
    prompt: "延續上一關，啞鈴先放客廳是可以的。但現在健身器材越來越多，客廳開始同時承擔休息和訓練兩種責任。請把健身相關物品集中到新的健身房。",
    success: "你把變大的同類責任抽成新空間了。這就是重構：當既有空間開始混亂，才把一群相關責任搬到新的模組。",
    failureHint: "這次重點不是啞鈴能不能放客廳，而是健身相關物品變多後，是否值得集中到新空間。",
    zones: [
      { id: "living", name: "客廳", hint: "回到休息與招待" },
      { id: "bedroom", name: "臥室", hint: "睡眠與個人物品" },
      { id: "kitchen", name: "廚房", hint: "料理與餐具" },
      { id: "gym", name: "健身房", hint: "運動與訓練" }
    ],
    newItems: [
      { id: "mat", label: "瑜伽墊", icon: "▭", target: "gym" },
      { id: "bike", label: "飛輪車", icon: "🚲", target: "gym" }
    ],
    overrides: {
      dumbbell: "gym"
    }
  },
  {
    type: "說明",
    title: "健康管理 App 可以怎麼拆",
    mode: "explain",
    html: `
      <p>以健康管理或卡路里計算器為例，功能可以依照責任拆成幾個模組。這不是為了把檔案變多，而是讓每個地方只回答一類問題。</p>
      <ul>
        <li><strong>個人資料 profile</strong>：身高、體重、年齡、目標。</li>
        <li><strong>飲食紀錄 foodLog</strong>：新增餐點、查詢每天吃了什麼。</li>
        <li><strong>熱量計算 calorie</strong>：把餐點或目標換算成熱量。</li>
        <li><strong>成果報告 report</strong>：整理週報、趨勢、提醒。</li>
      </ul>
      <p>接下來先看中文功能卡。英文 function 名稱只放在小字當參考，不需要先背單字。</p>
    `
  },
  {
    type: "互動關卡",
    title: "把功能卡分到模組",
    mode: "sort",
    sourceTitle: "main 裡的功能卡",
    zoneTitle: "已建立模組",
    prompt: "先看功能卡的大字中文：它主要在處理哪一種資料？把它拖到最符合責任的模組。英文小字只是程式裡可能出現的 function 名稱。",
    success: "main 變薄了：它只需要協調流程，不必承擔所有細節。",
    failureHint: "先看中文大字：它主要在處理個人資料、飲食紀錄、熱量，還是報告？",
    zones: [
      { id: "profile", name: "個人資料", hint: "profile" },
      { id: "foodLog", name: "飲食紀錄", hint: "foodLog" },
      { id: "calorie", name: "熱量計算", hint: "calorie" },
      { id: "report", name: "成果報告", hint: "report" }
    ],
    items: [
      { id: "setGoal", label: "設定每日目標", detail: "setDailyGoal()", target: "profile" },
      { id: "addMeal", label: "新增一餐記錄", detail: "addMeal()", target: "foodLog" },
      { id: "calcCalories", label: "計算這餐熱量", detail: "calculateMealCalories()", target: "calorie" },
      { id: "weekly", label: "產生每週報告", detail: "buildWeeklyReport()", target: "report" }
    ]
  },
  {
    type: "互動關卡",
    title: "小功能先留在既有模組",
    mode: "sort",
    cumulativeFrom: 5,
    sourceTitle: "新增功能卡",
    zoneTitle: "現有模組",
    prompt: "延續上一關，main 已經變薄了。現在只新增一個「提醒今天記得記錄晚餐」的小功能。它不是在新增記錄，而是在提醒使用者去記錄；但因為目前只有一個提醒，先放在飲食紀錄旁邊是合理的，不需要急著拆新模組。",
    success: "這是合理的暫放：這張卡有「記錄」的意思，先放在飲食紀錄可以。但它真正做的事是提醒使用者，等提醒功能變多時，再考慮拆出提醒通知。",
    failureHint: "這張卡有「記錄」的意思，但目前只有一個提醒功能。先找最接近的既有模組。",
    zones: [
      { id: "profile", name: "個人資料", hint: "profile" },
      { id: "foodLog", name: "飲食紀錄", hint: "foodLog，小提醒可先放這裡" },
      { id: "calorie", name: "熱量計算", hint: "calorie" },
      { id: "report", name: "成果報告", hint: "report" }
    ],
    newItems: [
      { id: "dinnerReminder", label: "提醒今天記得記錄晚餐", detail: "remindDinnerLog()", target: "foodLog" }
    ]
  },
  {
    type: "互動關卡",
    title: "提醒變多後再拆模組",
    mode: "sort",
    cumulativeFrom: 6,
    sourceTitle: "又新增的提醒",
    zoneTitle: "重新規劃模組",
    prompt: "延續上一關，一個晚餐記錄提醒先放在飲食紀錄還可以；但現在提醒功能變多了，飲食紀錄開始同時負責「保存吃了什麼」和「叫使用者去做事」。請新增提醒通知，把提醒類功能集中過去。",
    success: "現在更清楚了：飲食紀錄負責保存吃了什麼，提醒通知負責叫使用者去做事。一開始只有一個提醒，暫放在飲食紀錄可以；但提醒變多後，就值得拆成自己的模組。",
    failureHint: "現在提醒功能變多了。想想哪些卡是在保存資料，哪些卡是在叫使用者去做事。",
    zones: [
      { id: "profile", name: "個人資料", hint: "profile" },
      { id: "foodLog", name: "飲食紀錄", hint: "保存吃了什麼" },
      { id: "calorie", name: "熱量計算", hint: "calorie" },
      { id: "report", name: "成果報告", hint: "report" },
      { id: "notification", name: "提醒通知", hint: "叫使用者去做事" }
    ],
    newItems: [
      { id: "breakfastReminder", label: "提醒今天記得記錄早餐", detail: "remindBreakfastLog()", target: "notification" },
      { id: "waterReminder", label: "提醒今天記得喝水", detail: "remindDrinkWater()", target: "notification" },
      { id: "reportReminder", label: "提醒週報已經出爐", detail: "remindWeeklyReport()", target: "notification" }
    ],
    overrides: {
      dinnerReminder: "notification"
    }
  }
];

let currentLevel = 0;
let unlockedLevel = 0;
let selectedTileId = null;
const gameStates = {};
const completedLevels = new Set();
const params = new URLSearchParams(window.location.search);
const isDevMode = params.get("dev") === "1";

const nodes = {
  levelList: document.querySelector("#levelList"),
  levelType: document.querySelector("#levelType"),
  levelTitle: document.querySelector("#levelTitle"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  taskText: document.querySelector("#taskText"),
  explainPanel: document.querySelector("#explainPanel"),
  explainBody: document.querySelector("#explainBody"),
  gamePanel: document.querySelector("#gamePanel"),
  sourceTitle: document.querySelector("#sourceTitle"),
  zoneTitle: document.querySelector("#zoneTitle"),
  sourceItems: document.querySelector("#sourceItems"),
  dropZones: document.querySelector("#dropZones"),
  resultPanel: document.querySelector("#resultPanel"),
  resultLabel: document.querySelector("#resultLabel"),
  resultText: document.querySelector("#resultText"),
  remainingCount: document.querySelector("#remainingCount"),
  checkButton: document.querySelector("#checkButton"),
  resetButton: document.querySelector("#resetButton"),
  prevButton: document.querySelector("#prevButton"),
  nextButton: document.querySelector("#nextButton")
};

function renderNav() {
  nodes.levelList.innerHTML = "";
  levels.forEach((level, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    const isUnlocked = index <= unlockedLevel;
    button.className = "level-button";
    button.type = "button";
    button.disabled = !isUnlocked;
    button.setAttribute("aria-current", String(index === currentLevel));
    button.innerHTML = `<strong>${index + 1}. ${level.title}</strong><span>${isUnlocked ? level.type : "尚未解鎖"}</span>`;
    button.addEventListener("click", () => {
      if (!isUnlocked) return;
      saveCurrentGameState();
      currentLevel = index;
      renderLevel();
    });
    item.append(button);
    nodes.levelList.append(item);
  });
}

function renderLevel() {
  const level = levels[currentLevel];
  selectedTileId = null;
  nodes.levelType.textContent = level.type;
  nodes.levelTitle.textContent = level.title;
  nodes.progressText.textContent = `${currentLevel + 1} / ${levels.length}`;
  nodes.progressBar.style.width = `${((currentLevel + 1) / levels.length) * 100}%`;
  nodes.taskText.textContent = `${isDevMode ? "[測試模式] " : ""}${level.prompt || "閱讀說明後進入下一關。"}`;
  hideResult();
  nodes.prevButton.disabled = currentLevel === 0;
  nodes.nextButton.disabled = currentLevel >= unlockedLevel && level.mode === "sort";
  nodes.nextButton.textContent = currentLevel === levels.length - 1 ? "完成" : "下一關";
  nodes.checkButton.disabled = completedLevels.has(currentLevel);

  if (level.mode === "explain") {
    nodes.explainPanel.hidden = false;
    nodes.gamePanel.hidden = true;
    nodes.explainBody.innerHTML = level.html;
  } else {
    nodes.explainPanel.hidden = true;
    nodes.gamePanel.hidden = false;
    renderGame(level);
    if (completedLevels.has(currentLevel)) {
      showResult("已完成", "這一關已完成，結果已鎖定。需要修改時請使用左側的「重置本關與後續」。", "ok");
    }
  }

  renderNav();
}

function showResult(label, message, tone) {
  nodes.resultPanel.hidden = false;
  nodes.resultPanel.className = `result-panel ${tone}`;
  nodes.resultLabel.textContent = label;
  nodes.resultText.textContent = message;
}

function hideResult() {
  nodes.resultPanel.hidden = true;
  nodes.resultPanel.className = "result-panel";
  nodes.resultLabel.textContent = "";
  nodes.resultText.textContent = "";
}

function applyDevMode() {
  if (!isDevMode) return;

  unlockedLevel = levels.length - 1;
  const requestedLevel = Number(params.get("level"));
  if (Number.isInteger(requestedLevel) && requestedLevel >= 1 && requestedLevel <= levels.length) {
    currentLevel = requestedLevel - 1;
  }
}

function renderGame(level) {
  nodes.sourceTitle.textContent = level.sourceTitle;
  nodes.zoneTitle.textContent = level.zoneTitle;
  nodes.sourceItems.innerHTML = "";
  nodes.dropZones.innerHTML = "";
  nodes.sourceItems.ondragover = handleDragOver;
  nodes.sourceItems.ondrop = handleDropToSource;

  level.zones.forEach((zone) => {
    const zoneEl = document.createElement("section");
    zoneEl.className = "drop-zone";
    zoneEl.dataset.zone = zone.id;
    zoneEl.innerHTML = `
      <div class="zone-name">
        <span>${zone.name}</span>
        <span class="zone-hint">${zone.hint}</span>
      </div>
      <div class="drop-zone-items"></div>
    `;
    zoneEl.addEventListener("dragover", handleDragOver);
    zoneEl.addEventListener("dragleave", () => zoneEl.classList.remove("drag-over"));
    zoneEl.addEventListener("drop", handleDrop);
    zoneEl.addEventListener("click", () => moveSelectedTo(zoneEl));
    nodes.dropZones.append(zoneEl);
  });

  const items = getLevelItems(level);
  const placements = getInitialPlacements(level, items);
  const isCompleted = completedLevels.has(currentLevel);
  items.forEach((item) => {
    const tile = createTile(item);
    tile.draggable = !isCompleted;
    tile.disabled = isCompleted;
    if (isCompleted) tile.classList.add("correct");
    const location = placements[item.id];
    const zone = location && location !== "source"
      ? nodes.dropZones.querySelector(`[data-zone="${location}"] .drop-zone-items`)
      : null;
    if (zone) {
      zone.append(tile);
    } else {
      nodes.sourceItems.append(tile);
    }
  });
  saveCurrentGameState();
  updateRemaining();
}

function getLevelItems(level) {
  if (level.cumulativeFrom !== undefined) {
    return [
      ...getLevelItems(levels[level.cumulativeFrom]),
      ...(level.newItems || [])
    ];
  }
  return level.items || [];
}

function getInitialPlacements(level, items) {
  if (gameStates[currentLevel]) return { ...gameStates[currentLevel] };

  if (level.cumulativeFrom !== undefined) {
    const previousState = gameStates[level.cumulativeFrom] || {};
    return items.reduce((placements, item) => {
      const isNewItem = (level.newItems || []).some((newItem) => newItem.id === item.id);
      placements[item.id] = isNewItem
        ? "source"
        : previousState[item.id] || getTargetForLevel(level, item);
      return placements;
    }, {});
  }

  return items.reduce((placements, item) => {
    placements[item.id] = "source";
    return placements;
  }, {});
}

function getTargetForLevel(level, item) {
  return (level.overrides && level.overrides[item.id]) || item.target;
}

function saveCurrentGameState() {
  const level = levels[currentLevel];
  if (!level || level.mode !== "sort" || nodes.gamePanel.hidden) return;

  const placements = {};
  document.querySelectorAll(".tile").forEach((tile) => {
    const zone = tile.closest(".drop-zone");
    placements[tile.dataset.item] = zone ? zone.dataset.zone : "source";
  });
  gameStates[currentLevel] = placements;
}

function createTile(item) {
  const tile = document.createElement("button");
  tile.className = "tile";
  tile.type = "button";
  tile.draggable = true;
  tile.dataset.item = item.id;
  tile.dataset.target = item.target;
  tile.innerHTML = `${item.icon ? `<span>${item.icon}</span>` : ""}<span>${item.label}${item.detail ? `<small>${item.detail}</small>` : ""}</span>`;
  tile.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", item.id);
  });
  tile.addEventListener("click", (event) => {
    event.stopPropagation();
    selectTile(tile);
  });
  return tile;
}

function selectTile(tile) {
  if (completedLevels.has(currentLevel)) return;
  document.querySelectorAll(".tile.selected").forEach((el) => el.classList.remove("selected"));
  if (selectedTileId === tile.dataset.item) {
    selectedTileId = null;
    return;
  }
  selectedTileId = tile.dataset.item;
  tile.classList.add("selected");
}

function handleDragOver(event) {
  if (completedLevels.has(currentLevel)) return;
  event.preventDefault();
  const zone = event.currentTarget.closest(".drop-zone");
  if (zone) zone.classList.add("drag-over");
}

function handleDrop(event) {
  if (completedLevels.has(currentLevel)) return;
  event.preventDefault();
  const zone = event.currentTarget.closest(".drop-zone");
  zone.classList.remove("drag-over");
  const itemId = event.dataTransfer.getData("text/plain");
  const tile = document.querySelector(`[data-item="${itemId}"]`);
  if (tile) moveTileToZone(tile, zone);
}

function handleDropToSource(event) {
  if (completedLevels.has(currentLevel)) return;
  event.preventDefault();
  const itemId = event.dataTransfer.getData("text/plain");
  const tile = document.querySelector(`[data-item="${itemId}"]`);
  if (tile) {
    clearTileState(tile);
    nodes.sourceItems.append(tile);
    saveCurrentGameState();
    updateRemaining();
  }
}

function moveSelectedTo(zone) {
  if (completedLevels.has(currentLevel)) return;
  if (!selectedTileId) return;
  const tile = document.querySelector(`[data-item="${selectedTileId}"]`);
  if (tile) moveTileToZone(tile, zone);
}

function moveTileToZone(tile, zone) {
  if (completedLevels.has(currentLevel)) return;
  clearTileState(tile);
  zone.querySelector(".drop-zone-items").append(tile);
  selectedTileId = null;
  saveCurrentGameState();
  updateRemaining();
}

function clearTileState(tile) {
  tile.classList.remove("selected", "correct", "wrong");
}

function updateRemaining() {
  const count = nodes.sourceItems.querySelectorAll(".tile").length;
  nodes.remainingCount.textContent = count === 0 ? "已放完" : `剩 ${count} 個`;
}

function checkAnswers() {
  const level = levels[currentLevel];
  if (level.mode !== "sort") return;

  const items = getLevelItems(level);
  let wrongCount = 0;
  let placedCount = 0;
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.remove("correct", "wrong");
    const zone = tile.closest(".drop-zone");
    if (!zone) {
      wrongCount += 1;
      return;
    }
    placedCount += 1;
    const item = items.find((candidate) => candidate.id === tile.dataset.item);
    const isCorrect = item && getTargetForLevel(level, item) === zone.dataset.zone;
    tile.classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect) wrongCount += 1;
  });

  saveCurrentGameState();

  if (wrongCount === 0 && placedCount === items.length) {
    completedLevels.add(currentLevel);
    unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
    showResult("完成", level.success, "ok");
    nodes.nextButton.disabled = false;
    nodes.checkButton.disabled = true;
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.draggable = false;
      tile.disabled = true;
    });
    renderNav();
  } else {
    showResult(
      "再想一下",
      `還有 ${wrongCount} 個需要調整。${level.failureHint}`,
      "bad"
    );
  }
}

function resetLevel() {
  for (let index = currentLevel; index < levels.length; index += 1) {
    delete gameStates[index];
    completedLevels.delete(index);
  }
  unlockedLevel = Math.min(unlockedLevel, currentLevel);
  renderLevel();
}

nodes.checkButton.addEventListener("click", checkAnswers);
nodes.resetButton.addEventListener("click", resetLevel);
nodes.prevButton.addEventListener("click", () => {
  if (currentLevel > 0) {
    saveCurrentGameState();
    currentLevel -= 1;
    renderLevel();
  }
});
nodes.nextButton.addEventListener("click", () => {
  const level = levels[currentLevel];
  if (level.mode === "explain") {
    unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
  }

  if (currentLevel < levels.length - 1) {
    if (currentLevel + 1 > unlockedLevel) return;
    saveCurrentGameState();
    currentLevel += 1;
    renderLevel();
  } else {
    showResult("完成", "課程原型完成。可以把這套資料結構擴充成更多主題關卡。", "ok");
  }
});

applyDevMode();
renderLevel();
