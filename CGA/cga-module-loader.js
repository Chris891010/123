// CGA 表單模組載入器 (cga-module-loader.js)
// 類似 tools-module.js 的動態載入機制，但使用 JS 模組而非 fetch HTML

(function() {
  'use strict';

  // 表單模組配置
  const FORM_MODULES = [
    { id: 1, title: "基本資料", module: "./modules/forms/01-form.js", className: "CGAForm01" },
    { id: 2, title: "個人史/家系圖/功能回顧", module: "./modules/forms/02-form.js", className: "CGAForm02" },
    { id: 3, title: "ADL（Barthel）", module: "./modules/forms/03-form.js", className: "CGAForm03" },
    { id: 4, title: "IADL（Lawton）", module: "./modules/forms/04-form.js", className: "CGAForm04" },
    { id: 5, title: "Mini-Cog / MMSE", module: "./modules/forms/05-form.js", className: "CGAForm05" },
    { id: 6, title: "MoCA", module: "./modules/forms/06-form.js", className: "CGAForm06" },
    { id: 7, title: "GDS-5 / CAM / Braden", module: "./modules/forms/07-form.js", className: "CGAForm07" },
    { id: 8, title: "營養（MNA-SF）", module: "./modules/forms/08-form.js", className: "CGAForm08" },
    { id: 9, title: "行動/肌少（CHS）", module: "./modules/forms/09-form.js", className: "CGAForm09" },
    { id: 10, title: "跌倒評估（STRATIFY / Morse）", module: "./modules/forms/10-form.js", className: "CGAForm10" },
    { id: 11, title: "B9 生活品質（EQ-5D-3L / VAS）", module: "./modules/forms/11-form.js", className: "CGAForm11" },
    { id: 12, title: "B11 嚴重度指數", module: "./modules/forms/12-form.js", className: "CGAForm12" },
    { id: 13, title: "CCI 共病指數", module: "./modules/forms/13-form.js", className: "CGAForm13" },
    { id: 14, title: "出院狀況", module: "./modules/forms/14-form.js", className: "CGAForm14" },
    { id: 15, title: "摘要 / 匯出", module: "./modules/forms/15-form.js", className: "CGAForm15" }
  ];

  // 表單模組載入器類別
  class CGAModuleLoader {
    constructor() {
      this.loadedModules = new Set(); // 記錄已載入的模組 ID
      this.loadingModules = new Map(); // 記錄正在載入的 Promise
    }

    // 載入表單模組 (返回 Promise)
    loadModule(formIndex) {
      const formId = formIndex + 1;
      
      // 檢查是否已載入
      if (this.loadedModules.has(formId)) {
        console.log(`✅ 模組 ${formId} 已載入，直接使用`);
        return Promise.resolve();
      }

      // 檢查是否正在載入
      if (this.loadingModules.has(formId)) {
        console.log(`⏳ 模組 ${formId} 正在載入中...`);
        return this.loadingModules.get(formId);
      }

      const formConfig = FORM_MODULES[formIndex];
      if (!formConfig) {
        return Promise.reject(new Error(`找不到表單 ${formId} 的配置`));
      }

      console.log(`📥 載入模組 ${formId}: ${formConfig.title}`);

      const loadPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = formConfig.module;
        
        script.onload = () => {
          // 檢查模組是否已註冊
          if (typeof window[formConfig.className] !== 'undefined') {
            this.loadedModules.add(formId);
            this.loadingModules.delete(formId);
            
            // 生成 HTML 並注入到對應容器
            const pages = document.querySelectorAll('.page');
            const pageElement = pages[formIndex];
            
            if (pageElement) {
              const moduleInstance = window[formConfig.className];
              pageElement.innerHTML = moduleInstance.generateHTML();
              console.log(`✅ 模組 ${formId} 載入完成並已注入`);
              
              // 觸發自定義事件
              const event = new CustomEvent('formModuleLoaded', {
                detail: { formId, formIndex, title: formConfig.title }
              });
              document.dispatchEvent(event);
              
              resolve();
            } else {
              reject(new Error(`找不到第 ${formId} 個 .page 容器`));
            }
          } else {
            reject(new Error(`模組 ${formConfig.className} 未正確註冊`));
          }
        };
        
        script.onerror = () => {
          this.loadingModules.delete(formId);
          reject(new Error(`載入 ${formConfig.module} 失敗`));
        };
        
        document.head.appendChild(script);
      });

      this.loadingModules.set(formId, loadPromise);
      return loadPromise;
    }

    // 檢查是否已載入
    isLoaded(formIndex) {
      return this.loadedModules.has(formIndex + 1);
    }

    // 取得已載入數量
    getLoadedCount() {
      return this.loadedModules.size;
    }
  }

  // 全域 API
  window.CGAModuleLoader = new CGAModuleLoader();

  console.log('📦 CGAModuleLoader 已就緒');
})();
