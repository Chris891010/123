// 漸層說明框建構器
// 僅負責提供格式樣式，內容由各表單自行填寫

(function() {
  'use strict';

  class InfoBoxBuilder {
    /**
     * 建立說明框
     * @param {string} content - 內容（HTML）
     * @param {string} type - 類型: 'info', 'warning', 'success', 'error'
     * @returns {string} HTML 字串
     */
    static create(content, type = 'info') {
      const styles = this.getStyles(type);
      
      return `<div style="background: ${styles.background}; border-left: 4px solid ${styles.borderColor}; padding: 1rem 1.25rem; border-radius: 8px; margin: 1.5rem 0; color: ${styles.textColor}; font-size: 0.875rem; line-height: 1.6;">
  ${content}
</div>`;
    }

    /**
     * 建立資訊框（藍色）
     */
    static info(content) {
      return this.create(content, 'info');
    }

    /**
     * 建立警告框（黃色）
     */
    static warning(content) {
      return this.create(content, 'warning');
    }

    /**
     * 建立成功框（綠色）
     */
    static success(content) {
      return this.create(content, 'success');
    }

    /**
     * 建立錯誤框（紅色）
     */
    static error(content) {
      return this.create(content, 'error');
    }

    /**
     * 根據類型取得樣式
     */
    static getStyles(type) {
      const styleMap = {
        info: {
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
          borderColor: '#3b82f6',
          textColor: '#1e40af'
        },
        warning: {
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          borderColor: '#f59e0b',
          textColor: '#92400e'
        },
        success: {
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          borderColor: '#10b981',
          textColor: '#065f46'
        },
        error: {
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderColor: '#ef4444',
          textColor: '#991b1b'
        }
      };

      return styleMap[type] || styleMap.info;
    }

    /**
     * 建立外部連結卡片
     * @param {string} url - 連結網址
     * @param {string} content - 卡片內容（HTML）
     * @returns {string} HTML 字串
     */
    static link(url, content) {
      return `<a href="${url}" 
         target="_blank" rel="noopener noreferrer"
         style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 8px; text-decoration: none; border: 2px solid var(--line); transition: 0.2s;"
         onmouseover="this.style.borderColor='var(--brand)'" 
         onmouseout="this.style.borderColor='var(--line)'">
        ${content}
      </a>`;
    }
  }

  // 註冊到全域
  window.InfoBoxBuilder = InfoBoxBuilder;
  
  console.log('✅ InfoBoxBuilder 模組已載入');
})();
