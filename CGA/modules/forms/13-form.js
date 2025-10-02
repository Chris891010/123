// CGA 表單模組 13: CCI 共病指數
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm13 {
    constructor() {
      this.id = 13;
      this.title = "CCI 共病指數";
      this.CCI = [
        ['mi','心肌梗塞',1],['chf','充血性心衰竭',1],['pvd','周邊血管病',1],['cva','腦血管病',1],
        ['dem','失智症',1],['copd','慢性肺病',1],['ctd','結締組織病',1],['ulcer','消化性潰瘍',1],
        ['liver_m','輕度肝病',1],['dm','糖尿病（無併發）',1],['dm_c','糖尿病（有併發）',2],['ckd','中重度慢腎',2],
        ['hemi','偏癧',2],['tumor','腋瘤（5年內）',2],['leuk','白血病',2],['lymph','淋巴瘤',2],
        ['liver_s','重度肝病',3],['meta','轉移性腋瘤',6],['aids','AIDS',6]
      ];
    }

    initialize() {
      const wrap = this.$('#cciWrap');
      if (!wrap) return;
      wrap.innerHTML = '';
      this.CCI.forEach(([k, t, s]) => {
        const item = document.createElement('label');
        item.className = 'cci';
        item.innerHTML = `<span>${t}<br><small>（${s}分）</small></span><input type="checkbox" data-s="${s}" id="cci_${k}">`;
        wrap.appendChild(item);
      });
    }

    compute() {
      let t = 0;
      const checkboxes = this.$$('#cciWrap input[type=checkbox]');
      checkboxes.forEach(c => {
        if (c.checked) t += +c.dataset.s;
      });
      const cciTotal = this.$('#cciTotal');
      if (cciTotal) cciTotal.textContent = t;
    }

    $(sel) { return document.querySelector(sel); }
    $$(sel) { return document.querySelectorAll(sel); }

    generateHTML() {
      return `<div class="sec"><h3>Charlson 共病指數（CCI） <span class="badge">總分：<span id="cciTotal">0</span></span></h3>
  <div class="cci-wrap" id="cciWrap"></div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm13 = new CGAForm13();
  
  console.log('✅ CGAForm13 模組已載入');
})();
