# 新增表單並啟用 AutoNext 功能 - 快速指南

## 📋 完整步驟

### 步驟 1️⃣：創建表單模組文件

在 `CGA/modules/forms/` 創建新文件，例如 `16-form.js`

### 步驟 2️⃣：選擇 AutoNext 方式

有兩種方式，選擇最適合你的：

---

## 🎯 方式 A：使用 `enableForForm`（推薦）

**適用場景**：簡單表單，所有 select 都要自動跳轉

```javascript
class CGAForm16 {
  constructor() {
    this.id = 16;
    this.title = "我的新表單";
  }

  generateHTML() {
    return `
      <div class="sec">
        <h3>我的表單</h3>
        <div class="form">
          <div class="field col-6">
            <label>問題 1</label>
            <select id="q1">
              <option value="">請選擇</option>
              <option value="a">選項 A</option>
            </select>
          </div>
          <!-- 更多欄位... -->
        </div>
      </div>
    `;
  }

  initialize() {
    // ✅ 重點在這裡！
    if (window.AutoNextField) {
      window.AutoNextField.enableForForm(15, {  // ← 頁面索引（從 0 開始）
        delay: 100,        // 跳轉延遲
        autoExpand: true,  // 自動展開下拉選單
        debug: false,      // 除錯模式
        initDelay: 300     // 初始化延遲
      });
      console.log('✅ Form 16 自動跳轉已啟用');
    }
  }

  compute() {
    // 計算邏輯
  }
}

window.CGAForm16 = new CGAForm16();
```

**索引對照表**：
- 第 1 個頁面 → `enableForForm(0, ...)`
- 第 2 個頁面 → `enableForForm(1, ...)`
- 第 16 個頁面 → `enableForForm(15, ...)`
- **公式**：頁面編號 - 1 = 索引

---

## 🎨 方式 B：自定義 AutoNext（完全控制）

**適用場景**：
- 只有部分欄位需要 AutoNext
- 需要自定義跳轉邏輯
- 跳轉時要執行額外動作（如計算）

```javascript
class CGAForm17 {
  constructor() {
    this.id = 17;
    this.title = "我的自定義表單";
    
    // 定義要啟用 AutoNext 的欄位
    this.AUTO_NEXT_FIELDS = [
      { id: 'q1', label: '問題 1' },
      { id: 'q2', label: '問題 2' },
      { id: 'q3', label: '問題 3' }
    ];
  }

  generateHTML() {
    return `<!-- HTML ... -->`;
  }

  initialize() {
    this.setupAutoNext();
  }

  // ✅ 重點在這裡！
  setupAutoNext() {
    this.AUTO_NEXT_FIELDS.forEach((field, index) => {
      const select = document.querySelector(`#${field.id}`);
      
      if (select) {
        select.addEventListener('change', () => {
          // 1️⃣ 選擇後執行動作（可選）
          this.compute();
          
          // 2️⃣ 跳到下一個欄位
          if (index < this.AUTO_NEXT_FIELDS.length - 1) {
            const nextId = this.AUTO_NEXT_FIELDS[index + 1].id;
            const nextSelect = document.querySelector(`#${nextId}`);
            
            if (nextSelect) {
              setTimeout(() => {
                nextSelect.focus();
                
                // 自動展開（可選）
                if (nextSelect.showPicker) {
                  try { nextSelect.showPicker(); } catch (e) {}
                }
              }, 100);
            }
          }
        });
      }
    });
    
    console.log(`✅ 已為 ${this.AUTO_NEXT_FIELDS.length} 個欄位設定 AutoNext`);
  }

  compute() {
    // 計算邏輯
  }
}

window.CGAForm17 = new CGAForm17();
```

---

## 📊 兩種方式對比

| 特性 | 方式 A（enableForForm） | 方式 B（自定義） |
|------|------------------------|----------------|
| **代碼量** | ⭐ 3 行 | ⭐⭐⭐ ~20 行 |
| **靈活性** | ⭐⭐ 中 | ⭐⭐⭐⭐⭐ 非常高 |
| **控制力** | ⭐⭐ 自動找所有 select | ⭐⭐⭐⭐⭐ 完全控制 |
| **依賴** | 依賴 auto-next-field.js | 不依賴外部 |
| **適用** | 簡單表單 | 複雜邏輯 |

**建議**：
- 🟢 **90% 的情況用方式 A** - 簡單快速
- 🟡 **需要特殊邏輯時用方式 B** - 參考 Form 09

---

## 🔧 步驟 3️⃣：註冊到 CGA2.html

### 3-1. 加入 `cga-module-loader.js` 配置

```javascript
// cga-module-loader.js
const FORM_MODULES = [
  // ... 現有的 15 個模組
  { id: 16, title: "我的新表單", module: "./modules/forms/16-form.js", className: "CGAForm16" }
];
```

### 3-2. 加入頁面 HTML

```html
<!-- CGA2.html -->
<main class="container grid cols-2">
  <section class="panel">
    <!-- ... 現有的 15 個頁面 -->
    
    <!-- 16 新表單 -->
    <div class="page" data-title="我的新表單">
      <!-- 表單內容將動態載入 -->
    </div>
  </section>
</main>
```

### 3-3. 加入 `bindAllEvents()` 列表

```javascript
// CGA2.html
function bindAllEvents() {
  const formModules = [
    'CGAForm01', 'CGAForm02', 'CGAForm03', 'CGAForm04',
    'CGAForm06', 'CGAForm07', 'CGAForm08', 'CGAForm10',
    'CGAForm11', 'CGAForm13', 'CGAForm15',
    'CGAForm16'  // ← 新增這行
  ];
  
  formModules.forEach(moduleName => {
    if (window[moduleName] && typeof window[moduleName].initialize === 'function') {
      window[moduleName].initialize();
    }
  });
}
```

---

## ✅ 完成！

刷新頁面後：
1. 切換到新表單
2. 選擇第一個 select
3. 應該會自動跳到下一個欄位 ✨

---

## 🐛 常見問題

### Q1: AutoNext 沒作用？

**檢查清單**：
- [ ] `enableForForm` 的索引是否正確？（頁面編號 - 1）
- [ ] `initialize()` 有被呼叫嗎？（看 console 有沒有 log）
- [ ] 表單有加入 `bindAllEvents()` 的列表嗎？
- [ ] HTML 中的 select 有正確生成嗎？

### Q2: 如何只為特定欄位啟用？

用**方式 B（自定義）**，在 `AUTO_NEXT_FIELDS` 陣列中只列出需要的欄位。

### Q3: 如何在跳轉時執行計算？

**方式 A**：在 `enableForForm` 的選項中無法直接執行，需改用方式 B

**方式 B**：在 `change` 事件中加入 `this.compute()`

```javascript
select.addEventListener('change', () => {
  this.compute();  // ← 跳轉前先計算
  // ... 跳轉邏輯
});
```

### Q4: 自動展開選單不work？

某些瀏覽器/環境不支援 `showPicker()`，這是正常的。用戶仍然可以手動點擊選單。

---

## 📚 參考範例

- **方式 A 範例**：`modules/forms/01-form.js`, `02-form.js`, `06-form.js`, `07-form.js`
- **方式 B 範例**：`modules/forms/09-form.js`（最佳實踐）

---

## 🎯 推薦做法

**對於新表單**：
1. 先用**方式 A**（enableForForm）- 快速實現
2. 如果需要特殊邏輯，再改成**方式 B**（自定義）
3. 參考 **Form 09** 的實作（最乾淨的範例）

**記住**：功能正常最重要，代碼簡潔次之！
