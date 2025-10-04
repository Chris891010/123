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
      return `
<!-- ========================================
     日常生活活動能力量表 (ADL - Barthel Index)
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 1.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  🏃 日常生活活動能力 (ADL - Barthel Index)
</h3>

<!-- 量表說明 -->
${MessageBoxBuilder.info(`<strong>📋 量表說明：</strong><br>
  • 評估基本日常生活自我照顧能力<br>
  • 總分範圍：0-100 分，分數越高表示功能越好<br>
  • <strong>分級標準：</strong>100 分=完全獨立 / 91-99=輕度依賴 / 61-90=中度依賴 / 21-60=重度依賴 / 0-20=完全依賴`)}

<!-- ADL 評估項目 -->
<div id="adlBody"></div>

<!-- 評估結果 -->
<div style="margin-top: 2rem; padding: 1.5rem; background: var(--surface); border-radius: 12px; border: 2px solid var(--line);">
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <span style="font-size: 1.125rem; font-weight: 700; color: var(--brand);">📊 評估結果</span>
    <span style="font-size: 1.5rem; font-weight: 700; color: var(--brand);">
      <span id="adlTotal">0</span> / 100 分
    </span>
  </div>
  <div id="adlFlags" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
</div>`;
    }
    
    // 初始化：建立動態卡片式表單
    initialize() {
      const container = this.$('#adlBody');
      if (!container) return;
      
      // 使用 ChoiceCardBuilder 建立卡片式佈局
      if (window.ChoiceCardBuilder) {
        const builder = new ChoiceCardBuilder({
          columns: 2,
          gap: '1.5rem',
          showScore: true
        });
        builder.build(this.BARTHEL, 'adl', container);
      } else {
        console.error('ChoiceCardBuilder 未載入');
      }
      
      console.log('✅ ADL 表單已初始化');
    }
    
    // 計算分數
    compute() {
      const totalEl = this.$('#adlTotal');
      if (!totalEl) return;
      
      let t = 0;
      this.BARTHEL.forEach(it => {
        const sel = this.$(`input[name="adl.${it.k}"]:checked`);
        const s = sel ? +sel.value : 0;
        t += s;
        const scoreEl = this.$(`#adl_${it.k}`);
        if (scoreEl) scoreEl.textContent = s + ' 分';
      });
      
      totalEl.textContent = t;
      
      const flags = this.$('#adlFlags');
      if (flags) {
        flags.innerHTML = '';
        
        // 功能分級
        let statusText = '';
        let statusColor = '';
        
        if (t === 100) {
          statusText = '✅ 完全獨立（無需協助）';
          statusColor = '#22c55e';
        } else if (t >= 91) {
          statusText = '🟢 輕度依賴（極少協助）';
          statusColor = '#84cc16';
        } else if (t >= 61) {
          statusText = '🟡 中度依賴（需部分協助）';
          statusColor = '#eab308';
        } else if (t >= 21) {
          statusText = '🟠 重度依賴（需大量協助）';
          statusColor = '#f97316';
        } else {
          statusText = '🔴 完全依賴（幾乎全面協助）';
          statusColor = '#ef4444';
        }
        
        const badge = document.createElement('span');
        badge.style.cssText = `display: inline-block; padding: 0.5rem 1rem; background: ${statusColor}; color: white; border-radius: 6px; font-weight: 600; font-size: 0.9375rem;`;
        badge.textContent = statusText;
        flags.appendChild(badge);
        
        // 額外提示
        if (t < 61) {
          const hint = document.createElement('span');
          hint.style.cssText = 'display: inline-block; padding: 0.5rem 1rem; background: var(--surface-secondary); color: var(--ink); border-radius: 6px; font-size: 0.875rem; border: 1px solid var(--line);';
          hint.textContent = '💡 建議安排照護計畫或復健評估';
          flags.appendChild(hint);
        }
      }
      
      return t;
    }
  }

  // 註冊到全域
  window.CGAForm03 = new CGAForm03();
  
  console.log('✅ CGAForm03 模組已載入');
})();
