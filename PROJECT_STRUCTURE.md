# 專案架構分析與分類

## 📋 專案概述
這是一個醫療照護系統，包含跌倒管理系統和綜合老年評估（CGA）系統。

---

## 🗂️ 完整目錄結構

```
web/
├── 📄 index.html                    # 主系統入口（跌倒管理主控面板）
├── 📄 README.md                     # 專案說明文件
├── 📄 changelog.json                # 版本變更紀錄
│
├── 📁 CGA/                          # ✅ 綜合老年評估系統（主要工作區）
│   ├── 📄 CGA2.html                 # CGA 主頁面
│   ├── 📄 cga-module-loader.js      # 表單模組動態載入器
│   └── 📁 modules/
│       └── 📁 forms/
│           ├── 📄 01-form.js        # 基本資料表單
│           ├── 📄 02-form.js        # 個人史/家系圖
│           ├── 📄 03-form.js        # ADL (Barthel)
│           ├── 📄 04-form.js        # IADL (Lawton)
│           ├── 📄 05-form.js        # Mini-Cog / MMSE
│           ├── 📄 06-form.js        # MoCA
│           ├── 📄 07-form.js        # GDS-5 / CAM / Braden
│           ├── 📄 08-form.js        # 營養 (MNA-SF)
│           ├── 📄 09-form.js        # 行動/肌少 (CHS)
│           ├── 📄 10-form.js        # 跌倒評估 (STRATIFY / Morse)
│           ├── 📄 11-form.js        # B9 生活品質 (EQ-5D-3L / VAS)
│           ├── 📄 12-form.js        # B11 嚴重度指數
│           ├── 📄 13-form.js        # CCI 共病指數
│           ├── 📄 14-form.js        # 出院狀況
│           └── 📄 15-form.js        # 摘要/匯出
│
├── 📁 tools/                        # ✅ 共用工具模組（已重構並重命名）
│   ├── 📄 auto-next-field.js        # 自動跳下一欄工具（原 form-auto-focus.js）
│   ├── 📄 choice-card-builder.js    # 選擇題卡片建構器（原 card-radio-builder.js）
│   ├── 📄 dropdown-builder.js       # 下拉選單建構器（原 select-builder.js）
│   ├── 📄 message-box-builder.js    # 訊息框建構器（原 info-box-builder.js）
│   ├── 📄 date-picker-helper.js     # Flowbite Datepicker 中文化（原 datepicker-init.js）
│   └── 📄 datepicker-theme.css      # Datepicker 主題樣式（緊湊設計）
│
├── 📁 modules/                      # 🏥 跌倒預防系統模組
│   ├── 📄 tools-module.js           # 跌倒預防工具庫主模組
│   └── 📁 form/
│       ├── 📄 es3c.js               # 3C 床邊環境安全巡檢表
│       └── 📄 sp3e.js               # 3E 安全移位臨床路徑
│
├── 📁 data/                         # 📊 資料檔案
│   └── 📄 changelog.js              # 變更日誌 JavaScript 版本
│
├── 📁 docs/                         # 📖 文件與參考
│   └── 📄 dischargeplan01_with_3e_fix2e80.html
│
├── 📁 assets/                       # 🎨 靜態資源（空）
│
└── 📁 archive/                      # 🗄️ 歷史備份
    ├── 📁 backup/
    │   ├── 📁 CGA/
    │   │   └── 📄 CGA2.html         # CGA 舊版本
    │   ├── 📁 Ref/                  # 參考文件與 PDF
    │   │   ├── 📄 8.周全性老年人身心功能（CGA）評估表單.pdf
    │   │   └── 📁 Fall prevention hospital toolkit/
    │   │       └── ... (32個跌倒預防工具文件)
    │   ├── 📁 出院資訊網頁/
    │   │   └── ... (舊版出院規劃 HTML)
    │   └── 📁 呼吸器病人提早離床/
    │       └── ... (呼吸器病人相關 HTML)
    └── 📁 新增資料夾/
        └── 📄 tools-module1.js      # 舊版工具模組備份
```

---

## 🎯 核心系統分類

