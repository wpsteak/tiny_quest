const levels = [
  {
    type: "說明",
    title: "AI 很會加功能，但不一定會維持整潔",
    mode: "explain",
    html: `
      <p>用 AI coding 做小工具時，第一版通常很快。真正的問題常出現在第三次、第五次加功能：功能塞錯地方、資料複製多份、相同規則到處重寫、小需求改太多，或簡單工具被做成複雜架構。</p>
      <p>這堂課不是先教語法，而是教你看懂「專案為什麼開始變亂」，以及怎麼指揮 AI 把它整理回來。</p>
      <ul>
        <li><strong>SRP / 重構</strong>：功能變多時，責任要重新整理。</li>
        <li><strong>SSOT</strong>：同一份資料只認一個真相來源。</li>
        <li><strong>DRY</strong>：同一條規則不要複製很多份。</li>
        <li><strong>KISS</strong>：先保持簡單，不要過度設計。</li>
        <li><strong>最小改動</strong>：修改時控制影響範圍。</li>
      </ul>
    `
  },
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
    cumulativeFrom: 2,
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
    cumulativeFrom: 3,
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
    cumulativeFrom: 6,
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
    cumulativeFrom: 7,
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
  },
  {
    type: "說明",
    title: "你剛剛學到：SRP 與重構",
    mode: "explain",
    html: `
      <p>剛剛你做了兩件工程師常做的事。</p>
      <ul>
        <li><strong>SRP</strong>：Single Responsibility Principle，單一職責原則。每個空間或模組，最好只負責一類事情。</li>
        <li><strong>重構</strong>：不是推倒重來，而是在原本能用的狀態下重新整理，讓之後更好修改。</li>
      </ul>
      <p>AI 常會先把新功能塞到最近、最快能完成的位置。第一次可能沒問題，但功能變多後，你要能看出它已經變成自己的責任，並請 AI 幫你整理。</p>
    `
  },
  {
    type: "說明",
    title: "SSOT：只認一個真相來源",
    mode: "explain",
    html: `
      <p><strong>SSOT</strong> 是 Single Source of Truth，意思是「同一件事只認一個真相來源」。</p>
      <p>AI coding 常常是「局部解題」。你叫它改首頁，它就看首頁；你叫它改統計，它就看統計。當不同地方都需要同一份資料時，AI 可能會各放一份，讓每個地方先跑起來。</p>
      <p>但長期來看，你會不知道哪一份才是真的。SSOT 就是在問：同一件事到底誰說了算？其他地方應該保存它，還是讀取它？</p>
    `
  },
  {
    type: "互動關卡",
    title: "餐廳資料要更新還是讀取",
    mode: "sort",
    sourceTitle: "餐廳動作",
    zoneTitle: "對訂位資料做什麼",
    prompt: "客人原本訂位 6 人，後來改成 8 人，現場最後來 7 人。餐廳決定：訂位資料是唯一真相來源。收到新資訊的人要更新訂位資料；需要使用資料的人要讀取訂位資料。",
    success: "這就是 SSOT：新資訊先更新到訂位資料；其他工作統一讀訂位資料。不要讓老闆、廚房、座位安排各自保存一份人數。",
    failureHint: "先判斷這張卡是在收到新資訊，還是在使用既有資訊做事。收到新資訊要更新訂位資料；要安排工作時讀取訂位資料。",
    zones: [
      { id: "update", name: "更新訂位資料", hint: "把新資訊寫回 SSOT" },
      { id: "read", name: "讀取訂位資料", hint: "從 SSOT 取得資訊" }
    ],
    items: [
      { id: "bossCall", label: "老闆接到電話：客人改成 8 人", detail: "新資訊進來", target: "update" },
      { id: "arrivalCount", label: "服務生確認：現場來 7 人", detail: "新資訊進來", target: "update" },
      { id: "seatingPlan", label: "座位安排：看訂位資料排桌位", detail: "使用資訊做事", target: "read" },
      { id: "kitchenPrep", label: "廚房備料：看訂位資料準備份量", detail: "使用資訊做事", target: "read" }
    ]
  },
  {
    type: "互動關卡",
    title: "訂位系統要更新還是讀取",
    mode: "sort",
    sourceTitle: "程式裡的動作",
    zoneTitle: "對 reservation 做什麼",
    prompt: "回到簡單訂位系統。訂位資料 reservation 是 SSOT，裡面可以有 partySize 和 arrivedCount。收到新資訊時要更新 reservation；頁面需要資料時要讀取 reservation。",
    success: "現在比較清楚了：updatePartySize 和 updateArrivedCount 會更新 SSOT；座位頁和廚房頁只需要讀 reservation，不要自己保存一份人數。",
    failureHint: "看到 update 通常是在把新資訊寫回 SSOT；看到 reads 通常是在使用 SSOT，不應該自己另存一份。",
    zones: [
      { id: "update", name: "更新 reservation", hint: "把新資訊寫回 SSOT" },
      { id: "read", name: "讀取 reservation", hint: "從 SSOT 取得資訊" }
    ],
    items: [
      { id: "updatePartySize", label: "updatePartySize(8)", detail: "客人改訂位人數", target: "update" },
      { id: "updateArrived", label: "updateArrivedCount(7)", detail: "現場到場人數", target: "update" },
      { id: "seatPageRead", label: "SeatPage reads reservation", detail: "安排座位時讀資料", target: "read" },
      { id: "kitchenRead", label: "KitchenPage reads reservation", detail: "準備份量時讀資料", target: "read" }
    ]
  },
  {
    type: "說明",
    title: "DRY：不要重複自己",
    mode: "explain",
    html: `
      <p><strong>DRY</strong> 是 Don't Repeat Yourself，意思是「不要把同一套規則到處複製」。</p>
      <p>AI 很常用複製貼上解決局部問題，因為那樣最快。但如果同一條規則在三個地方各寫一份，以後改規則就會漏。</p>
      <p>DRY 不是追求完全沒有重複文字，而是提醒你：同一條會一起變的規則，不要維護很多份。</p>
    `
  },
  {
    type: "互動關卡",
    title: "折扣規則不要各自背一套",
    mode: "sort",
    sourceTitle: "折扣規則",
    zoneTitle: "整理方式",
    prompt: "店裡有會員折扣、生日折扣和滿額免運。不要讓每位店員各自背一套規則，否則規則改了很容易有人還用舊版。請把共同規則和使用規則的人分開。",
    success: "DRY 的重點是：折扣規則只維護一次。店員可以使用這套規則，但不要每個人各自抄一份。",
    failureHint: "想想如果生日折扣改了，哪種做法只要改一張規則表？哪種做法要提醒每位店員改自己的版本？",
    zones: [
      { id: "shared", name: "共用規則表", hint: "規則只維護一次" },
      { id: "use", name: "使用規則", hint: "照共用規則表執行" },
      { id: "duplicate", name: "各自抄一份", hint: "容易漏改" }
    ],
    items: [
      { id: "discountRules", label: "折扣規則表", detail: "會員、生日、滿額規則", target: "shared" },
      { id: "cashierUse", label: "櫃台結帳使用規則表", detail: "照表判斷折扣", target: "use" },
      { id: "onlineUse", label: "線上訂單使用規則表", detail: "照表判斷折扣", target: "use" },
      { id: "amyCopy", label: "Amy 店員自己抄一份規則", detail: "可能忘記更新", target: "duplicate" },
      { id: "benCopy", label: "Ben 店員也抄一份規則", detail: "可能跟 Amy 不同", target: "duplicate" }
    ]
  },
  {
    type: "互動關卡",
    title: "重複檢查規則要抽出來",
    mode: "sort",
    sourceTitle: "Email 檢查功能",
    zoneTitle: "DRY 整理",
    prompt: "App 有註冊、登入、個人資料三個地方都需要檢查 Email。請把共同規則集中，讓各頁面使用同一個檢查工具。",
    success: "這就是 DRY：Email 格式規則只寫一次。註冊、登入、個人資料頁都使用同一個工具，而不是各自複製一份。",
    failureHint: "如果 Email 規則改了，你希望只改一個共用工具，還是改三個頁面裡各自複製的規則？",
    zones: [
      { id: "common", name: "共用檢查工具", hint: "規則只寫一次" },
      { id: "useCommon", name: "使用共用工具", hint: "頁面呼叫它" },
      { id: "copyRule", name: "不要複製", hint: "重複規則會失控" }
    ],
    items: [
      { id: "emailRule", label: "檢查 Email 格式", detail: "validateEmail()", target: "common" },
      { id: "signupUse", label: "註冊頁使用 Email 檢查", detail: "call validateEmail()", target: "useCommon" },
      { id: "loginUse", label: "登入頁使用 Email 檢查", detail: "call validateEmail()", target: "useCommon" },
      { id: "profileUse", label: "個人資料頁使用 Email 檢查", detail: "call validateEmail()", target: "useCommon" },
      { id: "signupCopy", label: "註冊頁複製一份 Email 規則", detail: "copy pasted rule", target: "copyRule" },
      { id: "profileCopy", label: "個人資料頁再複製一份 Email 規則", detail: "copy pasted rule", target: "copyRule" }
    ]
  },
  {
    type: "說明",
    title: "KISS：先保持簡單",
    mode: "explain",
    html: `
      <p><strong>KISS</strong> 是 Keep It Simple，意思是「先讓設計簡單」。</p>
      <p>AI 看過很多大型專案，所以有時會把小工具做得像大系統。你只是要簡單登入，它可能生出 service、manager、factory、strategy、repository 一大堆。</p>
      <p>好設計不是看起來很厲害，而是下一個人能快速理解、能安全修改。先做剛好能使用、能理解的版本，需求真的變複雜時再重構。</p>
    `
  },
  {
    type: "互動關卡",
    title: "班級點名先簡單",
    mode: "sort",
    sourceTitle: "點名工具功能",
    zoneTitle: "現在要不要做",
    prompt: "需求只是：每天記錄誰到了。請把現在真的需要的功能，和可以等需求變明確後再做的功能分開。",
    success: "這就是 KISS：先做學生名單、日期、到或未到。QR code、家長通知、統計報表都可能有用，但不是第一版一定要有。",
    failureHint: "先盯住第一版需求：每天記錄誰到了。會讓第一版變很大、但還不是必要的功能，先不要加。",
    zones: [
      { id: "now", name: "現在需要", hint: "第一版就要能用" },
      { id: "later", name: "先不要", hint: "需求明確後再加" }
    ],
    items: [
      { id: "studentList", label: "學生名單", detail: "誰在班上", target: "now" },
      { id: "attendanceDate", label: "點名日期", detail: "哪一天", target: "now" },
      { id: "presentAbsent", label: "到 / 未到", detail: "基本狀態", target: "now" },
      { id: "qrCode", label: "QR code 自動簽到", detail: "可以以後再說", target: "later" },
      { id: "parentNotify", label: "自動通知家長", detail: "還不是第一版必要", target: "later" },
      { id: "analytics", label: "出席統計儀表板", detail: "先不要過度設計", target: "later" }
    ]
  },
  {
    type: "互動關卡",
    title: "簡單登入不要做成大架構",
    mode: "sort",
    sourceTitle: "AI 提出的登入設計",
    zoneTitle: "KISS 判斷",
    prompt: "需求只是：做一個簡單登入畫面。請把第一版需要的東西和過度設計分開。",
    success: "簡單登入第一版需要欄位、按鈕和錯誤訊息。複雜權限、策略管理器和 plugin 系統可能是大型產品才需要的東西。",
    failureHint: "想想學生或下一位維護者能不能快速看懂。看起來很專業但目前用不到的架構，會讓小工具變難改。",
    zones: [
      { id: "simple", name: "第一版需要", hint: "剛好完成需求" },
      { id: "tooMuch", name: "過度設計", hint: "現在先不要" }
    ],
    items: [
      { id: "emailInput", label: "Email 欄位", detail: "使用者輸入帳號", target: "simple" },
      { id: "passwordInput", label: "密碼欄位", detail: "使用者輸入密碼", target: "simple" },
      { id: "loginButton", label: "登入按鈕", detail: "送出登入", target: "simple" },
      { id: "errorText", label: "錯誤訊息", detail: "登入失敗時顯示", target: "simple" },
      { id: "authFactory", label: "AuthServiceFactory", detail: "現在太複雜", target: "tooMuch" },
      { id: "strategyManager", label: "LoginStrategyManager", detail: "目前用不到", target: "tooMuch" },
      { id: "pluginSystem", label: "登入 plugin 系統", detail: "過度架構", target: "tooMuch" }
    ]
  },
  {
    type: "說明",
    title: "最小改動：只改真正需要改的地方",
    mode: "explain",
    html: `
      <p><strong>最小改動原則</strong> 是：需求只要改一小件事，就不要順手重寫一大片。</p>
      <p>例如餐廳只是要把雞腿飯從 120 元改成 130 元，好的做法是改價目表那一格；壞的做法是重做整份菜單、換收銀流程、順手改海報版型。</p>
      <p>AI coding 很常過度熱心。你要學會要求 AI：「只改必要位置，不要重構無關檔案，不要改既有行為。」</p>
    `
  },
  {
    type: "互動關卡",
    title: "改價格，不要重裝潢",
    mode: "sort",
    sourceTitle: "可能的改動",
    zoneTitle: "改動範圍",
    prompt: "需求只有一個：雞腿飯從 120 元改成 130 元。請選出真正必要的改動，並把過度改動放到不要動。",
    success: "最小改動不是偷懶，而是降低風險。需求只改價格，就不要順手改菜單結構、海報設計或收銀流程。",
    failureHint: "先盯住需求：只改雞腿飯價格。任何和價格無關、可能造成新 bug 的改動，都應該先不要動。",
    zones: [
      { id: "needed", name: "必要改動", hint: "剛好滿足需求" },
      { id: "avoid", name: "不要動", hint: "超出需求範圍" }
    ],
    items: [
      { id: "price", label: "把雞腿飯價格改成 130", detail: "必要", target: "needed" },
      { id: "menuLayout", label: "重新設計整份菜單版面", detail: "過度", target: "avoid" },
      { id: "drinkCategory", label: "順手調整飲料分類", detail: "無關", target: "avoid" },
      { id: "cashierFlow", label: "重做收銀流程", detail: "風險太大", target: "avoid" },
      { id: "posterStyle", label: "改海報字體和配色", detail: "無關", target: "avoid" }
    ]
  },
  {
    type: "互動關卡",
    title: "請 AI 改設定，也要控制範圍",
    mode: "sort",
    sourceTitle: "AI 想改的地方",
    zoneTitle: "是否該改",
    prompt: "需求是：把提醒時間從晚上 8 點改成晚上 9 點。請把必要改動和過度改動分開。",
    success: "這就是和 AI 協作時的最小改動：只改提醒時間設定，驗證提醒仍會出現，不要順手重寫整個通知模組。",
    failureHint: "需求只有提醒時間。凡是改資料模型、重寫 UI、搬模組，通常都不是這次必要改動。",
    zones: [
      { id: "needed", name: "必要改動", hint: "只改需求要求的地方" },
      { id: "avoid", name: "不要動", hint: "會增加風險" }
    ],
    items: [
      { id: "timeSetting", label: "把提醒時間設定改成 21:00", detail: "reminderTime", target: "needed" },
      { id: "smallTest", label: "確認提醒文字仍正常出現", detail: "簡單驗證", target: "needed" },
      { id: "rewriteNotification", label: "重寫整個提醒通知模組", detail: "過度", target: "avoid" },
      { id: "changeFoodLog", label: "修改飲食紀錄資料格式", detail: "無關", target: "avoid" },
      { id: "redesignDashboard", label: "重新設計首頁畫面", detail: "無關", target: "avoid" }
    ]
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
  nodes.nextButton.disabled = currentLevel >= unlockedLevel && isInteractiveLevel(level);
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
  if (!level || !isInteractiveLevel(level) || nodes.gamePanel.hidden) return;

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
  if (!isInteractiveLevel(level)) return;

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

function isInteractiveLevel(level) {
  return level && level.mode === "sort";
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
