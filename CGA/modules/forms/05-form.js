// CGA 表單模組 5: Mini-Cog / MMSE
// MMSE 因版權因素僅提供外部連結

(function() {
  'use strict';

  class CGAForm05 {
    constructor() {
      this.id = 5;
      this.title = "Mini-Cog / MMSE";
    }

    compute() {
      // Mini-Cog
      const r = this.num(this.$('#miniRecall')) || 0;
      const c = parseInt(this.nv(this.$('#miniCDT')) || '0', 10) || 0;
      const t = r + c;
      const miniTotal = this.$('#miniTotal');
      if (miniTotal) miniTotal.value = t;
    }

    $(sel) { return document.querySelector(sel); }
    $$(sel) { return document.querySelectorAll(sel); }
    nv(el) { return el ? el.value.trim() : ''; }
    num(el) { const v = parseFloat(this.nv(el)); return isNaN(v) ? null : v; }

    generateHTML() {
      return `
<!-- MMSE 版權說明區 -->
<div style="margin-bottom: 2rem;">
  <h4 style="color: var(--brand); font-size: 1rem; font-weight: 700; margin-bottom: 1rem;">
    📝 簡易心智狀態問卷（MMSE）
  </h4>
  
  <!-- 版權警告 -->
  ${InfoBoxBuilder.warning(`<div style="display: flex; align-items: start; gap: 0.75rem;">
      <span style="font-size: 1.5rem;">⚠️</span>
      <div>
        <strong style="font-size: 1rem; display: block; margin-bottom: 0.5rem;">版權聲明</strong>
        MMSE（Mini-Mental State Examination）為受版權保護之評估工具。<br>
        <strong>使用前須確認貴機構已取得版權授權。</strong><br>
        未經授權使用可能涉及侵權行為。
      </div>
    </div>`)}

  <!-- 外部資源連結 -->
  <div style="background: var(--surface); border: 2px solid var(--line); border-radius: 12px; padding: 1.5rem;">
    <h5 style="color: var(--brand); font-weight: 700; margin-bottom: 1rem; font-size: 0.9375rem;">
      📚 MMSE 評估工具參考資源
    </h5>
    
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <!-- 官方 PDF 連結 -->
      ${InfoBoxBuilder.link('https://cgatoolkit.ca/Uploads/ContentDocuments/MMSE.pdf', `<span style="font-size: 1.5rem;">🔗</span>
        <div style="flex: 1;">
          <div style="font-weight: 700; color: var(--brand); margin-bottom: 0.25rem;">
            MMSE 評估表單 (PDF)
          </div>
          <div style="font-size: 0.8125rem; color: var(--muted);">
            CGA Toolkit - 完整評估表單與計分說明
          </div>
        </div>
        <span style="color: var(--brand); font-size: 1.25rem;">→</span>`)}
      
      <!-- 說明文字 -->
      ${InfoBoxBuilder.info(`<strong>💡 使用提示：</strong><br>
        • 點擊上方連結可查看完整 MMSE 評估表單<br>
        • 總分範圍：0–30 分<br>
        • 評估面向：定向力、記憶力、注意力、語言、視覺空間能力<br>
        • 建議由受過訓練的專業人員執行評估`)}
    </div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm05 = new CGAForm05();
  
  console.log('✅ CGAForm05 模組已載入');
})();
