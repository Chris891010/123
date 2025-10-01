/**
 * 開發日誌資料模組 - 動態載入版本
 * 解決CORS問題並避免硬編碼
 */

// 開發日誌資料
window.CHANGELOG_DATA = {
  "metadata": {
    "title": "跌倒管理系統 - 開發日誌",
    "lastUpdated": "2025-10-01 - 15:30:00",
    "version": "1.3.0"
  },
  "releases": [
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
  }
};

// 提供API給主頁面使用
window.ChangelogAPI = {
  getData: () => window.CHANGELOG_DATA,
  getVersion: () => window.CHANGELOG_DATA.metadata.version,
  getLastUpdated: () => window.CHANGELOG_DATA.metadata.lastUpdated
};

console.log('開發日誌模組載入完成，版本:', window.ChangelogAPI.getVersion());