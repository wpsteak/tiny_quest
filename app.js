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
    title: "東西變多時，新增更清楚的空間",
    mode: "sort",
    cumulativeFrom: 1,
    sourceTitle: "新增物品",
    zoneTitle: "重新規劃空間",
    prompt: "延續上一關的家，新的健身器材冒出來了。把新增物品放進更清楚的空間，必要時也可以調整原本的家具。",
    success: "你把成長中的需求獨立成新空間，這就是重構的直覺。",
    zones: [
      { id: "living", name: "客廳", hint: "休息與招待" },
      { id: "bedroom", name: "臥室", hint: "睡眠" },
      { id: "kitchen", name: "廚房", hint: "料理與餐具" },
      { id: "gym", name: "健身房", hint: "運動與訓練" }
    ],
    newItems: [
      { id: "dumbbell", label: "啞鈴", icon: "🏋️", target: "gym" },
      { id: "mat", label: "瑜伽墊", icon: "▭", target: "gym" },
      { id: "bike", label: "飛輪車", icon: "🚲", target: "gym" }
    ]
  },
  {
    type: "說明",
    title: "健康管理 App 可以怎麼拆",
    mode: "explain",
    html: `
      <p>以健康管理或卡路里計算器為例，功能可以依照責任拆成幾個模組。這不是為了把檔案變多，而是讓每個地方只回答一類問題。</p>
      <ul>
        <li><strong>profile</strong>：身高、體重、年齡、目標。</li>
        <li><strong>foodLog</strong>：新增餐點、查詢每日飲食紀錄。</li>
        <li><strong>calorie</strong>：計算基礎代謝、總熱量、剩餘額度。</li>
        <li><strong>report</strong>：整理週報、趨勢、提醒。</li>
      </ul>
      <p>function 要放在哪裡，可以問：「它主要在改變或回答哪一種資料？」答案通常就是它該待的模組。</p>
    `
  },
  {
    type: "互動關卡",
    title: "把 main 裡的 function 分到模組",
    mode: "sort",
    sourceTitle: "main 裡的 function",
    zoneTitle: "已建立模組",
    prompt: "把 function 拖到最符合責任的模組。注意名稱中的動詞與資料對象。",
    success: "main 變薄了：它只需要協調流程，不必承擔所有細節。",
    zones: [
      { id: "profile", name: "profile 模組", hint: "使用者資料與目標" },
      { id: "foodLog", name: "foodLog 模組", hint: "飲食紀錄" },
      { id: "calorie", name: "calorie 模組", hint: "熱量計算" },
      { id: "report", name: "report 模組", hint: "摘要與趨勢" }
    ],
    items: [
      { id: "setGoal", label: "setDailyGoal()", detail: "設定每日目標", target: "profile" },
      { id: "updateWeight", label: "updateWeight()", detail: "更新體重", target: "profile" },
      { id: "addMeal", label: "addMeal()", detail: "新增一餐", target: "foodLog" },
      { id: "listMeals", label: "listMealsByDate()", detail: "查詢每日餐點", target: "foodLog" },
      { id: "calcBmr", label: "calculateBMR()", detail: "計算基礎代謝", target: "calorie" },
      { id: "remaining", label: "remainingCalories()", detail: "計算剩餘熱量", target: "calorie" },
      { id: "weekly", label: "buildWeeklyReport()", detail: "產生週報", target: "report" },
      { id: "trend", label: "summarizeTrend()", detail: "整理趨勢", target: "report" }
    ]
  },
  {
    type: "互動關卡",
    title: "重構時維持 input / output 不變",
    mode: "sort",
    sourceTitle: "calorie 模組變擁擠",
    zoneTitle: "新的模組邊界",
    prompt: "function 變多時，把一群相近責任抽成新模組。重構前後，對外使用的 input / output 要維持穩定。",
    success: "重構完成：內部變乾淨，外部呼叫方式仍然穩定。",
    zones: [
      { id: "calorieCore", name: "calorieCore", hint: "純熱量公式" },
      { id: "nutritionRules", name: "nutritionRules", hint: "營養規則與建議" },
      { id: "mealAnalysis", name: "mealAnalysis", hint: "餐點資料分析" },
      { id: "publicApi", name: "public API", hint: "保留給外部呼叫" }
    ],
    items: [
      { id: "bmr", label: "calculateBMR(profile)", detail: "profile -> number", target: "calorieCore" },
      { id: "tdee", label: "calculateTDEE(profile)", detail: "profile -> number", target: "calorieCore" },
      { id: "macro", label: "suggestMacros(goal)", detail: "goal -> macroRatio", target: "nutritionRules" },
      { id: "limit", label: "checkDailyLimit(total)", detail: "number -> status", target: "nutritionRules" },
      { id: "mealSum", label: "sumMealCalories(meals)", detail: "meal[] -> number", target: "mealAnalysis" },
      { id: "mealTags", label: "tagHighSugarMeals(meals)", detail: "meal[] -> tag[]", target: "mealAnalysis" },
      { id: "remainingApi", label: "remainingCalories(profile, meals)", detail: "same input -> same output", target: "publicApi" },
      { id: "summaryApi", label: "dailyNutritionSummary(date)", detail: "same input -> same output", target: "publicApi" }
    ]
  }
];

