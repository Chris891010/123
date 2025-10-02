// CGA 表單模組 4: IADL（Lawton）
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm04 {
    constructor() {
      this.id = 4;
      this.title = "IADL（Lawton）";
      this.IADL_ITEMS=[
        {k:'shopping',t:'購物',opts:['可獨立','需陪同','無法']},
        {k:'housework',t:'家務',opts:['繁重家務','僅簡單','需協助','依賴'],skip:true},
        {k:'finances',t:'理財',opts:['獨立','部分','無法']},
        {k:'food',t:'食物製備',opts:['可計畫/煮','僅加熱','需他人煮'],skip:true},
        {k:'transport',t:'交通',opts:['可自理','需陪同/計程車','無法外出']},
        {k:'phone',t:'電話',opts:['查號/撥號','僅接聽/熟號','不會']},
        {k:'laundry',t:'洗衣',opts:['自行','部分','依賴'],skip:true},
        {k:'med',t:'用藥',opts:['可自行','需提示/協助','無法']},
      ];
    }

    generateHTML() {
      return `<div class="sec"><h3>IADL – Lawton <span class="badge">總分：<span id="iadlTotal">0</span>/<span id="iadlMax">8</span></span></h3>
  <div class="controls"><label class="hint"><input type="checkbox" id="iadlMaleSkip"> 男性：不計食物製備/家務/洗衣</label></div>
  <div class="form" id="iadlGrid"></div>
  <div id="iadlFlags"></div>
</div>`;
    }

    initialize() {
      const grid = this.$('#iadlGrid');
      if (!grid) return;
      grid.innerHTML = '';
      this.IADL_ITEMS.forEach((it, idx) => {
        const div = document.createElement('div');
        div.className = 'field col-6';
        div.innerHTML = `<label>${idx+1}）${it.t}</label><div>${it.opts.map((o,i)=>`<label class="tag"><input type="radio" name="iadl.${it.k}" value="${i===0?1:0}" data-skip="${it.skip?'1':'0'}"> ${o}${i===0?'（1）':'（0）'}</label>`).join(' ')}</div>`;
        grid.appendChild(div);
      });
    }

    compute() {
      const maleSkip = this.$('#iadlMaleSkip') && (this.$('#iadlMaleSkip').checked || this.nv(this.$('#sex'))==='男');
      let t = 0, den = 0;
      this.IADL_ITEMS.forEach(it => {
        const sel = this.$(`input[name="iadl.${it.k}"]:checked`);
        if (it.skip && maleSkip) return;
        t += sel ? +sel.value : 0;
        den++;
      });
      const totalEl = this.$('#iadlTotal');
      const maxEl = this.$('#iadlMax');
      const flagsEl = this.$('#iadlFlags');
      if (totalEl) totalEl.textContent = t;
      if (maxEl) maxEl.textContent = den || 8;
      if (flagsEl) {
        flagsEl.innerHTML = '';
        if (den && t <= Math.floor(den * 0.5)) this.tag(flagsEl, 'IADL 低分（功能受限）');
      }
    }

    $(sel) { return document.querySelector(sel); }
    nv(el) { return el ? el.value.trim() : ''; }
    tag(parent, txt) {
      if (!parent) return;
      const s = document.createElement('span');
      s.className = 'badge tag';
      s.textContent = txt;
      parent.appendChild(s);
    }
  }

  // 註冊到全域
  window.CGAForm04 = new CGAForm04();
  
  console.log('✅ CGAForm04 模組已載入');
})();
