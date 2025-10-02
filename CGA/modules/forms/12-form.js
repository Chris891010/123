// CGA 表單模組 12: B11 嚴重度指數
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm12 {
    constructor() {
      this.id = 12;
      this.title = "B11 嚴重度指數";
    }

    compute() {
      const a = this.num(this.$('#b11a'));
      const b = this.num(this.$('#b11b'));
      const e = this.$('#b11e');
      if (e) {
        e.value = (a && b) ? (b / a).toFixed(2) : '';
      }
    }

    $(sel) { return document.querySelector(sel); }
    num(el) { const v = parseFloat(el ? el.value.trim() : ''); return isNaN(v) ? null : v; }

    generateHTML() {
      return `<div class="sec"><h3>B11 嚴重度指數（簡化）</h3>
  <div class="form">
    <div class="field"><label>a：有 ≥1 分之系統數</label><input id="b11a" type="number" min="0"></div>
    <div class="field"><label>b：項目加總分</label><input id="b11b" type="number" min="0" step="0.1"></div>
    <div class="field"><label>c：≥3 分之項目數</label><input id="b11c" type="number" min="0"></div>
    <div class="field"><label>d：≥4 分之項目數</label><input id="b11d" type="number" min="0"></div>
    <div class="field"><label>e：嚴重度指數 e=b/a</label><input id="b11e" readonly></div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm12 = new CGAForm12();
  
  console.log('✅ CGAForm12 模組已載入');
})();
