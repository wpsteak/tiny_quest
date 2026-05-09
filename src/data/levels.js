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
    title: "客人一直改人數，餐廳要怎麼讓大家不混亂？",
    mode: "sort",
    sourceTitle: "餐廳動作",
    zoneTitle: "對訂位資料做什麼",
    context: "客人原本訂位 6 人，後來改成 8 人，現場最後來 7 人。<strong>需要你幫餐廳決定訂位資料是唯一真相來源</strong>。",
    goal: "收到新資訊 → 更新訂位資料；要安排工作時 → 讀取訂位資料。",
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
    title: "AI 讓每個頁面各自存了一份 partySize，怎麼收回來？",
    mode: "sort",
    sourceTitle: "程式裡的動作",
    zoneTitle: "對 reservation 做什麼",
    context: "回到訂位系統。<strong>訂位資料 reservation 是 SSOT</strong>，裡面可放 partySize 與 arrivedCount。",
    goal: "收到新資訊 → 更新 reservation；頁面要資料 → 讀取 reservation。",
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
    title: "折扣規則改了，不想再一個一個店員去通知",
    mode: "sort",
    sourceTitle: "折扣規則",
    zoneTitle: "整理方式",
    context: "店裡有會員折扣、生日折扣和滿額免運。<strong>不要讓每位店員各自背一套</strong>，否則規則一改就會有人還用舊版。",
    goal: "把共用規則和使用規則的人分開。",
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
    title: "老師需要班級點名工具，第一版做到哪裡就夠？",
    mode: "sort",
    sourceTitle: "點名工具功能",
    zoneTitle: "現在要不要做",
    context: "老師的需求只是<strong>每天記錄班上誰到了、誰沒到</strong>。",
    goal: "把現在真的需要的功能，和等需求變明確後再做的功能分開。",
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
