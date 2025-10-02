// CGA 表單模組 3: ADL（Barthel）
// 包含表單 HTML 和計算邏輯

(function() {
  'use strict';

  class CGAForm03 {
    constructor() {
      this.id = 3;
      this.title = "ADL（Barthel）";
      
      // Barthel ADL 量表定義
      this.BARTHEL = [
        {k:'feeding',t:'進食',opts:[{s:10,txt:'獨立（可用輔具）'},{s:5,txt:'部分協助'},{s:0,txt:'完全依賴/經管'}]},
        {k:'bathing',t:'洗澡',opts:[{s:5,txt:'獨立'},{s:0,txt:'需協助'}]},
        {k:'grooming',t:'修飾',opts:[{s:5,txt:'獨立'},{s:0,txt:'需協助'}]},
        {k:'dressing',t:'穿衣',opts:[{s:10,txt:'獨立'},{s:5,txt:'部分協助'},{s:0,txt:'完全依賴'}]},
        {k:'bowels',t:'腸道控制',opts:[{s:10,txt:'完全控制'},{s:5,txt:'偶發失禁'},{s:0,txt:'經常失禁'}]},
        {k:'bladder',t:'膀胱控制',opts:[{s:10,txt:'完全控制'},{s:5,txt:'偶發/間歇'},{s:0,txt:'持續失禁'}]},
        {k:'toilet',t:'如廁',opts:[{s:10,txt:'獨立'},{s:5,txt:'部分協助'},{s:0,txt:'完全依賴'}]},
        {k:'transfer',t:'床椅轉位',opts:[{s:15,txt:'獨立'},{s:10,txt:'輕度協助'},{s:5,txt:'大量協助'},{s:0,txt:'無法'}]},
        {k:'mobility',t:'平地行走',opts:[{s:15,txt:'獨立≥50m'},{s:10,txt:'少量協助/輪椅獨立'},{s:5,txt:'大量協助/短距離'},{s:0,txt:'無法'}]},
        {k:'stairs',t:'上下樓梯',opts:[{s:10,txt:'獨立'},{s:5,txt:'部分協助'},{s:0,txt:'無法'}]},
      ];
    }
    
    // 輔助函數
    $(selector) {
      return document.querySelector(selector);
    }
    
    tag(wrap, txt) {
      const t = document.createElement('span');
      t.className = 'tag';
      t.textContent = txt;
      wrap.appendChild(t);
    }

    generateHTML() {
      return `<div class="sec"><h3>ADL – Barthel <span class="badge">總分：<span id="adlTotal">0</span>/100</span></h3>
  <table class="table"><thead><tr><th>項目</th><th>選項</th><th style="width:90px">分數</th></tr></thead><tbody id="adlBody"></tbody></table>
  <div id="adlFlags"></div>
</div>`;
    }
    
    // 初始化：建立動態表格
    initialize() {
      const tb = this.$('#adlBody');
      if (!tb) return; // 表單未載入時跳過
      
      tb.innerHTML = '';
      this.BARTHEL.forEach((it, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${i+1}）${it.t}</td><td>${it.opts.map(o => 
          `<label class="tag"><input type="radio" name="adl.${it.k}" value="${o.s}"> ${o.txt}（${o.s}）</label>`
        ).join(' ')}</td><td id="adl_${it.k}" class="right">0</td>`;
        tb.appendChild(tr);
      });
      
      console.log('✅ ADL 表格已初始化');
    }
    
    // 計算分數
    compute() {
      const totalEl = this.$('#adlTotal');
      if (!totalEl) return; // 表單未載入時跳過
      
      let t = 0;
      this.BARTHEL.forEach(it => {
        const sel = this.$(`input[name="adl.${it.k}"]:checked`);
        const s = sel ? +sel.value : 0;
        t += s;
        const scoreEl = this.$(`#adl_${it.k}`);
        if (scoreEl) scoreEl.textContent = s;
      });
      
      totalEl.textContent = t;
      
      const flags = this.$('#adlFlags');
      if (flags) {
        flags.innerHTML = '';
        const mark = t === 100 ? '獨立' : 
                     t >= 91 ? '輕度依賴' : 
                     t >= 61 ? '中度依賴' : 
                     t >= 21 ? '重度依賴' : '全依賴';
        this.tag(flags, '等級：' + mark);
      }
      
      return t; // 返回總分供其他模組使用
    }
  }

  // 註冊到全域
  window.CGAForm03 = new CGAForm03();
  
  console.log('✅ CGAForm03 模組已載入');
})();
