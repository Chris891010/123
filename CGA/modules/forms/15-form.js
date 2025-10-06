// ============================================================================
// CGA 表單模組 15: 摘要與資料管理
// ============================================================================

(function() {
  'use strict';

  class CGAForm15 {
    constructor() {
      this.id = 15;
      this.title = "摘要與資料管理";
    }

    generateHTML() {
      return `
<!-- ========================================
     評估結果總覽
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📊</span> 
    評估結果總覽
  </h3>
  
  <!-- 風險標籤區域 -->
  <div id="riskTags" style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.75rem;"></div>
</div>

<!-- ========================================
     綜合評估摘要
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📝</span> 
    綜合評估摘要
  </h3>
  
  <div class="form" style="margin-top: 1rem;">
    <div class="field col-12">
      <label style="font-weight: 600;">評估摘要與建議</label>
      <textarea 
        id="summary" 
        rows="5" 
        placeholder="請輸入綜合評估摘要、臨床建議與後續照護計畫..."
        style="width: 100%; padding: 0.75rem; border: 2px solid var(--line); border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
    </div>
  </div>
</div>

<!-- ========================================
     資料管理
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">💾</span> 
    資料管理
  </h3>
  
  <!-- 操作按鈕 -->
  <div style="margin-top: 1rem; display: flex; flex-wrap: wrap; gap: 0.75rem;">
    <button id="recalc" class="btn primary" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>🔄</span> 重新計算
    </button>
    
    <button id="save" class="btn primary" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>💾</span> 儲存
    </button>
    
    <button id="load" class="btn" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>📂</span> 載入
    </button>
    
    <button id="exportJson" class="btn" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>📄</span> 匯出 JSON
    </button>
    
    <button id="exportCsv" class="btn" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>📊</span> 匯出 CSV
    </button>
    
    <button onclick="window.print()" class="btn" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>🖨️</span> 列印
    </button>
    
    <button id="clear" class="btn warn" style="display: flex; align-items: center; gap: 0.5rem;">
      <span>🗑️</span> 清除
    </button>
  </div>
</div>`;
    }
    
    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 15 (摘要與資料管理)');
      
      this.bindRecalcButton();
      this.bindSaveButton();
      this.bindLoadButton();
      this.bindClearButton();
      this.bindExportButtons();
      
      console.log('✅ 摘要與資料管理已初始化');
    }
    
    bindRecalcButton() {
      const recalc = document.getElementById('recalc');
      if (recalc && !recalc.onclick) {
        recalc.onclick = () => {
          if (window.CGAEventBus) {
            window.CGAEventBus.emit('summary:recalc');
          }
        };
      }
    }
    
    bindSaveButton() {
      const save = document.getElementById('save');
      if (save && !save.onclick) {
        save.onclick = () => {
          if (window.CGAEventBus) {
            window.CGAEventBus.emit('summary:save');
          }
        };
      }
    }
    
    bindLoadButton() {
      const load = document.getElementById('load');
      if (load && !load.onclick) {
        load.onclick = () => {
          if (window.CGAEventBus) {
            window.CGAEventBus.emit('summary:load');
          }
        };
      }
    }
    
    bindClearButton() {
      const clear = document.getElementById('clear');
      if (clear && !clear.onclick) {
        clear.onclick = () => {
          if (window.CGAEventBus) {
            window.CGAEventBus.emit('summary:clear');
          }
        };
      }
    }
    
    bindExportButtons() {
      const exportJson = document.getElementById('exportJson');
      if (exportJson && !exportJson.onclick) {
        exportJson.onclick = () => {
          if (window.CGAEventBus) {
            window.CGAEventBus.emit('summary:exportJson');
          }
        };
      }
      
      const exportCsv = document.getElementById('exportCsv');
      if (exportCsv && !exportCsv.onclick) {
        exportCsv.onclick = () => {
          if (window.CGAEventBus) {
            window.CGAEventBus.emit('summary:exportCsv');
          }
        };
      }
    }
  }

  // 註冊到全域
  window.CGAForm15 = new CGAForm15();
  
  console.log('✅ CGAForm15 模組已載入');
})();
