/**
 * Flowbite Datepicker 初始化模組（無語言包版本）
 * 中文化透過 CGA2.html 中的 CSS 和 JavaScript 實現
 */
(function() {
  'use strict';

  window.DatepickerHelper = {
    /**
     * 中文化 Datepicker（替換月份文字）
     */
    localize: function() {
      // 立即執行，不延遲
      var datepickers = document.querySelectorAll('.datepicker');
      datepickers.forEach(function(dp) {
        // 1. 替換標題月份名稱
        var viewSwitch = dp.querySelector('.view-switch');
        if (viewSwitch) {
          var text = viewSwitch.textContent;
          
          // 檢查是否已經是中文，避免重複處理
          if (text.indexOf('月') === -1) {
            var monthMap = {
              'January': '一月', 'February': '二月', 'March': '三月',
              'April': '四月', 'May': '五月', 'June': '六月',
              'July': '七月', 'August': '八月', 'September': '九月',
              'October': '十月', 'November': '十一月', 'December': '十二月'
            };
            
            Object.keys(monthMap).forEach(function(en) {
              text = text.replace(en, monthMap[en]);
            });
            viewSwitch.textContent = text.replace(/(\d{4})\s+/, '$1年');
          }
        }

        // 2. 替換月份選擇器中的月份縮寫（Jan, Feb, Mar...）
        var monthCells = dp.querySelectorAll('.datepicker-cell.month');
        if (monthCells.length > 0) {
          var monthShortMap = {
            'Jan': '1月', 'Feb': '2月', 'Mar': '3月',
            'Apr': '4月', 'May': '5月', 'Jun': '6月',
            'Jul': '7月', 'Aug': '8月', 'Sep': '9月',
            'Oct': '10月', 'Nov': '11月', 'Dec': '12月'
          };
          
          monthCells.forEach(function(cell) {
            var text = cell.textContent.trim();
            // 只處理英文縮寫
            if (monthShortMap[text]) {
              cell.textContent = monthShortMap[text];
            }
          });
        }
      });
    },

    /**
     * 設置 MutationObserver 監聽 DOM 變化並立即中文化
     */
    setupObserver: function() {
      var self = this;
      var isLocalizing = false; // 防止無限循環的標記
      
      // 創建觀察器實例
      var observer = new MutationObserver(function(mutations) {
        // 如果正在中文化，跳過
        if (isLocalizing) return;
        
        var needLocalize = false;
        mutations.forEach(function(mutation) {
          // 檢查是否有 datepicker 相關的變化
          if (mutation.target.classList && 
              (mutation.target.classList.contains('datepicker') ||
               mutation.target.closest('.datepicker'))) {
            needLocalize = true;
          }
        });
        
        if (needLocalize) {
          isLocalizing = true;
          self.localize();
          // 延遲重置標記，確保 DOM 更新完成
          setTimeout(function() {
            isLocalizing = false;
          }, 50);
        }
      });

      // 配置觀察選項
      var config = {
        childList: true,
        subtree: true,
        characterData: true
      };

      // 開始觀察 body
      observer.observe(document.body, config);
      
      return observer;
    },

    init: function(elementIds, customOptions) {
      customOptions = customOptions || {};
      if (typeof Datepicker === 'undefined') {
        console.error('Flowbite Datepicker 未載入');
        return;
      }

      console.log('初始化 Datepicker');

      var self = this;
      var defaultOptions = {
        autohide: true,
        format: 'yyyy-mm-dd',
        todayBtn: true,
        clearBtn: true,
        todayBtnMode: 1
      };

      var options = Object.assign({}, defaultOptions, customOptions);
      var ids = Array.isArray(elementIds) ? elementIds : [elementIds];

      ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (!el) {
          console.warn('找不到元素: #' + id);
          return;
        }

        try {
          if (el.datepicker) {
            el.datepicker.destroy();
          }

          new Datepicker(el, options);
          
          // 綁定事件：顯示時立即中文化（使用 requestAnimationFrame 確保 DOM 更新完成）
          el.addEventListener('show', function() {
            requestAnimationFrame(function() {
              self.localize();
            });
          });
          
          // 綁定事件：切換月份/年份時立即中文化
          el.addEventListener('changeMonth', function() {
            requestAnimationFrame(function() {
              self.localize();
            });
          });
          
          el.addEventListener('changeYear', function() {
            requestAnimationFrame(function() {
              self.localize();
            });
          });
          
          console.log('Datepicker 已初始化: #' + id);
        } catch (error) {
          console.error('初始化失敗: #' + id, error);
        }
      });
    },

    reinit: function() {
      if (typeof Datepicker === 'undefined') return;
      var elements = document.querySelectorAll('[datepicker]');
      var ids = Array.from(elements).map(function(el) { return el.id; }).filter(function(id) { return id; });
      if (ids.length > 0) {
        console.log('重新初始化 ' + ids.length + ' 個 datepicker');
        this.init(ids);
      }
    },

    destroy: function(elementIds) {
      if (typeof Datepicker === 'undefined') return;
      var ids = Array.isArray(elementIds) ? elementIds : [elementIds];
      ids.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && el.datepicker) {
          try {
            el.datepicker.destroy();
            console.log('Datepicker 已銷毀: #' + id);
          } catch (e) {
            console.warn('銷毀失敗: #' + id, e);
          }
        }
      });
    },

    getInstance: function(elementId) {
      var el = document.getElementById(elementId);
      return el ? el.datepicker : null;
    },

    setDate: function(elementId, date) {
      var instance = this.getInstance(elementId);
      if (instance && typeof instance.setDate === 'function') {
        instance.setDate(date);
      }
    },

    getDate: function(elementId) {
      var instance = this.getInstance(elementId);
      return instance && typeof instance.getDate === 'function' ? instance.getDate() : null;
    }
  };

  // 啟動 MutationObserver 監聽 DOM 變化並自動中文化
  if (typeof MutationObserver !== 'undefined') {
    window.DatepickerHelper.setupObserver();
    console.log('DatepickerHelper 模組已載入（已啟動自動中文化監聽）');
  } else {
    console.log('DatepickerHelper 模組已載入（不支援 MutationObserver）');
  }

})();
