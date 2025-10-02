// CGA 表單模組 8: 營養（MNA-SF）
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm08 {
    constructor() {
      this.id = 8;
      this.title = "營養（MNA-SF）";
      this.MNA_ITEMS = [
        {id:'A',title:'食慾/進食減少',opts:[{t:'無減少',s:2},{t:'中等減少',s:1},{t:'重度減少',s:0}]},
        {id:'B',title:'最近 3 個月體重減輕',opts:[{t:'>3kg',s:0},{t:'1–3kg',s:1},{t:'不確定',s:1},{t:'無',s:3}]},
        {id:'C',title:'行動能力',opts:[{t:'臥床/輪椅',s:0},{t:'能下床但不能外出',s:1},{t:'可外出',s:2}]},
        {id:'D',title:'近期心理壓力或急性病',opts:[{t:'是',s:0},{t:'否',s:2}]},
        {id:'E',title:'神經心理問題',opts:[{t:'重度失智/憂鬱',s:0},{t:'輕度失智',s:1},{t:'無',s:2}]},
        {id:'F',title:'BMI（>23=3；21–23=2；19–21=1；<19=0）',opts:[{t:'BMI>23',s:3},{t:'21–23',s:2},{t:'19–21',s:1},{t:'<19',s:0}]},
      ];
    }

    initialize() {
      const box = this.$('#mnaBox');
      if (!box) return;
      box.innerHTML = '';
      this.MNA_ITEMS.forEach(it => {
        const wrap = document.createElement('div');
        wrap.className = 'sec';
        wrap.style.margin = '.4rem 0';
        wrap.innerHTML = `<b>${it.title}</b><div>${it.opts.map(o => `<label class="tag"><input type="radio" name="mna.${it.id}" value="${o.s}" data-lbl="${o.t}"> ${o.t}（${o.s}）</label>`).join(' ')}</div>`;
        box.appendChild(wrap);
      });
    }

    compute() {
      let t = 0;
      this.MNA_ITEMS.forEach(it => {
        const sel = this.$(`input[name="mna.${it.id}"]:checked`);
        t += sel ? +sel.value : 0;
      });
      const mnaTotal = this.$('#mnaTotal');
      if (mnaTotal) mnaTotal.textContent = t;
    }

    autoMNA_BMI() {
      const bmiEl = this.$('#bmi');
      if (!bmiEl) return;
      const bmi = parseFloat(bmiEl.value || '');
      if (!bmi) return;
      const map = bmi > 23 ? 0 : bmi >= 21 ? 1 : bmi >= 19 ? 2 : 3;
      const radios = this.$$('input[name="mna.F"]');
      radios.forEach(r => r.checked = false);
      if (radios[map]) {
        radios[map].checked = true;
        this.compute();
      }
    }

    $(sel) { return document.querySelector(sel); }
    $$(sel) { return document.querySelectorAll(sel); }

    generateHTML() {
      return `<div class="sec"><h3>MNA-SF（0–14） <span class="badge">總分：<span id="mnaTotal">0</span>/14</span></h3>
  <div id="mnaBox"></div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm08 = new CGAForm08();
  
  console.log('✅ CGAForm08 模組已載入');
})();