### 1️⃣ **主系統入口**
| 檔案 | 用途 | 狀態 |
|------|------|------|
| `index.html` | 跌倒管理系統主控面板 | ✅ 使用中 |

### 2️⃣ **跌倒預防系統**
| 檔案/目錄 | 用途 | 狀態 |
|-----------|------|------|
| `modules/tools-module.js` | 跌倒預防工具庫管理器 | ✅ 使用中 |
| `modules/form/es3c.js` | 3C 床邊環境安全巡檢表 | ✅ 使用中 |
| `modules/form/sp3e.js` | 3E 安全移位臨床路徑 | ✅ 使用中 |

### 3️⃣ **CGA 系統（綜合老年評估）**
| 檔案/目錄 | 用途 | 狀態 |
|-----------|------|------|
| `CGA/CGA2.html` | 綜合老年評估主頁面 | ✅ 主要使用 |
| `CGA/cga-module-loader.js` | 動態載入 15 個表單模組 | ✅ 使用中 |
| `CGA/modules/forms/01-15-form.js` | 15 個評估表單模組 | ✅ 使用中 |

**15 個表單模組說明：**
1. **01-form.js** - 基本資料（姓名、年齡、身高體重、BMI、日期選擇器）
2. **02-form.js** - 個人史/家系圖/功能回顧/跌倒記事
3. **03-form.js** - ADL (Barthel 量表)
4. **04-form.js** - IADL (Lawton 量表)
5. **05-form.js** - Mini-Cog / CDT / MMSE
6. **06-form.js** - MoCA (蒙特利爾認知評估)
7. **07-form.js** - GDS-5 / CAM / Braden
8. **08-form.js** - 營養評估 (MNA-SF)
9. **09-form.js** - 行動能力/肌少症 (CHS 衰弱量表)
10. **10-form.js** - 跌倒風險評估 (STRATIFY / Morse)
11. **11-form.js** - 生活品質 (EQ-5D-3L / VAS)
12. **12-form.js** - 嚴重度指數
13. **13-form.js** - CCI 共病指數
14. **14-form.js** - 出院狀況
15. **15-form.js** - 摘要/匯出功能

### 4️⃣ **共用工具模組（已重構並重命名）**

#### 📦 工具模組列表
| 檔案 | 類別/函數 | 用途 | 狀態 |
|------|----------|------|------|
| `auto-next-field.js` | `AutoNextField` | 自動跳到下一個輸入欄位 | ✅ 使用中 |
| `choice-card-builder.js` | `ChoiceCardBuilder` | 生成卡片式選擇題（ADL/IADL） | ✅ 使用中 |
| `dropdown-builder.js` | `DropdownBuilder` | 快速生成下拉選單 | ✅ 使用中 |
| `message-box-builder.js` | `MessageBoxBuilder` | 生成提示訊息框 | ✅ 使用中 |
| `date-picker-helper.js` | `DatepickerHelper` | Flowbite Datepicker 中文化 | ✅ 使用中 |
| `datepicker-theme.css` | - | Datepicker 緊湊主題樣式 | ✅ 使用中 |

#### 🔄 命名更新歷史（2025-10-04）
所有工具已重新命名為更直觀的名稱，舊名稱已完全移除：

| 舊名稱（已廢棄） | 新名稱 | 更新日期 |
|----------------|--------|---------|
| ~~`FormAutoFocus`~~ | `AutoNextField` | 2025-10-04 |
| ~~`CardRadioBuilder`~~ | `ChoiceCardBuilder` | 2025-10-04 |
| ~~`SelectBuilder`~~ | `DropdownBuilder` | 2025-10-04 |
| ~~`InfoBoxBuilder`~~ | `MessageBoxBuilder` | 2025-10-04 |
| ~~`datepicker-init.js`~~ | `date-picker-helper.js` | 2025-10-04 |

#### 📖 工具模組詳細說明

**1. AutoNextField** - 自動跳轉工具
```javascript
// 為整個表單啟用自動跳轉
AutoNextField.enableForForm(0, {
  autoExpand: true,  // 自動展開下拉選單
  delay: 100,        // 跳轉延遲（毫秒）
  debug: false       // 除錯模式
});

// 為特定容器啟用
AutoNextField.enable(containerElement, options);
```
- ✅ 自動跳到下一個輸入欄位
- ✅ 支援自動展開下拉選單（showPicker API）
- ✅ 智慧跳過隱藏欄位

