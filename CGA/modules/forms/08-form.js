// CGA 表單模組 8: 營養（MNA-SF）
// 包含表單 HTML 和計算邏輯

(function() {
  'use strict';

  class CGAForm08 {
    constructor() {
      this.id = 8;
      this.title = "營養（MNA-SF）";
      
      // MNA-SF 營養評估項目（6 項，總分 0-14）
      this.MNA_ITEMS = [
        {
          k: 'A',
          t: '食慾/進食減少（過去 3 個月）',
          opts: [
            {s: 0, txt: '嚴重食慾減退'},
            {s: 1, txt: '中度食慾減退'},
            {s: 2, txt: '無食慾減退'}
          ]
        },
        {
          k: 'B',
          t: '體重減輕（最近 3 個月）',
          opts: [
            {s: 0, txt: '減輕 > 3 公斤'},
            {s: 1, txt: '不確定'},
            {s: 2, txt: '減輕 1-3 公斤'},
            {s: 3, txt: '無體重減輕'}
          ]
        },
        {
          k: 'C',
          t: '行動能力',
          opts: [
            {s: 0, txt: '臥床或坐輪椅'},
            {s: 1, txt: '可下床但無法外出'},
            {s: 2, txt: '可自由外出'}
          ]
        },
        {
          k: 'D',
          t: '近期是否有心理壓力或急性疾病？',
          opts: [
            {s: 0, txt: '是'},
            {s: 2, txt: '否'}
          ]
        },
        {
          k: 'E',
          t: '神經心理問題',
          opts: [
            {s: 0, txt: '重度失智或憂鬱'},
            {s: 1, txt: '輕度失智'},
            {s: 2, txt: '無心理問題'}
          ]
        },
        {
          k: 'F',
          t: 'BMI 身體質量指數 (由基本資料自動帶入)',
          opts: [
            {s: 0, txt: 'BMI < 19'},
            {s: 1, txt: 'BMI 19-21'},
            {s: 2, txt: 'BMI 21-23'},
            {s: 3, txt: 'BMI ≥ 23'}
          ],
          readonly: true  // 標記為自動填入項目
        }
      ];
    }

    generateHTML() {
      return `
<!-- ========================================
     MNA-SF 迷你營養評估（0-14 分）
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">🍽️</span> 
    MNA-SF 迷你營養評估
    <span class="badge">總分：<span id="mnaTotal" style="font-weight: 700; color: var(--brand);">0</span> / 14</span>
  </h3>
  
  ${MessageBoxBuilder.info(`<strong>📋 量表說明：</strong><br>
    • MNA-SF (Mini Nutritional Assessment - Short Form) 簡易營養評估<br>
    • 總分範圍：0-14 分<br>
    • <strong>12-14 分</strong>：營養狀況正常<br>
    • <strong>8-11 分</strong>：有營養不良風險<br>
    • <strong>0-7 分</strong>：營養不良<br>
    • BMI 項目會從基本資料自動計算並帶入`)}
  
  <!-- MNA-SF 評估項目 -->
  <div id="mnaBody"></div>
  
  <!-- 評估結果 -->
  <div style="margin-top: 2rem; padding: 1.5rem; background: var(--surface); border-radius: 12px; border: 2px solid var(--line);">
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
      <span style="font-size: 1.125rem; font-weight: 700; color: var(--brand);">📊 營養狀態</span>
      <span style="font-size: 1.5rem; font-weight: 700; color: var(--brand);">
        <span id="mnaTotal2">0</span> / 14 分
      </span>
    </div>
    <div id="mnaResult" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
  </div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 08 (MNA-SF)');
      
      // 使用 ChoiceCardBuilder 建立卡片式佈局
      const mnaBody = document.querySelector('#mnaBody');
      if (mnaBody && window.ChoiceCardBuilder) {
        // 如果已經建立過，不要重複建立
        if (!mnaBody.hasChildNodes()) {
          const builder = new ChoiceCardBuilder({
            columns: 1,
            gap: '1rem',
            showScore: true
          });
          builder.build(this.MNA_ITEMS, 'mna', mnaBody);
        }
        
        // 設定 BMI 項目（第 6 項）為唯讀
        setTimeout(() => {
          const bmiRadios = document.querySelectorAll('input[name="mna.F"]');
          bmiRadios.forEach(radio => {
            radio.disabled = true;
            radio.style.cursor = 'not-allowed';
            // 找到父層 label 也設為不可點擊樣式
            const label = radio.closest('label');
            if (label) {
              label.style.cursor = 'not-allowed';
              label.style.opacity = '0.7';
            }
          });
          
          // 找到 BMI 項目的卡片容器，改為虛線邊框
          if (bmiRadios.length > 0) {
            const bmiCard = bmiRadios[0].closest('div[style*="background"]');
            if (bmiCard) {
              bmiCard.style.border = '2px dashed var(--line)';
              bmiCard.style.opacity = '0.85';
            }
          }
          
          console.log('✅ BMI 項目已設為唯讀（自動填入）');
        }, 100);
      }
      
      console.log('✅ MNA-SF 已初始化');
    }

    /**
     * 計算 MNA-SF 分數
     */
    compute() {
      const mnaTotal = document.querySelector('#mnaTotal');
      const mnaTotal2 = document.querySelector('#mnaTotal2');
      const mnaResult = document.querySelector('#mnaResult');
      
      if (!mnaTotal || !mnaTotal2 || !mnaResult) return;
      
      let total = 0;
      let answered = 0;
      
      this.MNA_ITEMS.forEach(item => {
        const checked = document.querySelector(`input[name="mna.${item.k}"]:checked`);
        if (checked) {
          answered++;
          const score = parseInt(checked.value);
          total += score;
          
          // 更新個別項目的分數顯示
          const scoreEl = document.querySelector(`#mna_${item.k}`);
          if (scoreEl) {
            scoreEl.textContent = score;
          }
        }
      });
      
      mnaTotal.textContent = total;
      mnaTotal2.textContent = total;
      
      // 顯示營養狀態評估
      if (answered === 6) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        
        if (total >= 12) {
          tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
          tag.textContent = '✅ 營養狀況正常（12-14 分）';
        } else if (total >= 8) {
          tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
          tag.textContent = '⚠️ 有營養不良風險（8-11 分）- 建議營養介入';
        } else {
          tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
          tag.textContent = '🚨 營養不良（0-7 分）- 需立即營養治療';
        }
        
        mnaResult.innerHTML = '';
        mnaResult.appendChild(tag);
      } else {
        mnaResult.innerHTML = '';
      }
    }

    /**
     * 自動填充 BMI 項目（從基本資料頁自動帶入）
     */
    autoMNA_BMI() {
      const bmiEl = document.querySelector('#bmi');
      if (!bmiEl) return;
      
      const bmi = parseFloat(bmiEl.value || '');
      if (!bmi || isNaN(bmi)) return;
      
      // 根據 BMI 值選擇對應選項
      // BMI >= 23 → 3 分
      // BMI 21-23 → 2 分
      // BMI 19-21 → 1 分
      // BMI < 19  → 0 分
      let scoreIndex;
      if (bmi >= 23) {
        scoreIndex = 3; // BMI ≥ 23
      } else if (bmi >= 21) {
        scoreIndex = 2; // BMI 21-23
      } else if (bmi >= 19) {
        scoreIndex = 1; // BMI 19-21
      } else {
        scoreIndex = 0; // BMI < 19
      }
      
      // 選擇對應的選項
      const radios = Array.from(document.querySelectorAll('input[name="mna.F"]'));
      radios.forEach(r => r.checked = false);
      
      if (radios[scoreIndex]) {
        radios[scoreIndex].checked = true;
        this.compute();
        console.log(`✅ BMI ${bmi.toFixed(1)} 自動填入 MNA-SF（${scoreIndex} 分）`);
      }
    }
  }

  // 註冊到全域
  window.CGAForm08 = new CGAForm08();
  
  console.log('✅ CGAForm08 模組已載入');
})();
