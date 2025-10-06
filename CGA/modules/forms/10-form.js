// ============================================================================
// CGA 表單模組 10: 跌倒評估（STRATIFY / Morse）
// ============================================================================

(function() {
  'use strict';

  class CGAForm10 {
    constructor() {
      this.id = 10;
      this.title = "跌倒評估（STRATIFY / Morse）";
      
      // STRATIFY 評估項目（St Thomas's Risk Assessment Tool in Falling Elderly Inpatients）
      this.STRATIFY = [
        { k: 'prevFall', t: '病人是否曾跌倒或住院期間有跌倒？', opts: [{s: 0, txt: '否'}, {s: 1, txt: '是'}] },
        { k: 'agitated', t: '是否十分激動焦躁？', opts: [{s: 0, txt: '否'}, {s: 1, txt: '是'}] },
        { k: 'vision', t: '視力不好影響日常功能？', opts: [{s: 0, txt: '否'}, {s: 1, txt: '是'}] },
        { k: 'needToilet', t: '是否需要常常上下廁所？', opts: [{s: 0, txt: '否'}, {s: 1, txt: '是'}] },
        { k: 'transferDiff', t: '在站立或移位方面有困難？', opts: [{s: 0, txt: '否'}, {s: 1, txt: '是'}] }
      ];

      // Morse Fall Scale 評估項目
      this.MORSE = [
        { k: 'history', t: '最近 3 個月是否曾跌倒？', opts: [{s: 0, txt: '否'}, {s: 25, txt: '是'}] },
        { k: 'diagnosis', t: '是否有需住院的內科病症？', opts: [{s: 0, txt: '否'}, {s: 15, txt: '是'}] },
        { k: 'aid', t: '行走時是否使用輔具/需人協助？', opts: [{s: 30, txt: '拐杖/架/家具'}, {s: 0, txt: '輪椅/床上'}, {s: 15, txt: '無/護士協助'}] },
        { k: 'iv', t: '是否有靜脈留置或注射點？', opts: [{s: 0, txt: '否'}, {s: 20, txt: '是'}] },
        { k: 'gait', t: '步態/轉移', opts: [{s: 20, txt: '障礙嚴重'}, {s: 10, txt: '有點虛弱'}, {s: 0, txt: '正常/臥床/不能行走'}] },
        { k: 'mental', t: '對自身能力是否了解？', opts: [{s: 15, txt: '不清楚'}, {s: 0, txt: '清楚'}] }
      ];
    }

    /**
     * 生成表單 HTML
     */
    generateHTML() {
      return `
<!-- ========================================
     STRATIFY 跌倒風險評估
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📋</span> 
    STRATIFY 跌倒風險評估
    <span class="badge">總分：<span id="stratifyTotal" style="font-weight: 700; color: var(--brand);">0</span> / 5</span>
  </h3>
  
  ${MessageBoxBuilder.info(`<strong>📊 評分標準：</strong><br>
    • <strong>0-1 分</strong>：低風險<br>
    • <strong>2 分</strong>：中度風險<br>
    • <strong>≥3 分</strong>：高風險`)}
  
  <div id="stratifyBody" style="margin-top: 1rem;"></div>
  <div id="stratifyResult" style="margin-top: 1rem;"></div>
</div>

<!-- ========================================
     Morse Fall Scale 跌倒風險量表
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">⚠️</span> 
    Morse Fall Scale 跌倒風險量表
    <span class="badge">總分：<span id="morseTotal" style="font-weight: 700; color: var(--brand);">0</span> / 125</span>
  </h3>
  
  ${MessageBoxBuilder.info(`<strong>📊 評分標準：</strong><br>
    • <strong>0-24 分</strong>：無跌倒風險<br>
    • <strong>25-50 分</strong>：低度風險<br>
    • <strong>≥51 分</strong>：高度風險`)}
  
  <div id="morseBody" style="margin-top: 1rem;"></div>
  <div id="morseResult" style="margin-top: 1rem;"></div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 10 (跌倒評估)');
      
      // 初始化 STRATIFY（使用 ChoiceCardBuilder，單欄，顯示分數）
      const stratifyBody = document.querySelector('#stratifyBody');
      if (stratifyBody && !stratifyBody.hasChildNodes()) {
        const builder = new ChoiceCardBuilder({columns: 1, gap: '1rem', showScore: true});
        builder.build(this.STRATIFY, 'stratify', stratifyBody);
      }
      
      // 初始化 Morse（使用 ChoiceCardBuilder，單欄，顯示分數）
      const morseBody = document.querySelector('#morseBody');
      if (morseBody && !morseBody.hasChildNodes()) {
        const builder = new ChoiceCardBuilder({columns: 1, gap: '1rem', showScore: true});
        builder.build(this.MORSE, 'morse', morseBody);
      }
      
      // 啟用自動跳到下一欄功能
      if (window.AutoNextField) {
        window.AutoNextField.enableForForm(9, {
          delay: 100,
          autoExpand: true
        });
        console.log('✅ Form 10 自動跳轉已啟用');
      }
      
      console.log('✅ 跌倒評估已初始化');
    }

    /**
     * 計算總分並更新結果
     */
    compute() {
      // ===== STRATIFY 計算 =====
      const stratifyTotal = document.querySelector('#stratifyTotal');
      const stratifyResult = document.querySelector('#stratifyResult');
      
      if (stratifyTotal && stratifyResult) {
        let total = 0;
        let answered = 0;
        
        this.STRATIFY.forEach(item => {
          const checked = document.querySelector(`input[name="stratify.${item.k}"]:checked`);
          if (checked) {
            answered++;
            const score = parseInt(checked.value);
            total += score;
            
            // 更新個別項目的分數顯示
            const scoreEl = document.querySelector(`#stratify_${item.k}`);
            if (scoreEl) {
              scoreEl.textContent = score;
            }
          }
        });
        
        stratifyTotal.textContent = total;
        
        // 顯示風險評估結果
        if (answered === this.STRATIFY.length) {
          const tag = document.createElement('span');
          tag.className = 'tag';
          
          if (total >= 3) {
            tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
            tag.textContent = '🚨 高風險（≥3 分）- 需積極介入預防跌倒';
          } else if (total === 2) {
            tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
            tag.textContent = '⚠️ 中度風險（2 分）- 需注意並採取預防措施';
          } else {
            tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
            tag.textContent = '✅ 低風險（0-1 分）';
          }
          
          stratifyResult.innerHTML = '';
          stratifyResult.appendChild(tag);
        } else {
          stratifyResult.innerHTML = '';
        }
      }
      
      // ===== Morse 計算 =====
      const morseTotal = document.querySelector('#morseTotal');
      const morseResult = document.querySelector('#morseResult');
      
      if (morseTotal && morseResult) {
        let total = 0;
        let answered = 0;
        
        this.MORSE.forEach(item => {
          const checked = document.querySelector(`input[name="morse.${item.k}"]:checked`);
          if (checked) {
            answered++;
            const score = parseInt(checked.value);
            total += score;
            
            // 更新個別項目的分數顯示
            const scoreEl = document.querySelector(`#morse_${item.k}`);
            if (scoreEl) {
              scoreEl.textContent = score;
            }
          }
        });
        
        morseTotal.textContent = total;
        
        // 顯示風險評估結果
        if (answered === this.MORSE.length) {
          const tag = document.createElement('span');
          tag.className = 'tag';
          
          if (total >= 51) {
            tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
            tag.textContent = '🚨 高度風險（≥51 分）- 需立即採取跌倒預防措施';
          } else if (total >= 25) {
            tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
            tag.textContent = '⚠️ 低度風險（25-50 分）- 需注意並定期評估';
          } else {
            tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
            tag.textContent = '✅ 無跌倒風險（0-24 分）';
          }
          
          morseResult.innerHTML = '';
          morseResult.appendChild(tag);
        } else {
          morseResult.innerHTML = '';
        }
      }
    }
  }

  // 註冊到全域
  window.CGAForm10 = new CGAForm10();
  
  console.log('✅ CGAForm10 模組已載入');
})();
