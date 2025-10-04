// ============================================================================
// 自動跳下一欄工具 (AutoNextField)
// ============================================================================
// 當使用者完成選擇下拉選單後，自動 focus 到下一個輸入欄位
// ============================================================================

(function() {
  'use strict';

  class AutoNextField {
    constructor() {
      this.fieldSelector = 'select, input:not([readonly]):not([disabled])';
    }

    /**
     * 為指定容器啟用自動跳轉
     * @param {string|HTMLElement} container - 容器選擇器或元素
     * @param {Object} options - 配置選項
     */
    enable(container, options = {}) {
      const config = {
        delay: 100,           // 跳轉延遲
        autoExpand: false,    // 是否自動展開下拉選單
        debug: false,         // 除錯模式
        ...options
      };

      // 取得容器
      const containerEl = this._getContainer(container);
      if (!containerEl) return;

      // 取得所有可見的表單欄位
      const fields = this._getVisibleFields(containerEl);
      
      if (config.debug) {
        console.log(`🎯 FormAutoFocus: 找到 ${fields.length} 個欄位`);
      }

      // 為每個 select 綁定自動跳轉
      fields.forEach((field, index) => {
        if (field.tagName === 'SELECT') {
          this._bindAutoJump(field, fields, index, config);
        }
      });

      if (config.debug) {
        console.log('✅ FormAutoFocus: 已啟用');
      }
    }

    /**
     * 為指定表單頁面啟用（CGA 專用）
     */
    enableForForm(formIndex, options = {}) {
      setTimeout(() => {
        const pages = document.querySelectorAll('.page');
        if (pages[formIndex]) {
          this.enable(pages[formIndex], options);
        } else {
          console.error(`❌ FormAutoFocus: 找不到頁面 ${formIndex}`);
        }
      }, options.initDelay || 300);
    }

    /**
     * 為所有頁面啟用
     */
    enableForAllPages(options = {}) {
      document.querySelectorAll('.page').forEach(page => {
        this.enable(page, options);
      });
    }

    // ==================== 私有方法 ====================

    /**
     * 取得容器元素
     */
    _getContainer(container) {
      if (typeof container === 'string') {
        return document.querySelector(container);
      }
      if (container instanceof HTMLElement) {
        return container;
      }
      console.error('❌ FormAutoFocus: 無效的容器');
      return null;
    }

    /**
     * 取得所有可見的表單欄位
     */
    _getVisibleFields(container) {
      return Array.from(container.querySelectorAll(this.fieldSelector))
        .filter(field => field.offsetParent !== null);
    }

    /**
     * 綁定自動跳轉邏輯
     */
    _bindAutoJump(field, fields, index, config) {
      field.addEventListener('change', () => {
        // 只有選了有效值才跳轉
        if (!field.value) return;

        const nextField = fields[index + 1];
        if (!nextField) return;

        if (config.debug) {
          console.log(`➡️ ${field.id || field.name} → ${nextField.id || nextField.name}`);
        }

        // 延遲後跳轉並展開
        setTimeout(() => {
          nextField.focus();
          if (config.autoExpand && nextField.tagName === 'SELECT') {
            this._expandSelect(nextField);
          }
        }, config.delay);
      });
    }

    /**
     * 展開下拉選單
     */
    _expandSelect(selectEl) {
      setTimeout(() => {
        // 優先使用原生 API
        if (selectEl.showPicker) {
          try {
            selectEl.showPicker();
          } catch (err) {
            this._fallbackExpand(selectEl);
          }
        } else {
          this._fallbackExpand(selectEl);
        }
      }, 50);
    }

    /**
     * 降級方案：模擬點擊展開
     */
    _fallbackExpand(selectEl) {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
      });
      selectEl.dispatchEvent(event);
    }
  }

  // 註冊到全域
  window.AutoNextField = new AutoNextField();

  console.log('✅ AutoNextField 工具已載入');

})();
