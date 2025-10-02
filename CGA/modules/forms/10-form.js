// CGA 表單模組 10: 跌倒評估（STRATIFY / Morse）
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm10 {
    constructor() {
      this.id = 10;
      this.title = "跌倒評估（STRATIFY / Morse）";
      this.STRA = [
        {k:'prevFall',t:'病人是否曾跌倒或住院期間有跌倒？',s:1},
        {k:'agitated',t:'是否十分激動焦躁？',s:1},
        {k:'visu',t:'視力不好影響日常功能？',s:1},
        {k:'needToilet',t:'是否需要常常上下廁所？',s:1},
        {k:'transferDiff',t:'在站立或移位方面有困難？',s:1},
      ];
      this.MORSE = [
        {k:'history',t:'最近3月是否曾跌倒？',opts:[{t:'是',s:25},{t:'否',s:0}]},
        {k:'dx',t:'是否有需住院的內科病症？',opts:[{t:'是',s:15},{t:'否',s:0}]},
        {k:'aid',t:'行走時是否使用輔具/需人協助？',opts:[{t:'拐杖/架/家具',s:30},{t:'輪椅/床上',s:0},{t:'無/護士協助',s:15}]},
        {k:'iv',t:'是否有靜脈留置或注射點？',opts:[{t:'是',s:20},{t:'否',s:0}]},
        {k:'gait',t:'步態/轉移',opts:[{t:'障礙嚴重',s:20},{t:'有點虛弱',s:10},{t:'正常/臥床/不能行走',s:0}]},
        {k:'mental',t:'對自身能力是否了解？',opts:[{t:'不清楚',s:15},{t:'清楚',s:0}]},
      ];
    }

    initialize() {
      // Build STRATIFY
      const straBox = this.$('#stratifyBox');
      if (straBox) {
        straBox.innerHTML = '';
        this.STRA.forEach((it, i) => {
          const row = document.createElement('div');
          row.className = 'sec';
          row.style.margin = '.4rem 0';
          row.innerHTML = `${i+1}）${it.t} <label class="tag"><input type="radio" name="stra.${it.k}" value="1"> 是(1)</label> <label class="tag"><input type="radio" name="stra.${it.k}" value="0"> 否(0)</label>`;
          straBox.appendChild(row);
        });
      }

      // Build Morse
      const morseBox = this.$('#morseBox');
      if (morseBox) {
        morseBox.innerHTML = '';
        this.MORSE.forEach((it, i) => {
          const row = document.createElement('div');
          row.className = 'sec';
          row.style.margin = '.4rem 0';
          row.innerHTML = `${i+1}）${it.t} ` + it.opts.map(o => `<label class="tag"><input type="radio" name="morse.${it.k}" value="${o.s}"> ${o.t}（${o.s}）</label>`).join(' ');
          morseBox.appendChild(row);
        });
      }
    }

    compute() {
      // STRATIFY
      let straT = 0;
      this.STRA.forEach(it => {
        const sel = this.$(`input[name="stra.${it.k}"]:checked`);
        straT += sel ? +sel.value : 0;
      });
      const straTotal = this.$('#stratifyTotal');
      if (straTotal) straTotal.textContent = straT;

      // Morse
      let morseT = 0;
      this.MORSE.forEach(it => {
        const sel = this.$(`input[name="morse.${it.k}"]:checked`);
        morseT += sel ? +sel.value : 0;
      });
      const morseTotal = this.$('#morseTotal');
      if (morseTotal) morseTotal.textContent = morseT;
    }

    $(sel) { return document.querySelector(sel); }

    generateHTML() {
      return `<div class="sec"><h3>STRATIFY（0–5） <span class="badge">總分：<span id="stratifyTotal">0</span></span></h3>
  <div id="stratifyBox"></div>
</div>
<div class="sec"><h3>Morse Fall Scale（0–125） <span class="badge">總分：<span id="morseTotal">0</span></span></h3>
  <div id="morseBox"></div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm10 = new CGAForm10();
  
  console.log('✅ CGAForm10 模組已載入');
})();
