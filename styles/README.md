# CSS 模組化重構說明

## 📁 新增的共用樣式檔案

已將 `index.html` 和 `CGA2.html` 中重複的 CSS 提取到獨立檔案：

```
web/
└── styles/                          # 新建立的樣式目錄
    ├── theme-variables.css          # 主題變數系統
    ├── base.css                     # 基礎樣式
    ├── buttons.css                  # 按鈕系統
    └── forms.css                    # 表單控件
```

---

## 📋 各檔案功能說明

### 1. `theme-variables.css` (147 行)
**包含內容：**
- ✅ CSS 變數定義（亮色主題）
- ✅ CSS 變數定義（暗色主題）
- ✅ 色彩系統（基礎、品牌、狀態色）
- ✅ 陰影和表面效果

**適用範圍：** 所有頁面必須引入

---

### 2. `base.css` (78 行)
**包含內容：**
- ✅ 基礎重置（box-sizing）
- ✅ 主題切換過渡效果
- ✅ body 樣式
- ✅ 標題階層（h1, h2, h3）
- ✅ 容器樣式
- ✅ 響應式斷點

**適用範圍：** 所有頁面必須引入

---

### 3. `buttons.css` (122 行)
**包含內容：**
- ✅ 基礎按鈕樣式（.btn）
- ✅ Hover/Active 狀態
- ✅ 變體：primary, warn, success, danger
- ✅ 尺寸變體：.sm
- ✅ 響應式調整

**適用範圍：** 所有使用按鈕的頁面

---

### 4. `forms.css` (130 行)
**包含內容：**
- ✅ label 樣式
- ✅ input, select, textarea 樣式
- ✅ Focus/Hover 狀態
- ✅ 唯讀輸入框
- ✅ 日期輸入框特殊處理
- ✅ 表單網格佈局（.form, .field, .col-*）
- ✅ 響應式表單

**適用範圍：** 所有使用表單的頁面

---

## 🔧 使用方式

### 更新 `index.html`

在 `<head>` 中，**Flowbite 之後**加入：

```html
<link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet">

<!-- 共用樣式 -->
<link href="styles/theme-variables.css" rel="stylesheet">
<link href="styles/base.css" rel="stylesheet">
<link href="styles/buttons.css" rel="stylesheet">
<link href="styles/forms.css" rel="stylesheet">

<style>
  /* 僅保留 index.html 專屬的樣式 */
  /* 例如：導航標籤、工具卡片、開發日誌等 */
</style>
```

---

### 更新 `CGA/CGA2.html`

在 `<head>` 中，**datepicker-theme.css 之後**加入：

```html
<link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet">
<link href="../tools/datepicker-theme.css" rel="stylesheet">

<!-- 共用樣式 -->
<link href="../styles/theme-variables.css" rel="stylesheet">
<link href="../styles/base.css" rel="stylesheet">
<link href="../styles/buttons.css" rel="stylesheet">
<link href="../styles/forms.css" rel="stylesheet">

<style>
  /* 僅保留 CGA2.html 專屬的樣式 */
  /* 例如：步驟導航、內容區塊、表格、標籤等 */
</style>
```

---

## 📊 重構前後對比

### 重構前
```
index.html
├── <style> (800+ 行)
│   ├── CSS 變數 (147 行)
│   ├── 基礎樣式 (78 行)
│   ├── 按鈕樣式 (122 行)
│   ├── 表單樣式 (130 行)
│   └── 頁面專屬樣式 (323+ 行)

CGA2.html
├── <style> (1000+ 行)
│   ├── CSS 變數 (147 行) ← 重複
│   ├── 基礎樣式 (78 行) ← 重複
│   ├── 按鈕樣式 (122 行) ← 重複
│   ├── 表單樣式 (130 行) ← 重複
│   └── 頁面專屬樣式 (523+ 行)
```

### 重構後
```
styles/
├── theme-variables.css (147 行) ← 共用
├── base.css (78 行) ← 共用
├── buttons.css (122 行) ← 共用
└── forms.css (130 行) ← 共用

index.html
└── <style> (323 行) ← 僅頁面專屬

CGA2.html
└── <style> (523 行) ← 僅頁面專屬
```

**節省代碼：** 477 行 × 2 = 954 行重複代碼！

---

## ✅ 可提取的 index.html 專屬樣式

### 保留在 `<style>` 內（不共用）：
- 導航標籤（.tabs, .tab）
- 區塊樣式（.hero, .section）
- 網格系統（.grid.cols-4）
- 卡片樣式（.card）
- 開發日誌樣式（.changelog-entry）
- 工具列與過濾器（.toolbar, .filter-pills）

---

## ✅ 可提取的 CGA2.html 專屬樣式

### 保留在 `<style>` 內（不共用）：
- 步驟導航條（#stepbar, .step）
- 控制區域（.controls）
- 內容區塊（.sec）
- 標籤系統（.badge, .tag）
- 表格樣式（.table）
- CCI chips（.cci-wrap, .cci）
- 輔助工具（.helper, .tool）
- 頁面標頭（header）

---

## 🎯 優點

1. **減少重複** - 477 行共用樣式只需維護一份
2. **易於維護** - 修改按鈕樣式時，兩個頁面自動同步
3. **加載效率** - 瀏覽器可快取共用 CSS 檔案
4. **擴展性強** - 未來新頁面可直接引用
5. **結構清晰** - 樣式分類明確

---

## ⚠️ 注意事項

1. **引入順序**：
   ```
   Flowbite CSS
   → theme-variables.css (必須第一個)
   → base.css
   → buttons.css
   → forms.css
   → 頁面專屬樣式
   ```

2. **路徑調整**：
   - `index.html` 使用：`styles/xxx.css`
   - `CGA2.html` 使用：`../styles/xxx.css`

3. **變數依賴**：所有共用樣式檔案都依賴 `theme-variables.css` 中定義的變數

---

## 🚀 下一步行動

### 步驟 1：更新 index.html
1. 在 `<head>` 加入 4 個共用樣式連結
2. 從 `<style>` 移除已提取的內容
3. 測試頁面顯示是否正常

### 步驟 2：更新 CGA2.html
1. 在 `<head>` 加入 4 個共用樣式連結（注意路徑 `../styles/`）
2. 從 `<style>` 移除已提取的內容
3. 測試所有 15 個表單頁面

### 步驟 3：驗證
- ✅ 主題切換正常
- ✅ 按鈕樣式一致
- ✅ 表單控件正常
- ✅ 響應式佈局正常

---

## 📝 維護建議

1. **新增變數** - 統一加入 `theme-variables.css`
2. **修改按鈕** - 統一修改 `buttons.css`
3. **調整表單** - 統一修改 `forms.css`
4. **頁面專屬** - 保留在各自的 `<style>` 標籤內

---

**重構完成後，專案結構更清晰，維護更輕鬆！** 🎉
