// ============================================================================
// CGA 表單模組 9: 行動功能與肌少症（CHS 衰弱評估）
// ============================================================================
// 包含：TUG、步速、握力測量、CFS、CHS 衰弱五指標
// ============================================================================

(function() {
  'use strict';

  class CGAForm09 {
    constructor() {
      this.id = 9;
      this.title = "行動/肌少（CHS）";
      
      // CHS 衰弱五指標
      this.CHS_ITEMS = [
        {
          id: 'chsWeak',
          label: '握力低下（Weakness）',
          options: ['0 - 正常', '1 - 異常（低於標準值）']
        },
        {
          id: 'chsSlow',
          label: '步行緩慢（Slowness）',
          options: ['0 - 步速正常', '1 - 步速過慢（大於門檻）']
        },
        {
          id: 'chsWL',
          label: '體重減輕（Weight Loss）',
          options: ['0 - 無明顯減輕', '1 - 體重減輕 ≥ 5kg/年']
        },
        {
          id: 'chsExh',
          label: '易疲勞（Exhaustion）',
          options: ['0 - 無異常疲勞', '1 - 容易疲勞']
        },
        {
          id: 'chsLow',
          label: '低活動量（Low Activity）',
          options: ['0 - 活動量正常', '1 - 活動量低於標準']
        }
      ];
    }

    /**
     * 生成表單 HTML
     */
    generateHTML() {
      return `
<!-- ========================================
     行動功能評估
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">🚶</span> 
    行動功能評估
  </h3>
  
  ${MessageBoxBuilder.info(`<strong>📋 評估項目說明：</strong><br>
    • <strong>TUG（起立行走測試）</strong>：≥20 秒為行動障礙風險<br>
    • <strong>步速</strong>：&lt;0.8 m/s 為行動緩慢<br>
    • <strong>握力</strong>：男性 &lt;26kg、女性 &lt;18kg 為偏低<br>
    • <strong>CFS（臨床衰弱量表）</strong>：1-9 分，分數越高代表衰弱程度越嚴重`)}
  
  <div class="form">
    <!-- 行動測試 -->
    <div class="field col-3">
      <label>TUG 測試時間（秒）</label>
      <input id="tug" type="number" step="0.1" placeholder="起立行走測試">
    </div>
    <div class="field col-3">
      <label>4 公尺步行時間（秒）</label>
      <input id="gsSec" type="number" step="0.1" placeholder="4 公尺步行">
    </div>
    <div class="field col-3">
      <label>步速（m/s）</label>
      <input id="gaitSpeed" type="text" readonly placeholder="自動計算">
    </div>
    <div class="field col-3">
      <label>近一年跌倒次數</label>
      <input id="fallCnt" type="number" min="0" placeholder="跌倒次數">
    </div>
    
    <!-- 握力測試 -->
    ${DropdownBuilder.create({
      id: 'gripHand',
      label: '慣用手',
      options: ['右', '左'],
      required: false,
      colSpan: 'col-3'
    })}
    <div class="field col-2">
      <label>握力測試 1（kg）</label>
      <input id="grip1" type="number" step="0.1" placeholder="第一次">
    </div>
    <div class="field col-2">
      <label>握力測試 2（kg）</label>
      <input id="grip2" type="number" step="0.1" placeholder="第二次">
    </div>
    <div class="field col-2">
      <label>握力測試 3（kg）</label>
      <input id="grip3" type="number" step="0.1" placeholder="第三次">
    </div>
    <div class="field col-3">
      <label>握力最大值（kg）</label>
      <input id="gripMax" type="text" readonly placeholder="自動計算">
    </div>
    
    <!-- CFS -->
    ${DropdownBuilder.create({
      id: 'cfs',
      label: 'CFS 臨床衰弱量表（1-9）',
      options: ['1 - 非常健康', '2 - 健康', '3 - 健康狀況良好', '4 - 易受傷害', '5 - 輕度衰弱', '6 - 中度衰弱', '7 - 重度衰弱', '8 - 極重度衰弱', '9 - 末期'],
      required: false,
      colSpan: 'col-12'
    })}
  </div>
  
  <!-- 風險警示 -->
  <div id="mobFlags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem;"></div>
</div>

<!-- ========================================
     CHS 衰弱評估（五指標）
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">💪</span> 
    CHS 衰弱評估（五指標）
    <span class="badge">總分：<span id="chsTotal" style="font-weight: 700; color: var(--brand);">0</span> / 5</span>
  </h3>
  
  ${MessageBoxBuilder.info(`<strong>📋 CHS 評估標準：</strong><br>
    • <strong>0 分</strong>：健壯（Robust）- 無衰弱指標<br>
    • <strong>1-2 分</strong>：前衰弱（Pre-frail）- 需注意並預防<br>
    • <strong>3-5 分</strong>：衰弱（Frail）- 需積極介入治療`)}
  
  <div class="form">
    ${DropdownBuilder.createMultiple(this.CHS_ITEMS.map(item => ({
      id: item.id,
      label: item.label,
      options: item.options,
      required: false,
      colSpan: 'col-6'
    })))}
  </div>
  
  <!-- 評估結果 -->
  <div id="chsResult" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem;"></div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 09 (行動/肌少)');
      
      // 使用 AutoNextField 模組啟用自動跳轉
      if (window.AutoNextField) {
        window.AutoNextField.enableForForm(8, {
          delay: 100,
          autoExpand: true
        });
        console.log('✅ Form 09 自動跳轉已啟用');
      }
      
      console.log('✅ 表單已初始化');
    }

    /**
     * 計算與更新
     */
    compute() {
      this.calculateGaitSpeed();
      this.calculateGripMax();
      this.updateMobilityFlags();
      this.calculateCHS();
    }

    /**
     * 計算步速（4公尺/秒 = m/s）
     */
    calculateGaitSpeed() {
      const gsSec = document.querySelector('#gsSec');
      const gaitSpeed = document.querySelector('#gaitSpeed');
      
      if (!gsSec || !gaitSpeed) return;
      
      const seconds = parseFloat(gsSec.value || '');
      if (seconds && seconds > 0) {
        const speed = (4 / seconds).toFixed(2);
        gaitSpeed.value = `${speed} m/s`;
      } else {
        gaitSpeed.value = '';
      }
    }

    /**
     * 計算握力最大值（取三次測試最大值）
     */
    calculateGripMax() {
      const grip1 = parseFloat(document.querySelector('#grip1')?.value || '');
      const grip2 = parseFloat(document.querySelector('#grip2')?.value || '');
      const grip3 = parseFloat(document.querySelector('#grip3')?.value || '');
      const gripMax = document.querySelector('#gripMax');
      
      if (!gripMax) return;
      
      const values = [grip1, grip2, grip3].filter(v => !isNaN(v) && v > 0);
      
      if (values.length > 0) {
        const max = Math.max(...values).toFixed(1);
        gripMax.value = `${max} kg`;
      } else {
        gripMax.value = '';
      }
    }

    /**
     * 更新行動功能風險警示
     */
    updateMobilityFlags() {
      const flags = document.querySelector('#mobFlags');
      if (!flags) return;
      
      flags.innerHTML = '';
      
      // 檢查步速
      const gaitSpeed = document.querySelector('#gaitSpeed');
      if (gaitSpeed && gaitSpeed.value) {
        const speed = parseFloat(gaitSpeed.value);
        if (speed < 0.8) {
          this.addFlag(flags, '⚠️ 步速過慢（<0.8 m/s）', 'warning');
        }
      }
      
      // 檢查 TUG
      const tug = parseFloat(document.querySelector('#tug')?.value || '');
      if (tug >= 20) {
        this.addFlag(flags, '⚠️ TUG 異常（≥20 秒）', 'warning');
      }
      
      // 檢查握力
      const gripMax = document.querySelector('#gripMax');
      const sex = document.querySelector('#sex')?.value;
      
      if (gripMax && gripMax.value && sex) {
        const maxGrip = parseFloat(gripMax.value);
        if ((sex === '男' && maxGrip < 26) || (sex === '女' && maxGrip < 18)) {
          this.addFlag(flags, '⚠️ 握力偏低', 'warning');
        }
      }
      
      // 檢查跌倒次數
      const fallCnt = parseInt(document.querySelector('#fallCnt')?.value || '0');
      if (fallCnt >= 2) {
        this.addFlag(flags, '🚨 近一年跌倒 ≥2 次', 'danger');
      }
    }

    /**
     * 計算 CHS 總分
     */
    calculateCHS() {
      const chsTotal = document.querySelector('#chsTotal');
      const chsResult = document.querySelector('#chsResult');
      
      if (!chsTotal || !chsResult) return;
      
      let total = 0;
      let answered = 0;
      
      this.CHS_ITEMS.forEach(item => {
        const select = document.querySelector(`#${item.id}`);
        if (select && select.value) {
          answered++;
          // 提取選項值中的數字（0 或 1）
          const score = parseInt(select.value.match(/^\d+/)?.[0] || '0');
          total += score;
        }
      });
      
      chsTotal.textContent = total;
      
      // 清空結果容器
      chsResult.innerHTML = '';
      
      // 只在完成所有 5 項評估後才顯示結果
      if (answered === 5) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        
        if (total >= 3) {
          tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
          tag.textContent = '🚨 衰弱（Frail）- 需積極介入治療';
        } else if (total >= 1) {
          tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
          tag.textContent = '⚠️ 前衰弱（Pre-frail）- 需注意並預防';
        } else {
          tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
          tag.textContent = '✅ 健壯（Robust）- 狀況良好';
        }
        
        chsResult.appendChild(tag);
      }
    }

    /**
     * 新增警示標籤
     */
    addFlag(container, text, type = 'warning') {
      const tag = document.createElement('span');
      tag.className = 'tag';
      
      if (type === 'danger') {
        tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
      } else {
        tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
      }
      
      tag.textContent = text;
      container.appendChild(tag);
    }
  }

  // 註冊到全域
  window.CGAForm09 = new CGAForm09();
  
  console.log('✅ CGAForm09 模組已載入');
})();
