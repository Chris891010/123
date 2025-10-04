// CGA 表單模組 7: GDS-5 / CAM / Braden
// 包含表單 HTML 和計算邏輯

(function() {
  'use strict';

  class CGAForm07 {
    constructor() {
      this.id = 7;
      this.title = "GDS-5 / CAM / Braden";
      
      // GDS-5 憂鬱量表定義（5 題，第 1 題反向計分）
      this.GDS5 = [
        {k: 'gds1', t: '過去一星期，基本上，您對現在的生活滿意嗎？', opts: ['是（0分）', '否（1分）'], rev: true},
        {k: 'gds2', t: '您是否常感到厭煩？', opts: ['否（0分）', '是（1分）']},
        {k: 'gds3', t: '您是否經常感到無助做什麼都沒有用？', opts: ['否（0分）', '是（1分）']},
        {k: 'gds4', t: '您是否比較樂於在家裡而較不喜歡外出？', opts: ['否（0分）', '是（1分）']},
        {k: 'gds5', t: '您是否感覺現在生活得很沒有價值？', opts: ['否（0分）', '是（1分）']}
      ];
      
      // Braden 壓傷量表詳細選項（6 個向度，每個 1-4 分）
      this.BRADEN_OPTIONS = [
        {s: 1, txt: '1 分 - 完全受限/非常潮濕/臥床/完全不能移動/攝取不足/問題'},
        {s: 2, txt: '2 分 - 非常受限/常常潮濕/限於椅子/非常受限/可能不足/潛在問題'},
        {s: 3, txt: '3 分 - 輕微受限/偶爾潮濕/偶爾走動/輕微受限/足夠/無明顯問題'},
        {s: 4, txt: '4 分 - 無受限/很少潮濕/經常走動/無受限/非常好/無問題'}
      ];
      
      this.BRADEN_ITEMS = [
        {k: 'sensory', t: '感覺知覺'},
        {k: 'moist', t: '濕度'},
        {k: 'activity', t: '活動'},
        {k: 'mobility', t: '移動'},
        {k: 'nutrition', t: '營養'},
        {k: 'friction', t: '摩擦/剪力'}
      ];
    }

    generateHTML() {
      return `
<!-- ========================================
     GDS-5 老年憂鬱量表（0-5 分）
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">😔</span> 
    GDS-5 老年憂鬱量表
    <span class="badge">總分：<span id="gds5Total" style="font-weight: 700; color: var(--brand);">0</span> / 5</span>
  </h3>
  
  ${MessageBoxBuilder.info('5 題簡易憂鬱篩檢，≥2 分可能有憂鬱傾向，建議進一步評估。')}
  
  <div id="gds5Body" style="margin-top: 1rem;"></div>
  <div id="gds5Result" style="margin-top: 1rem;"></div>
</div>

<!-- ========================================
     CAM 譫妄評估
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">🧠</span> 
    CAM 譫妄評估
  </h3>
  
  ${MessageBoxBuilder.warning('診斷標準：① 急性起病或波動 + ② 注意力不集中 + (③ 思維紊亂 或 ④ 意識改變)')}
  
  <div class="form" style="margin-top: 1rem;">
    ${DropdownBuilder.createMultiple([
      {id: 'cam1', label: '① 急性起病或波動', options: ['否', '是']},
      {id: 'cam2', label: '② 注意力不集中', options: ['否', '是']},
      {id: 'cam3', label: '③ 思維紊亂', options: ['否', '是']},
      {id: 'cam4', label: '④ 意識改變', options: ['否', '是']}
    ], 'col-6')}
  </div>
  
  <div id="camResult" style="margin-top: 1rem;"></div>
</div>

<!-- ========================================
     Braden 壓傷風險量表（6-24 分）
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">🛡️</span> 
    Braden 壓傷風險量表
    <span class="badge">總分：<span id="bradenTotal" style="font-weight: 700; color: var(--brand);">0</span> / 24</span>
  </h3>
  
  ${MessageBoxBuilder.info('評估 6 個向度，每個 1-4 分。總分 ≤12 高風險，13-16 中度風險，≥17 低風險。')}
  
  <div id="bradenBody" style="margin-top: 1rem;"></div>
  <div id="bradenResult" style="margin-top: 1rem;"></div>
</div>`;
    }

    initialize() {
      console.log('🔧 初始化 Form 07 (GDS-5 / CAM / Braden)');
      
      // 初始化 GDS-5（使用 ChoiceCardBuilder，單欄，不顯示分數）
      const gds5Body = document.querySelector('#gds5Body');
      if (gds5Body) {
        const builder = new ChoiceCardBuilder({columns: 1, gap: '1rem', showScore: false});
        builder.build(this.GDS5, 'gds', gds5Body);
      }
      
      // 初始化 Braden（使用 ChoiceCardBuilder，雙欄，顯示分數）
      const bradenBody = document.querySelector('#bradenBody');
      if (bradenBody) {
        const bradenItems = this.BRADEN_ITEMS.map(item => ({
          k: item.k,
          t: item.t,
          opts: this.BRADEN_OPTIONS
        }));
        
        const builder = new ChoiceCardBuilder({columns: 2, gap: '1.5rem', showScore: true});
        builder.build(bradenItems, 'braden', bradenBody);
      }
      
      console.log('✅ GDS-5 / CAM / Braden 已初始化');
    }

    compute() {
      // ===== GDS-5 計算 =====
      const gds5Total = document.querySelector('#gds5Total');
      const gds5Result = document.querySelector('#gds5Result');
      
      if (gds5Total && gds5Result) {
        let total = 0;
        let answered = 0;
        
        this.GDS5.forEach((item, index) => {
          const checked = document.querySelector(`input[name="gds.${item.k}"]:checked`);
          if (checked) {
            answered++;
            const value = parseInt(checked.value);
            // 第 1 題反向計分
            if (index === 0) {
              total += value === 0 ? 1 : 0;
            } else {
              total += value;
            }
          }
        });
        
        gds5Total.textContent = total;
        
        // 顯示結果
        if (answered === 5) {
          const tag = document.createElement('span');
          tag.className = 'tag';
          if (total >= 2) {
            tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
            tag.textContent = '⚠️ GDS-5 ≥2 分，可能有憂鬱傾向，建議進一步評估';
          } else {
            tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
            tag.textContent = '✅ GDS-5 <2 分，情緒狀態良好';
          }
          gds5Result.innerHTML = '';
          gds5Result.appendChild(tag);
        } else {
          gds5Result.innerHTML = '';
        }
      }
      
      // ===== CAM 計算 =====
      const camResult = document.querySelector('#camResult');
      
      if (camResult) {
        const cam1 = document.querySelector('#cam1')?.value || '';
        const cam2 = document.querySelector('#cam2')?.value || '';
        const cam3 = document.querySelector('#cam3')?.value || '';
        const cam4 = document.querySelector('#cam4')?.value || '';
        
        if (cam1 && cam2 && cam3 && cam4) {
          const isDelirium = (cam1 === '是') && (cam2 === '是') && (cam3 === '是' || cam4 === '是');
          
          const tag = document.createElement('span');
          tag.className = 'tag';
          if (isDelirium) {
            tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
            tag.textContent = '✅ CAM 陽性 - 符合譫妄診斷標準';
          } else {
            tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
            tag.textContent = '❌ CAM 陰性 - 未符合譫妄診斷標準';
          }
          camResult.innerHTML = '';
          camResult.appendChild(tag);
        } else {
          camResult.innerHTML = '';
        }
      }
      
      // ===== Braden 計算 =====
      const bradenTotal = document.querySelector('#bradenTotal');
      const bradenResult = document.querySelector('#bradenResult');
      
      if (bradenTotal && bradenResult) {
        let total = 0;
        let answered = 0;
        
        this.BRADEN_ITEMS.forEach(item => {
          const checked = document.querySelector(`input[name="braden.${item.k}"]:checked`);
          if (checked) {
            answered++;
            total += parseInt(checked.value);
          }
        });
        
        bradenTotal.textContent = total;
        
        // 顯示風險等級
        if (answered === 6) {
          const tag = document.createElement('span');
          tag.className = 'tag';
          if (total <= 12) {
            tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
            tag.textContent = '🚨 高風險（≤12 分）- 需密切監測與預防措施';
          } else if (total <= 16) {
            tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
            tag.textContent = '⚠️ 中度風險（13-16 分）- 建議加強預防措施';
          } else {
            tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
            tag.textContent = '✅ 低風險（≥17 分）- 維持常規照護';
          }
          bradenResult.innerHTML = '';
          bradenResult.appendChild(tag);
        } else {
          bradenResult.innerHTML = '';
        }
      }
    }
  }

  // 註冊到全域
  window.CGAForm07 = new CGAForm07();
  
  console.log('✅ CGAForm07 模組已載入');
})();
