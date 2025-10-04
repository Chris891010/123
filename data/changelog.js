/**
 * 開發日誌資料模組 - 動態載入版本
 * 解決CORS問題並避免硬編碼
 */

// 開發日誌資料
window.CHANGELOG_DATA = {
  "metadata": {
    "title": "跌倒管理系統 - 開發日誌",
    "lastUpdated": "2025-10-01 - 15:30:00",
    "version": "1.4.0"
  },
  "releases": [
            {
      "version": "1.7.0",
      "date": "2025-10-04 15:00:00",
      "tags": ["重構", "UI"],
      "changes": [
        "🎨 ADL 重新設計UI/UX",
        "🎨 IADL重新設計UI/UX",
        "🎨 index及CGA統一使用模組化生成背景、標題、按鈕、分隔線等樣式",
        "🎨 統一使用模組化生成器 InfoBoxBuilder 和 CardRadioBuilder 來建立說明框和卡片式單選按鈕"

      ]
    },
        {
      "version": "1.6.0",
      "date": "2025-10-03 23:00:00",
      "tags": ["重構", "UI"],
      "changes": [
        "🎨 CGA 基本資料UI/UX優化",
        "✨ CGA 新增自動切換到下一選項功能增加效率",
        "✨ 添加更好看實用的日期選擇器",
        "🎨 CSS 模組化",
        "🧹 刪減程式碼冗餘並分工化",
      ]
    },
    {
      "version": "1.5.0",
      "date": "2025-10-02 - 22:30:00",
      "tags": ["新功能", "UI"],
      "changes": [
        "📄 CGA 檔案重寫模組化",
        "⚠️ 儲存/載入功能暫時標記為開發中"
      ]
    },
    {
      "version": "1.4.0",
      "date": "2025-10-02 - 18:00:00",
      "tags": ["新功能"],
      "changes": [
        "📄 新增CGA表格連結",
        "⚠️ 儲存/載入功能暫時標記為開發中"
      ]
    },
    {
      "version": "1.3.0",
      "date": "2025-10-01 - 20:00:00",
      "tags": ["新功能", "工具"],
      "changes": [
        "🏥 新增ES3C床邊環境安全巡檢表工具",
        "📋 環境安全檢核項目",
        "🛏️ 床位管理（1-10床位）",
        "📄 CSV匯出功能",
        "⚠️ 儲存/載入功能暫時標記為開發中"
      ]
    },
    {
      "version": "1.2.0",
      "date": "2025-10-01 - 17:15:00",
      "tags": ["重構", "主題"],
      "changes": [
        "🎨 統一全域CSS變數系統，簡化主題管理",
        "🌓 優化暗主題支援，移除冗餘樣式注入", 
        "♻️ 重構3E流程圖，使用CSS",
        "📦 建立可擴展的狀態顏色系統",
        "🧹 清理不必要的工具模組主題支援函數"
      ]
    },
    {
      "version": "1.1.0", 
      "date": "2025-10-01 - 15:45:00",
      "tags": ["新功能", "UI"],
      "changes": [
        "✨ 新增3E安全移位決策流程圖",
        "📱 優化響應式設計，支援手機和平板",
        "🎨 改進流程圖視覺設計"
      ]
    },
    {
      "version": "1.0.0",
      "date": "2025-10-01 - 14:00:00", 
      "tags": ["首版"],
      "changes": [
        "🚀 跌倒管理系統主控面板上線",
        "📊 整合AHRQ Roadmap工具庫",
        "🔧 建立模組化架構簡化程式碼",
        "📋 完成基礎評估表單",
        "🌙 實現明暗主題切換"
      ]
    }
  ],
  "roadmap": {
    "nearTerm": [
      "✅ 完成ES3C儲存/載入功能實作",
      "🔄 優化表單自動儲存機制", 
      "📱 改進行動裝置使用體驗",
      "🔍 加入工具庫全域搜尋功能"
    ],
    "longTerm": [
      "📤 多格式資料匯出與分享功能",
      "👥 多使用者協作與權限管理"
    ]
  },
  "todoList": {
    "inProgress": [
      "實作ES3C表單的儲存與載入功能",
      "優化SP3E手機版表格橫向滾動體驗",
      "整合CGA表單新分頁開啟功能",
      "建立LocalStorage資料持久化方案",
      "統一所有工具表單的UI與UX風格",
      "新增資料統計與視覺化圖表功能",
      "實作工具庫智能搜尋與篩選",
      "完善工具使用說明文件與範例",
      "完善CGA功能",
      "CGA 基本資料填寫病歷號碼自動帶入資料",
      "IADL 性別自動切換計分模式",
      "模組化以方便維護及修改"
    ],
  }
};

// 提供API給主頁面使用
window.ChangelogAPI = {
  getData: () => window.CHANGELOG_DATA,
  getVersion: () => window.CHANGELOG_DATA.metadata.version,
  getLastUpdated: () => window.CHANGELOG_DATA.metadata.lastUpdated,
  getTodoList: () => window.CHANGELOG_DATA.todoList,
  getRoadmap: () => window.CHANGELOG_DATA.roadmap
};

console.log('開發日誌模組載入完成，版本:', window.ChangelogAPI.getVersion());