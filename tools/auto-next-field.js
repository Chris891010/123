// ============================================================================
// 自動跳下一欄工具 (AutoNextField)
// ============================================================================

(function() {
  'use strict';

  class AutoNextField {
    constructor() {
      this.fieldSelector = 'select, input:not([readonly]):not([disabled])';
      this.enabledPages = new Set();
    }

    enable(container, options = {}) {
      const config = { delay: 100, autoExpand: true, ...options };
      const containerEl = typeof container === 'string' 
        ? document.querySelector(container) 
        : container;
      
      if (!containerEl) return;

      const fields = Array.from(containerEl.querySelectorAll(this.fieldSelector));

      fields.forEach((field, index) => {
        if (field.tagName === 'SELECT') {
          field.addEventListener('change', () => {
            if (!field.value) return;
            const nextField = fields[index + 1];
            if (!nextField) return;

            setTimeout(() => {
              nextField.focus();
              if (config.autoExpand && nextField.tagName === 'SELECT' && nextField.showPicker) {
                try { nextField.showPicker(); } catch (e) {}
              }
            }, config.delay);
          });
        }
      });
    }

    enableForForm(formIndex, options = {}) {
      const pageId = `page-${formIndex}`;
      if (this.enabledPages.has(pageId)) return;
      
      this.enabledPages.add(pageId);
      const pages = document.querySelectorAll('.page');
      if (pages[formIndex]) {
        this.enable(pages[formIndex], options);
      }
    }

    enableForAllPages(options = {}) {
      document.querySelectorAll('.page').forEach((page, index) => {
        this.enableForForm(index, options);
      });
    }
  }

  window.AutoNextField = new AutoNextField();
  console.log('✅ AutoNextField 工具已載入');

})();