**2. ChoiceCardBuilder** - 選擇題卡片建構器
```javascript
const builder = new ChoiceCardBuilder({
  columns: 2,        // 2 欄佈局
  gap: '1.5rem',     // 間距
  showScore: true    // 顯示分數
});
builder.build(items, namePrefix, container);
```
- ✅ 卡片式選擇題佈局
- ✅ 自動計算分數
- ✅ 支援男性跳過選項（IADL）

**3. DropdownBuilder** - 下拉選單建構器
```javascript
// 建立單個下拉選單
DropdownBuilder.create({
  id: 'sex',
  label: '性別',
  options: ['男', '女'],
  required: true,
  colSpan: 'col-2'
});

// 批次建立多個下拉選單
DropdownBuilder.createMultiple([{...}, {...}]);

// 建立分數選單（0-10）
DropdownBuilder.createScore({id: 'score', label: '分數', max: 10});
```
- ✅ 快速生成 HTML
- ✅ 支援批次建立
- ✅ 自動加入必填星號

**4. MessageBoxBuilder** - 訊息框建構器
```javascript
MessageBoxBuilder.info('提示訊息');
MessageBoxBuilder.warning('警告訊息');
MessageBoxBuilder.success('成功訊息');
MessageBoxBuilder.error('錯誤訊息');
MessageBoxBuilder.link('https://...', '點擊連結');
```
- ✅ 5 種訊息類型
- ✅ 漸層背景與左側彩條
- ✅ 支援 HTML 內容

**5. DatepickerHelper** - 日期選擇器
```javascript
DatepickerHelper.init(['birthDate', 'admDate']);
```
- ✅ 完整中文化（月份、星期、按鈕）
- ✅ MutationObserver 自動監控 DOM
- ✅ 緊湊設計（28px 按鈕、32px 單元格）
- ✅ 自動適配主題（亮色/暗色）

---

## 🔧 技術堆疊

### 前端框架/函式庫
- **Flowbite 3.1.2** - UI 元件庫（Datepicker）
- **Tailwind CSS** - 透過 Flowbite 引入
- **Vanilla JavaScript** - 純 JavaScript，無框架

### 樣式系統
- **CSS Variables** - 主題變數系統（亮色/暗色模式）
- **Google Fonts** - Noto Sans TC, Noto Serif TC

### 資料處理
- **LocalStorage** - 瀏覽器本地儲存
- **JSON** - 資料序列化格式
- **CSV** - 匯出格式

---

## 📦 模組依賴關係

```
CGA2.html
  │
  ├─→ Flowbite CSS & JS (CDN)
  ├─→ tools/datepicker-theme.css
  ├─→ tools/auto-next-field.js (新命名)
  ├─→ tools/choice-card-builder.js (新命名)
  ├─→ tools/dropdown-builder.js (新命名)
  ├─→ tools/message-box-builder.js (新命名)
  ├─→ tools/date-picker-helper.js (新命名)
  ├─→ cga-module-loader.js
  │     │
  │     └─→ modules/forms/01-form.js (使用 DropdownBuilder, AutoNextField)
  │     └─→ modules/forms/02-form.js
  │     └─→ modules/forms/03-form.js (使用 ChoiceCardBuilder - ADL)
  │     └─→ modules/forms/04-form.js (使用 ChoiceCardBuilder - IADL)
  │     └─→ modules/forms/05-form.js (使用 MessageBoxBuilder)
  │     └─→ modules/forms/06-form.js (使用 AutoNextField, MessageBoxBuilder - MoCA)
  │     └─→ ... (07-15)
  │
  └─→ 內嵌 JavaScript (主邏輯)
        ├─ 步驟導航
        ├─ 表單計算
        ├─ 資料儲存/載入
        └─ 主題切換
```

---

## 🎨 設計系統

