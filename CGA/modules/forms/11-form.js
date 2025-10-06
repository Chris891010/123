// ============================================================================
// CGA 表單模組 11: 生活品質評估（EQ-5D-3L / VAS）
// ============================================================================

(function() {
  'use strict';

  class CGAForm11 {
    constructor() {
      this.id = 11;
      this.title = "生活品質評估（EQ-5D-3L / VAS）";
      
      // EQ-5D-3L 五個向度（行動、自我照顧、日常活動、疼痛/不適、焦慮/沮喪）
      this.EQ5D = [
        {
          k: 'mobility',
          t: '行動能力',
          opts: [
            {s: 1, txt: '我可以四處走動，沒有任何困難'},
            {s: 2, txt: '我在四處走動上有些困難'},
            {s: 3, txt: '我必須臥床'}
          ]
        },
        {
          k: 'selfCare',
          t: '自我照顧',
          opts: [
            {s: 1, txt: '我在盥洗或穿衣上沒有任何困難'},
            {s: 2, txt: '我在盥洗或穿衣上有些困難'},
            {s: 3, txt: '我無法自己盥洗或穿衣'}
          ]
        },
        {
          k: 'usualActivities',
          t: '日常活動（例如：工作、讀書、做家事、家庭或休閒活動）',
          opts: [
            {s: 1, txt: '我在進行日常活動上沒有任何困難'},
            {s: 2, txt: '我在進行日常活動上有些困難'},
            {s: 3, txt: '我無法進行日常活動'}
          ]
        },
        {
          k: 'pain',
          t: '疼痛 / 不舒服',
          opts: [
            {s: 1, txt: '我沒有任何疼痛或不舒服'},
            {s: 2, txt: '我有中度疼痛或不舒服'},
            {s: 3, txt: '我有極度疼痛或不舒服'}
          ]
        },
        {
          k: 'anxiety',
          t: '焦慮 / 沮喪',
          opts: [
            {s: 1, txt: '我不會焦慮或沮喪'},
            {s: 2, txt: '我有中度焦慮或沮喪'},
            {s: 3, txt: '我有極度焦慮或沮喪'}
          ]
        }
      ];
    }

    generateHTML() {
      return `
<!-- ========================================
     EQ-5D-3L 生活品質量表
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">❤️</span> 
    EQ-5D-3L 生活品質量表
    <span class="badge">總分：<span id="eq5dTotal" style="font-weight: 700; color: var(--brand);">0</span> / 15</span>
  </h3>
  
  ${MessageBoxBuilder.info('評估五個向度的健康狀態：行動能力、自我照顧、日常活動、疼痛/不舒服、焦慮/沮喪。<br>每個向度分為 3 個等級（1=無困難、2=中度困難、3=極度困難）。<br><strong>總分範圍：5-15 分（分數越低表示健康狀態越好）</strong>')}
  
  <div id="eq5dBody" style="margin-top: 1rem;"></div>
  <div id="eq5dResult" style="margin-top: 1rem;"></div>
</div>

<!-- ========================================
     EQ-VAS 視覺類比量表
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📊</span> 
    EQ-VAS 視覺類比量表
    <span class="badge">分數：<span id="vasValue" style="font-weight: 700; color: var(--brand);">50</span> / 100</span>
  </h3>
  
  ${MessageBoxBuilder.info('請評估您今日的整體健康狀態。<br>0 = 您可以想像最差的健康狀態<br>100 = 您可以想像最好的健康狀態')}
  
  <div class="form" style="margin-top: 1rem;">
    <div class="field col-12">
      <label style="font-weight: 600; margin-bottom: 1rem; display: block;">
        今日健康狀態評分（請拖曳滑桿）
      </label>
      
      <!-- 滑桿容器 -->
      <div style="position: relative; padding: 0 1rem;">
        <input 
          id="eqVAS" 
          type="range" 
          min="0" 
          max="100" 
          step="1" 
          value="50"
          style="width: 100%; height: 8px; border-radius: 4px; background: linear-gradient(to right, #fee2e2 0%, #fef3c7 50%, #d1fae5 100%); outline: none; cursor: pointer;"
        >
        
        <!-- 刻度標記 -->
        <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; color: var(--muted); font-size: 0.875rem;">
          <span>0<br><small>最差</small></span>
          <span>25</span>
          <span>50<br><small>中等</small></span>
          <span>75</span>
          <span>100<br><small>最好</small></span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- VAS 結果顯示 -->
  <div id="vasResult" style="margin-top: 1rem;"></div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 11 (生活品質評估)');
      
      // 初始化 EQ-5D-3L（使用 ChoiceCardBuilder，單欄，顯示分數）
      const eq5dBody = document.querySelector('#eq5dBody');
      if (eq5dBody && !eq5dBody.hasChildNodes()) {
        const builder = new ChoiceCardBuilder({columns: 1, gap: '1rem', showScore: true});
        builder.build(this.EQ5D, 'eq5d', eq5dBody);
      }
      
      // 初始化 VAS 滑桿事件
      this.setupVAS();
      
      // 啟用自動跳到下一欄功能
      if (window.AutoNextField) {
        window.AutoNextField.enableForForm(10, {
          delay: 100,
          autoExpand: true
        });
        console.log('✅ Form 11 自動跳轉已啟用');
      }
      
      console.log('✅ 生活品質評估已初始化');
    }

    /**
     * 設定 VAS 滑桿
     */
    setupVAS() {
      const slider = document.querySelector('#eqVAS');
      const valueDisplay = document.querySelector('#vasValue');
      const resultDiv = document.querySelector('#vasResult');
      
      if (slider && valueDisplay) {
        slider.addEventListener('input', (e) => {
          const value = parseInt(e.target.value);
          valueDisplay.textContent = value;
          this.updateVASResult(value, resultDiv);
        });
        
        // 初始化顯示
        this.updateVASResult(50, resultDiv);
      }
    }

    /**
     * 更新 VAS 結果顯示
     */
    updateVASResult(value, resultDiv) {
      if (!resultDiv) return;
      
      const tag = document.createElement('span');
      tag.className = 'tag';
      
      if (value >= 75) {
        tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
        tag.textContent = '✅ 良好的健康狀態（≥75 分）';
      } else if (value >= 50) {
        tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
        tag.textContent = '📊 中等的健康狀態（50-74 分）';
      } else if (value >= 25) {
        tag.style = 'background: #fed7aa; color: #9a3412; font-weight: 600;';
        tag.textContent = '⚠️ 較差的健康狀態（25-49 分）';
      } else {
        tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
        tag.textContent = '🚨 極差的健康狀態（<25 分）';
      }
      
      resultDiv.innerHTML = '';
      resultDiv.appendChild(tag);
    }

    /**
     * 計算和顯示結果
     */
    compute() {
      // ===== EQ-5D-3L 計算 =====
      const eq5dTotal = document.querySelector('#eq5dTotal');
      const eq5dResult = document.querySelector('#eq5dResult');
      
      if (eq5dTotal && eq5dResult) {
        let total = 0;
        let answered = 0;
        
        this.EQ5D.forEach(item => {
          const checked = document.querySelector(`input[name="eq5d.${item.k}"]:checked`);
          if (checked) {
            answered++;
            const score = parseInt(checked.value);
            total += score;
            
            // 更新個別項目的分數顯示
            const scoreEl = document.querySelector(`#eq5d_${item.k}`);
            if (scoreEl) {
              scoreEl.textContent = score;
            }
          }
        });
        
        eq5dTotal.textContent = total;
        
        // 顯示健康狀態評估
        if (answered === this.EQ5D.length) {
          const tag = document.createElement('span');
          tag.className = 'tag';
          
          if (total === 5) {
            tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
            tag.textContent = '✅ 完全健康（5 分）- 無任何健康問題';
          } else if (total <= 8) {
            tag.style = 'background: #dbeafe; color: #1e40af; font-weight: 600;';
            tag.textContent = '📊 輕度健康問題（6-8 分）';
          } else if (total <= 11) {
            tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
            tag.textContent = '⚠️ 中度健康問題（9-11 分）';
          } else {
            tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
            tag.textContent = '🚨 嚴重健康問題（12-15 分）- 需特別關注';
          }
          
          eq5dResult.innerHTML = '';
          eq5dResult.appendChild(tag);
        } else {
          eq5dResult.innerHTML = '';
        }
      }
    }
  }

  // 註冊到全域
  window.CGAForm11 = new CGAForm11();
  
  console.log('✅ CGAForm11 模組已載入');
})();
