export const levels = [
  {
    type: "說明",
    title: "AI 寫得快，但你得看得住整個系統",
    mode: "explain",
    html: `
      <p>AI 很會產生程式碼。</p>
      <p class="lede">但 AI <strong>缺乏大局觀</strong>。它只看眼前的任務，不看整個系統。</p>
      <p>所以 AI 不會主動替你維持:</p>
      <ul>
        <li>系統邊界</li>
        <li>資料一致性</li>
        <li>長期可維護性</li>
      </ul>
      <p class="lede"><strong>人負責架構判斷，AI 負責加速實作。</strong></p>
      <p class="muted">這堂課的目標：練架構判斷的眼光，而不是背 SRP / SSOT / DRY 這些名詞。</p>
    `
  },
  {
    type: "說明",
    title: "AI Coding 的常見失控",
    mode: "explain",
    html: `
      <ul>
        <li>功能塞錯位置</li>
        <li>單一檔案越寫越長</li>
        <li>同一份資料各存一份</li>
        <li>同一條規則複製好幾次</li>
        <li>小需求被做成大架構</li>
      </ul>
      <p>這堂課要練的：<strong>看懂亂在哪，以及怎麼指揮 AI 整理回來</strong>。</p>
      <p class="muted">會帶到的五個原則:&nbsp;SRP / SSOT / DRY / KISS / 最小改動</p>
    `
  },
  {
    type: "說明",
    title: "想像你剛搬進一個什麼都沒有的新家",
    mode: "explain",
    html: `
      <p>搬家工人把所有家具堆在門口：沙發、床、鍋子、衣櫃全混在一起。</p>
      <p class="lede">程式如果全部塞在 <code>main</code> 裡，就是這種感覺。</p>
      <p>接下來你要做的事：<strong>幫這個家分出空間</strong>。</p>
    `
  },
  {
    type: "互動關卡",
    title: "剛搬進新家，家具該分到哪？",
    mode: "sort",
    sourceTitle: "門口",
    zoneTitle: "家裡空間",
    context: "你剛搬好家，<strong>所有家具還堆在門口</strong>，得把它們安頓進合適的房間。",
    goal: "把每件家具拖到最合理的房間（也可以先點家具，再點房間）。",
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
    cumulativeFrom: 3,
    sourceTitle: "新增物品",
    zoneTitle: "現有空間",
    context: "搬進去新家一陣子之後，<strong>家人多了一個小需求：想在客廳邊看電視邊練一下啞鈴</strong>。",
    goal: "把啞鈴放到最符合這個需求的空間。",
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
    title: "健身器材越來越多，客廳塞不下了",
    mode: "sort",
    cumulativeFrom: 4,
    sourceTitle: "又新增的物品",
    zoneTitle: "重新規劃空間",
    context: "上一關啞鈴先放客廳是合理的暫放，但<strong>健身器材越來越多，客廳空間開始不夠放了</strong>。",
    goal: "把健身相關物品集中到新的專屬空間：健身房。",
    success: "你把變大的同類責任抽成新空間了。這就是重構：當既有空間開始混亂，才把一群相關責任搬到新的模組。",
    failureHint: "這次重點不是啞鈴能不能放客廳，而是健身相關物品變多後，需要集中到專屬新空間。",
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
    title: "對應回程式場景：以健康管理 App 為例",
    mode: "explain",
    html: `
      <ul>
        <li>空間 = module（負責一類事情）</li>
        <li>家具 = function（放在最能說明用途的位置）</li>
      </ul>
      <p>以健康管理 App 為例，可以依責任拆成幾個模組：</p>
      <ul>
        <li><strong>個人目標設定 goalSetting</strong>：身高、體重、年齡、目標。</li>
        <li><strong>飲食紀錄 mealLog</strong>：新增餐點、查詢每天吃了什麼。</li>
        <li><strong>熱量計算 calorie</strong>：把餐點或目標換算成熱量。</li>
        <li><strong>成果報告 report</strong>：整理週報、趨勢、提醒。</li>
      </ul>
    `
  },
  {
    type: "互動關卡",
    title: "AI 把所有功能都塞進 main 了，怎麼分回模組？",
    mode: "sort",
    sourceTitle: "main 裡的function",
    zoneTitle: "已建立模組",
    context: "之前跟AI vibe coding 了一個健康管理 App。<strong>AI 把所有功能都塞進 main</strong>，現在裡面有無敵長的程式碼，什麼都做。",
    goal: "看每張卡的大字中文判斷它在處理哪種資料，拖到最符合責任的模組。",
    success: "現在 main 變小了：它只需要協調流程，細節交給各模組處理。",
    failureHint: "先看中文大字：它主要在處理個人目標設定、飲食紀錄、熱量，還是報告？",
    zones: [
      { id: "goalSetting", name: "個人目標設定", hint: "goalSetting" },
      { id: "mealLog", name: "飲食紀錄", hint: "mealLog" },
      { id: "calorie", name: "熱量計算", hint: "calorie" },
      { id: "report", name: "成果報告", hint: "report" }
    ],
    items: [
      { id: "setGoal", label: "設定每日目標", detail: "setDailyGoal()", target: "goalSetting" },
      { id: "addMeal", label: "新增飲食記錄", detail: "addMeal()", target: "mealLog" },
      { id: "calcCalories", label: "計算這餐熱量", detail: "calculateMealCalories()", target: "calorie" },
      { id: "weekly", label: "產生每週報告", detail: "buildWeeklyReport()", target: "report" }
    ]
  },
  {
    type: "互動關卡",
    title: "使用者又提出新需求了，該歸類到哪裡？",
    mode: "sort",
    cumulativeFrom: 7,
    sourceTitle: "新增功能卡",
    zoneTitle: "現有模組",
    context: "main 已經變乾淨了！<strong>使用者想加一個「提醒今天記得記錄晚餐」的小功能</strong>。這個功能應該要放到哪個模組裡面呢？",
    goal: "把這張新卡放到最接近它目前最主要職責的模組。",
    success: "這是合理的暫放：這張卡有「記錄」的意思，先放在飲食紀錄可以。但它真正做的事是提醒使用者，等提醒功能變多時，再考慮拆出提醒通知。",
    failureHint: "這張卡有「記錄」的意思，但目前只有一個提醒功能。先找最接近的既有模組。",
    zones: [
      { id: "goalSetting", name: "個人目標設定", hint: "goalSetting" },
      { id: "mealLog", name: "飲食紀錄", hint: "mealLog，小提醒可先放這裡" },
      { id: "calorie", name: "熱量計算", hint: "calorie" },
      { id: "report", name: "成果報告", hint: "report" }
    ],
    newItems: [
      { id: "dinnerReminder", label: "飲食記錄提醒", detail: "remindMealLog()", target: "mealLog" }
    ]
  },
  {
    type: "互動關卡",
    title: "提醒功能變多了，是時候拆出來了",
    mode: "sort",
    cumulativeFrom: 8,
    sourceTitle: "又新增的提醒",
    zoneTitle: "重新規劃模組",
    context: "上一關晚餐提醒先放飲食紀錄還可以，但<strong>提醒功能變多了，飲食紀錄開始同時做「保存吃了什麼」和「叫使用者去做事」兩件事</strong>。",
    goal: "新增「提醒通知」模組，把所有提醒類功能集中過去。",
    success: "現在更清楚了：飲食紀錄負責保存吃了什麼，提醒通知負責叫使用者去做事。一開始只有一個提醒，暫放在飲食紀錄可以；但提醒變多後，就值得拆成自己的模組。",
    failureHint: "現在提醒功能變多了。想想哪些卡是在保存資料，哪些卡是向使用者發出提醒。",
    zones: [
      { id: "goalSetting", name: "個人目標設定", hint: "goalSetting" },
      { id: "mealLog", name: "飲食紀錄", hint: "mealLog" },
      { id: "calorie", name: "熱量計算", hint: "calorie" },
      { id: "report", name: "成果報告", hint: "report" },
      { id: "notification", name: "提醒通知", hint: "reminder" }
    ],
    newItems: [
      { id: "standReminder", label: "站立提醒", detail: "remindStand()", target: "notification" },
      { id: "waterReminder", label: "喝水提醒", detail: "remindDrinkWater()", target: "notification" },
      { id: "reportReminder", label: "週報出爐提醒", detail: "remindWeeklyReport()", target: "notification" }
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
      <p>AI 缺少全局視野，常把新功能塞到最近、最快能完成的位置。</p>
      <ul>
        <li>它不見得會注意到哪個既有模組才是該放的位置</li>
        <li>放任久了，相關功能會東一個西一個散落各處</li>
      </ul>
      <p class="lede"><strong>這時你要請 AI 幫你重構，讓各模組各司其職。</strong></p>
    `
  },
  {
    type: "說明",
    title: "同一件事，到底誰說了算？",
    mode: "explain",
    html: `
      <p><strong>SSOT</strong> 是 Single Source of Truth，意思是「同一件事只認一個真相來源」。</p>

      <p>AI coding 常常是「局部解題」：</p>
      <ul class="tight">
        <li>你叫它改首頁，它就看首頁；你叫它改統計，它就看統計。</li>
        <li>當不同地方都需要同一份資料時，AI 可能會各放一份，讓每個地方先跑起來。</li>
      </ul>

      <p>長期來看，會越來越難維護</p>
      <p class="tight lede"><strong>你以為 AI 改好了，結果只是眼前那頁改了；<br/>換個頁面一用，舊邏輯全部冒出來。</strong></p>
      <p class="tight">SSOT 是讓同一份資訊、狀態或核心規則只有一個可信來源，避免各處各自維護而產生不一致。</p>
    `
  },
  {
    type: "說明",
    title: "想像你在一間很忙的餐廳接訂位",
    mode: "explain",
    html: `
      <p>晚餐時段快到了，客人一直打電話改訂位人數。</p>
      <p>老闆、服務生、廚房、座位安排都需要知道：<strong>這桌到底要準備幾個人？</strong></p>
      <p class="lede">如果每個人都自己記一份，很快就會有人拿到舊資訊。</p>
      <p>接下來你要做的事：<strong>決定哪些動作要更新訂位資料，哪些動作只應該讀取訂位資料。</strong></p>
    `
  },
  {
    type: "互動關卡",
    title: "AI 讓每個區域各自記了一個人數版本，現在該收去哪？",
    mode: "sort",
    sourceTitle: "要建立的共用資料",
    zoneTitle: "餐廳分工",
    sink: {
      id: "duplicateCopies",
      title: "待整併",
      name: "散落的人數副本",
      hint: "不該留在各組"
    },
    context: "餐廳太忙，AI 像臨時幫手一樣，讓每個區域先記一份人數：<strong>王小姐現場填單預約 6 人，後來又打電話改成 8 人</strong>，結果資訊散在不同地方。",
    goal: "建立正式訂位資料，並把各組自己記下的人數版本移到待整併區。",
    success: "你建立了唯一資料來源，也抓出了散落的人數副本。下一步才是判斷哪些動作要更新它、哪些動作要讀取它。",
    failureHint: "正式訂位資料應該放進餐廳分工裡；各組自己記下的人數版本應該移到待整併區。",
    zones: [
      { id: "frontDeskTeam", name: "櫃台組", hint: "接待、現場協調" },
      { id: "phoneTeam", name: "電話組", hint: "接聽來電" },
      { id: "kitchenTeam", name: "廚房組", hint: "準備餐點" },
      { id: "reservationData", name: "正式訂位資料", hint: "唯一人數來源" }
    ],
    items: [
      { id: "reservationDataCard", label: "正式訂位資料", detail: "所有組都要認這一份", target: "reservationData", carryForward: true },
      { id: "frontDeskTeamPartySize", label: "王小姐現場填單 6 人", detail: "櫃台組留下的原始預約版本", target: "duplicateCopies" },
      { id: "phoneTeamPartySize", label: "王小姐電話改成 8 人", detail: "電話組接到來電後隨手抄下的人數版本", target: "duplicateCopies" },
      { id: "kitchenTeamPartySize", label: "王小姐原訂 6 人", detail: "廚房組收到的舊人數版本", target: "duplicateCopies" }
    ],
    initialPlacements: {
      frontDeskTeamPartySize: "frontDeskTeam",
      phoneTeamPartySize: "phoneTeam",
      kitchenTeamPartySize: "kitchenTeam"
    }
  },
  {
    type: "互動關卡",
    title: "有了正式訂位資料後，誰該更新，誰該讀取？",
    mode: "sort",
    cumulativeFrom: 13,
    carryForward: "persistent",
    sourceTitle: "資料使用方式",
    zoneTitle: "餐廳分工",
    context: "上一關你已經建立了<strong>正式訂位資料</strong>。現在各組做自己的工作時，不該再自己保存人數版本，而是要在自己的流程裡讀取或寫入正式訂位資料。",
    goal: "把每張流程卡放回負責的組別：誰接到新資訊就寫入正式訂位資料，誰需要人數就讀取正式訂位資料。",
    success: "現在脈絡完整了：正式訂位資料是唯一來源；各組在自己的業務流程裡讀取或寫入它。",
    failureHint: "先看這件事是誰負責做：電話改人數屬於電話組，現場報到屬於櫃台組，準備份量屬於廚房組。",
    zones: [
      { id: "frontDeskTeam", name: "櫃台組", hint: "接待、現場協調" },
      { id: "phoneTeam", name: "電話組", hint: "接聽來電" },
      { id: "kitchenTeam", name: "廚房組", hint: "準備餐點" },
      { id: "reservationData", name: "正式訂位資料", hint: "唯一人數來源" }
    ],
    newItems: [
      { id: "phoneWriteReservationData", label: "電話改人數時，寫入正式訂位資料", detail: "電話組的流程", target: "phoneTeam" },
      { id: "frontDeskWriteReservationData", label: "現場報到時，寫入正式訂位資料", detail: "櫃台組的流程", target: "frontDeskTeam" },
      { id: "kitchenReadReservationData", label: "準備餐點時，讀取正式訂位資料", detail: "廚房組的流程", target: "kitchenTeam" }
    ]
  },
  {
    type: "說明",
    title: "同一條規則複製三份，改的時候會漏掉哪份？",
    mode: "explain",
    html: `
      <p><strong>DRY</strong> 是 Don't Repeat Yourself，意思是「不要把同一套規則到處複製」。</p>
      <p>AI 很常用複製貼上解決局部問題，因為那樣最快。但如果同一條規則在三個地方各寫一份，以後改規則就會漏。</p>
      <p>DRY 不是追求完全沒有重複文字，而是提醒你：同一條會一起變的規則，不要維護很多份。</p>
    `
  },
  {
    type: "互動關卡",
    title: "AI 在三個頁面各複製了一份 Email 驗證規則",
    mode: "sort",
    sourceTitle: "Email 檢查功能",
    zoneTitle: "DRY 整理",
    context: "App 有<strong>註冊、登入、個人資料三個地方都要檢查 Email</strong>，規則一樣。",
    goal: "把共用規則集中，讓各頁面使用同一個檢查工具。",
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
    title: "下一個維護的人能不能五分鐘內看懂你的設計？",
    mode: "explain",
    html: `
      <p><strong>KISS</strong> 是 Keep It Simple，意思是「先讓設計簡單」。</p>
      <p>AI 看過很多大型專案，所以有時會把小工具做得像大系統。你只是要簡單登入，它可能生出 service、manager、factory、strategy、repository 一大堆。</p>
      <p>好設計不是看起來很厲害，而是下一個人能快速理解、能安全修改。先做剛好能使用、能理解的版本，需求真的變複雜時再重構。</p>
    `
  },
  {
    type: "互動關卡",
    title: "只是要做簡單登入，AI 卻丟出一整套大架構",
    mode: "sort",
    sourceTitle: "AI 提出的登入設計",
    zoneTitle: "KISS 判斷",
    context: "你只是要<strong>一個簡單登入畫面</strong>，AI 卻丟出 service / factory / strategy 一整套架構。",
    goal: "把第一版需要的東西和過度設計分開。",
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
    title: "需求只動一格，要怎麼擋住順手大改的衝動？",
    mode: "explain",
    html: `
      <p><strong>最小改動原則</strong> 是：需求只要改一小件事，就不要順手重寫一大片。</p>
      <p>例如餐廳只是要把雞腿飯從 120 元改成 130 元，好的做法是改價目表那一格；壞的做法是重做整份菜單、換收銀流程、順手改海報版型。</p>
      <p>AI coding 很常過度熱心。你要學會要求 AI：「只改必要位置，不要重構無關檔案，不要改既有行為。」</p>
    `
  },
  {
    type: "互動關卡",
    title: "老師只要記錄『誰到了』，AI 卻順手加了 QR code 和家長通知",
    mode: "sort",
    sourceTitle: "點名工具功能",
    zoneTitle: "在不在這次需求裡",
    context: "老師的需求是<strong>每天記錄班上誰到了、誰沒到</strong>。",
    goal: "把這次需求真的要做的，和需求沒提到的功能分開。",
    success: "最小改動的精神：老師只要『誰到了』，就只做這個。QR code、家長通知、統計報表雖然可能有用，但都超出這次需求。",
    failureHint: "回到老師說的需求：每天記錄誰到了。需求沒提到的功能，這次先不要做進來。",
    zones: [
      { id: "now", name: "現在需要", hint: "第一版就要能用" },
      { id: "later", name: "先不要", hint: "需求明確後再加" }
    ],
    items: [
      { id: "presentAbsent", label: "當天到 / 未到", detail: "基本狀態", target: "now" },
      { id: "qrCode", label: "QR code 自動簽到", detail: "可以以後再說", target: "later" },
      { id: "parentNotify", label: "自動通知家長", detail: "還不是第一版必要", target: "later" },
      { id: "analytics", label: "出席統計儀表板", detail: "先不要過度設計", target: "later" }
    ]
  },
  {
    type: "互動關卡",
    title: "雞腿飯要漲 10 元，要動到哪些地方才算對？",
    mode: "sort",
    sourceTitle: "可能的改動",
    zoneTitle: "改動範圍",
    context: "需求只有一個：<strong>雞腿飯從 120 元改成 130 元</strong>。",
    goal: "選出真正必要的改動；和需求無關的改動放到「不要動」。",
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
    title: "提醒時間要晚一小時，怎麼請 AI 不要順便重構？",
    mode: "sort",
    sourceTitle: "AI 想改的地方",
    zoneTitle: "是否該改",
    context: "需求是<strong>把提醒時間從晚上 8 點改成晚上 9 點</strong>。",
    goal: "把必要改動和過度改動分開，避免請 AI 順手重構無關檔案。",
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
      { id: "changemealLog", label: "修改飲食紀錄資料格式", detail: "無關", target: "avoid" },
      { id: "redesignDashboard", label: "重新設計首頁畫面", detail: "無關", target: "avoid" }
    ]
  }
];