### CSS 變數架構
```css
/* 色彩系統 */
--bg: 背景色
--ink: 主要文字色
--muted: 次要文字色
--line: 邊框色
--card-bg: 卡片背景色
--brand: 品牌色（藍色）
--surface: 表面色（淺灰）

/* 狀態色 */
--success: 成功（綠色）
--warning: 警告（橙色）
--danger: 危險（紅色）
--info: 資訊（藍色）
```

### 主題模式
- ✅ **亮色主題** (預設)
- ✅ **暗色主題** (可切換)
- ✅ **LocalStorage 記憶** (跨頁面共享)

---

## 🗑️ 已清理項目

### ✅ 已刪除的空資料夾
1. ✅ `modules/assessment/` - 已刪除
2. ✅ `modules/management/` - 已刪除
3. ✅ `modules/patient/` - 已刪除

---

## 📝 建議的未來改進

### 1. 模組化建議
```
web/
├── src/                    # 原始碼
│   ├── core/               # 核心邏輯
│   ├── components/         # UI 元件
│   └── utils/              # 工具函數
├── public/                 # 靜態資源
└── dist/                   # 編譯輸出
```

### 2. 開發工具
- [ ] 考慮引入打包工具（Vite / Webpack）
- [ ] 加入 TypeScript（型別安全）
- [ ] 建立測試環境（Jest / Vitest）

### 3. 程式碼品質
- [ ] ESLint 程式碼規範
- [ ] Prettier 格式化
- [ ] Git Hooks (Husky)

---

## 📊 專案統計

| 項目 | 數量 |
|------|------|
| 主要 HTML 檔案 | 2 個 (index.html, CGA2.html) |
| CGA 表單模組 | 15 個 |
| 跌倒預防工具 | 3 個 (tools-module.js + 2 表單) |
| 共用工具模組 | 6 個 (5 個 JS + 1 個 CSS) |
| 已清理空資料夾 | 3 個 |
| 備份檔案 | 32+ 個 (archive/) |
| 重命名工具 | 5 個 (2025-10-04 更新) |

---

## 🚀 快速開始

### 開啟 CGA 系統
```
1. 開啟 web/CGA/CGA2.html
2. 系統會自動載入所有 15 個表單模組
3. Datepicker 已自動中文化
```

### 使用共用工具
```javascript
// 日期選擇器
DatepickerHelper.init(['birthDate', 'admDate', 'dischargeDate']);

// 自動跳轉
AutoNextField.enableForForm(0, {autoExpand: true});

// 下拉選單
const html = DropdownBuilder.create({
  id: 'sex', label: '性別', options: ['男', '女']
});

// 訊息框
const info = MessageBoxBuilder.info('這是提示訊息');
```

### 主題切換
```javascript
// 點擊右上角 🌙/☀️ 按鈕
// 主題設定儲存在 localStorage，跨頁面共享
```

---

## 📧 維護資訊

**最後更新：** 2025-10-04  
**版本：** CGA 2.1 (工具模組重構版)  
**技術棧：** Vanilla JS + Flowbite + CSS Variables  
**重大更新：** 所有共用工具已重新命名並移除向下相容別名

---

## ✅ 已完成功能清單

### 核心功能
- [x] 15 個評估表單模組化
- [x] 動態載入機制
- [x] Datepicker 中文化
- [x] 緊湊主題設計
- [x] 亮色/暗色主題切換
- [x] LocalStorage 資料儲存
- [x] JSON/CSV 匯出功能
- [x] 自動計算與驗證
- [x] 跨頁面主題記憶

### 工具模組（2025-10-04 重構完成）
- [x] 所有工具重新命名為直觀名稱
- [x] 移除所有向下相容別名
- [x] 所有表單模組已更新為新 API
- [x] AutoNextField - 自動跳轉工具
- [x] ChoiceCardBuilder - 選擇題卡片建構器
- [x] DropdownBuilder - 下拉選單建構器
- [x] MessageBoxBuilder - 訊息框建構器
- [x] DatepickerHelper - 日期選擇器輔助工具

### 程式碼品質
- [x] 單一職責原則（每個工具專注單一功能）
- [x] 命名語義化（名稱清楚表達用途）
- [x] 模組化設計（低耦合、高內聚）
- [x] API 一致性（統一的調用方式）

---

**備註：** 此文件為專案架構分析，定期更新以反映最新變更。