let currentLevel = 0;
let unlockedLevel = 0;
let selectedTileId = null;
const gameStates = {};
const completedLevels = new Set();

const nodes = {
  levelList: document.querySelector("#levelList"),
  levelType: document.querySelector("#levelType"),
  levelTitle: document.querySelector("#levelTitle"),
  progressText: document.querySelector("#progressText"),
  progressBar: document.querySelector("#progressBar"),
  explainPanel: document.querySelector("#explainPanel"),
  explainBody: document.querySelector("#explainBody"),
  gamePanel: document.querySelector("#gamePanel"),
  sourceTitle: document.querySelector("#sourceTitle"),
  zoneTitle: document.querySelector("#zoneTitle"),
  sourceItems: document.querySelector("#sourceItems"),
  dropZones: document.querySelector("#dropZones"),
  feedback: document.querySelector("#feedback"),
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
  nodes.feedback.className = "feedback";
  nodes.feedback.textContent = completedLevels.has(currentLevel)
    ? "這一關已完成，結果已鎖定。需要修改時請先重置。"
    : level.prompt || "閱讀說明後進入下一關。";
  nodes.prevButton.disabled = currentLevel === 0;
  nodes.nextButton.disabled = currentLevel >= unlockedLevel && level.mode === "sort";
  nodes.nextButton.textContent = currentLevel === levels.length - 1 ? "完成" : "下一關";
  nodes.checkButton.disabled = completedLevels.has(currentLevel);

  if (level.mode === "explain") {
    nodes.explainPanel.hidden = false;
    nodes.gamePanel.hidden = true;
    nodes.explainBody.innerHTML = level.html;
    nodes.resetButton.disabled = true;
  } else {
    nodes.explainPanel.hidden = true;
    nodes.gamePanel.hidden = false;
    nodes.resetButton.disabled = false;
    renderGame(level);
  }

  renderNav();
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
      ...levels[level.cumulativeFrom].items,
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
      placements[item.id] = isNewItem ? "source" : previousState[item.id] || item.target;
      return placements;
    }, {});
  }

  return items.reduce((placements, item) => {
    placements[item.id] = "source";
    return placements;
  }, {});
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
    const isCorrect = tile.dataset.target === zone.dataset.zone;
    tile.classList.add(isCorrect ? "correct" : "wrong");
    if (!isCorrect) wrongCount += 1;
  });

  saveCurrentGameState();

  if (wrongCount === 0 && placedCount === items.length) {
    completedLevels.add(currentLevel);
    unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
    nodes.feedback.className = "feedback ok";
    nodes.feedback.textContent = level.success;
    nodes.nextButton.disabled = false;
    nodes.checkButton.disabled = true;
    document.querySelectorAll(".tile").forEach((tile) => {
      tile.draggable = false;
      tile.disabled = true;
    });
    renderNav();
  } else {
    nodes.feedback.className = "feedback bad";
    nodes.feedback.textContent = `還有 ${wrongCount} 個需要調整。綠色是正確位置，紅色是要重新思考的項目。`;
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
    nodes.feedback.className = "feedback ok";
    nodes.feedback.textContent = "課程原型完成。可以把這套資料結構擴充成更多主題關卡。";
  }
});

renderLevel();
