// CGA 表單模組 15: 摘要 / 匯出
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm15 {
    constructor() {
      this.id = 15;
      this.title = "摘要 / 匯出";
    }

    generateHTML() {
      return `<div class="sec"><h3>摘要與輸出</h3>
  <div id="riskTags"></div>
  <div class="form">
    <div class="field col-12"><label>文字摘要</label><textarea id="summary" rows="4" placeholder="系統自動產生；可補充。"></textarea></div>
  </div>
  <div class="controls">
    <button class="btn primary" id="recalc">計算/更新</button>
    <span class="hint" style="flex:1">可儲存於瀏覽器、匯出 JSON/CSV、列印。</span>
    <button class="btn primary" id="save">儲存</button>
    <button class="btn" id="load">載入</button>
    <button class="btn" id="exportJson">匯出 JSON</button>
    <button class="btn" id="exportCsv">匯出 CSV</button>
    <button class="btn" onclick="window.print()">列印</button>
    <button class="btn warn" id="clear">清除</button>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm15 = new CGAForm15();
  
  console.log('✅ CGAForm15 模組已載入');
})();
