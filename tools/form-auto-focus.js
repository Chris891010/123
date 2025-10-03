// ============================================================================
// 表單自動跳到下一欄工具
// ============================================================================
// 當使用者完成選擇下拉選單後，自動 focus 到下一個輸入欄位
// ============================================================================

(function() {
  'use strict';

  class FormAutoFocus {
    constructor() {
      this.initialized = false;
      this.fieldSelectors = 'select, input:not([readonly]):not([disabled])';
    }

    /**
     * 為指定容器內的表單欄位啟用自動跳轉功能
     * @param {string|HTMLElement} container - 容器選擇器或 DOM 元素
     * @param {Object} options - 配置選項
     * @param {number} options.delay - 跳轉延遲（毫秒），預設 100
     * @param {boolean} options.autoExpand - 是否自動展開下一個 select，預設 false
     * @param {boolean} options.debug - 是否顯示除錯訊息，預設 false
     */
    enable(container, options = {}) {
      const {
        delay = 100,
        autoExpand = false,
        debug = false
      } = options;

      // 取得容器元素
      let containerElement;
      if (typeof container === 'string') {
        containerElement = document.querySelector(container);
      } else if (container instanceof HTMLElement) {
        containerElement = container;
      } else {
        console.error('❌ FormAutoFocus: 無效的容器');
        return;
      }

      if (!containerElement) {
        console.error('❌ FormAutoFocus: 找不到容器元素');
        return;
      }

      // 取得所有可輸入欄位
      const formFields = Array.from(containerElement.querySelectorAll(this.fieldSelectors))
        .filter(field => field.offsetParent !== null); // 過濾隱藏元素

      if (debug) {
        console.log(`🎯 FormAutoFocus: 找到 ${formFields.length} 個可輸入欄位`);
      }

      // 為每個 select 元素添加事件監聽
      formFields.forEach((field, index) => {
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', (e) => {
            if (debug) {
              console.log(`✅ FormAutoFocus: 選擇了 ${field.id || field.name} = ${field.value}`);
            }

            // 如果選擇了有效值（非空），跳到下一欄
            if (field.value && field.value !== '') {
              const nextIndex = index + 1;
              if (nextIndex < formFields.length) {
                const nextField = formFields[nextIndex];
                
                if (debug) {
                  console.log(`➡️ FormAutoFocus: 跳到下一欄 ${nextField.id || nextField.name}`);
                }

                setTimeout(() => {
                  nextField.focus();
                  
                  // 如果啟用自動展開且下一個也是 select
                  if (autoExpand && nextField.tagName === 'SELECT') {
                    // 嘗試多種方式展開選單
                    setTimeout(() => {
                      // 方法1: 使用 showPicker (Chrome/Edge 支援)
                      if (typeof nextField.showPicker === 'function') {
                        try {
                          nextField.showPicker();
                        } catch (err) {
                          // 如果失敗，使用其他方法
                        }
                      } else {
                        // 方法2: 模擬點擊 (跨瀏覽器相容)
                        const clickEvent = new MouseEvent('mousedown', {
                          view: window,
                          bubbles: true,
                          cancelable: true
                        });
                        nextField.dispatchEvent(clickEvent);
                      }
                    }, 50);
                  }
                }, delay);
              }
            }
          });
        }
      });

      if (debug) {
        console.log('✅ FormAutoFocus: 自動跳轉已啟用');
      }
    }

    /**
     * 為所有 .page 容器啟用自動跳轉（針對 CGA 表單）
     * @param {Object} options - 配置選項
     */
    enableForAllPages(options = {}) {
      const pages = document.querySelectorAll('.page');
      pages.forEach((page, index) => {
        this.enable(page, {
          ...options,
          debug: options.debug || false
        });
      });
      
      if (options.debug) {
        console.log(`✅ FormAutoFocus: 已為 ${pages.length} 個頁面啟用自動跳轉`);
      }
    }

    /**
     * 為指定的 form 模組啟用自動跳轉
     * @param {number} formIndex - 表單索引（0-based）
     * @param {Object} options - 配置選項
     */
    enableForForm(formIndex, options = {}) {
      setTimeout(() => {
        const pages = document.querySelectorAll('.page');
        if (formIndex >= 0 && formIndex < pages.length) {
          this.enable(pages[formIndex], options);
        } else {
          console.error(`❌ FormAutoFocus: 表單索引 ${formIndex} 超出範圍`);
        }
      }, options.initDelay || 300);
    }
  }

  // 註冊到全域
  window.FormAutoFocus = new FormAutoFocus();

  console.log('✅ FormAutoFocus 工具已載入');

})();
