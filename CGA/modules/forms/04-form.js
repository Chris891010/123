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
      return `
<!-- ========================================
     工具性日常生活活動能力量表 (IADL - Lawton Scale)
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 1.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  🛒 工具性日常生活活動能力 (IADL - Lawton)
</h3>

<!-- 量表說明 -->
${MessageBoxBuilder.info(`<strong>📋 量表說明：</strong><br>
  • 評估較複雜的日常生活功能，如購物、理財、交通等<br>
  • 每項 1 分代表獨立完成，0 分代表需要協助<br>
  • 總分範圍：0-8 分（男性可為 0-5 分）<br>
  • 分數越低表示功能受限程度越高`)}

<!-- 性別選項（影響計分） -->
<div style="margin-bottom: 1.5rem;">
  <label style="display: flex; align-items: center; gap: 0.75rem; cursor: pointer; padding: 0.75rem; background: var(--surface); border-radius: 8px; border: 2px solid var(--line);">
    <input type="checkbox" id="iadlMaleSkip" style="width: auto; cursor: pointer; transform: scale(1.2);">
    <span style="font-weight: 600; color: var(--brand);">
      👨 男性評估模式（不計分：食物製備、家務、洗衣）
    </span>
  </label>
</div>

<!-- IADL 評估項目 -->
<div id="iadlGrid"></div>

<!-- 評估結果 -->
<div style="margin-top: 2rem; padding: 1.5rem; background: var(--surface); border-radius: 12px; border: 2px solid var(--line);">
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <span style="font-size: 1.125rem; font-weight: 700; color: var(--brand);">📊 評估結果</span>
    <span style="font-size: 1.5rem; font-weight: 700; color: var(--brand);">
      <span id="iadlTotal">0</span> / <span id="iadlMax">8</span> 分
    </span>
  </div>
  <div id="iadlFlags" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      const grid = this.$('#iadlGrid');
      if (!grid) return;
      
      // 如果已經建立過，不要重複建立（避免清空選擇）
      if (grid.hasChildNodes()) {
        console.log('✅ IADL 表單已存在，跳過重複初始化');
        return;
      }
      
      // 使用 ChoiceCardBuilder 建立卡片式佈局
      if (window.ChoiceCardBuilder) {
        const builder = new ChoiceCardBuilder({
          columns: 2,
          gap: '1.5rem',
          showScore: true
        });
        builder.build(this.IADL_ITEMS, 'iadl', grid);
      } else {
        console.error('ChoiceCardBuilder 未載入');
      }
      
      // 綁定男性跳過選項的事件
      const iadlMaleSkip = this.$('#iadlMaleSkip');
      if (iadlMaleSkip) {
        iadlMaleSkip.onchange = () => {
          this.compute();
        };
      }
      
      console.log('✅ IADL 表單已初始化');
    }

    /**
     * 計算 IADL 分數
     */
    compute() {
      const maleSkip = this.$('#iadlMaleSkip') && (this.$('#iadlMaleSkip').checked || this.nv(this.$('#sex')) === '男');
      let t = 0, den = 0;
      
      this.IADL_ITEMS.forEach(it => {
        const sel = this.$(`input[name="iadl.${it.k}"]:checked`);
        const s = sel ? +sel.value : 0;
        if (!(it.skip && maleSkip)) {
          t += s;
          den++;
        }
        const scoreEl = this.$(`#iadl_${it.k}`);
        if (scoreEl) scoreEl.textContent = s + ' 分';
      });
      
      const totalEl = this.$('#iadlTotal');
      const maxEl = this.$('#iadlMax');
      const flagsEl = this.$('#iadlFlags');
      
      if (totalEl) totalEl.textContent = t;
      if (maxEl) maxEl.textContent = den || 8;
      
      if (flagsEl) {
        flagsEl.innerHTML = '';
        
        // 功能分級
        if (den > 0) {
          const percentage = (t / den) * 100;
          let statusText = '';
          let statusColor = '';
          
          if (percentage >= 75) {
            statusText = '✅ 功能良好（獨立執行多數活動）';
            statusColor = '#10b981';
          } else if (percentage >= 50) {
            statusText = '⚠️ 輕度功能受限（部分活動需協助）';
            statusColor = '#f59e0b';
          } else if (percentage >= 25) {
            statusText = '⚠️ 中度功能受限（多數活動需協助）';
            statusColor = '#f97316';
          } else {
            statusText = '🚨 重度功能受限（大部分活動依賴他人）';
            statusColor = '#ef4444';
          }
          
          const badge = document.createElement('span');
          badge.style.cssText = `display: inline-block; padding: 0.5rem 1rem; background: ${statusColor}; color: white; border-radius: 6px; font-weight: 600; font-size: 0.9375rem;`;
          badge.textContent = statusText;
          flagsEl.appendChild(badge);
        }
      }
    }
    
    /**
     * 輔助方法
     */
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
