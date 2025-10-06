// ============================================================================
// CGA 表單模組 13: Charlson 共病指數（CCI）
// ============================================================================

(function() {
  'use strict';

  class CGAForm13 {
    constructor() {
      this.id = 13;
      this.title = "Charlson 共病指數（CCI）";
      
      // Charlson Comorbidity Index 項目（依分數分組）
      this.CCI_ITEMS = {
        // 1 分項目
        score1: [
          { k: 'mi', t: '心肌梗塞（Myocardial Infarction）', s: 1 },
          { k: 'chf', t: '充血性心臟衰竭（Congestive Heart Failure）', s: 1 },
          { k: 'pvd', t: '周邊血管疾病（Peripheral Vascular Disease）', s: 1 },
          { k: 'cvd', t: '腦血管疾病（Cerebrovascular Disease）', s: 1 },
          { k: 'dementia', t: '失智症（Dementia）', s: 1 },
          { k: 'copd', t: '慢性肺部疾病（COPD）', s: 1 },
          { k: 'ctd', t: '結締組織疾病（Connective Tissue Disease）', s: 1 },
          { k: 'pud', t: '消化性潰瘍（Peptic Ulcer Disease）', s: 1 },
          { k: 'mildLiver', t: '輕度肝臟疾病（Mild Liver Disease）', s: 1 },
          { k: 'dmWithoutCC', t: '糖尿病，無併發症（DM without complications）', s: 1 }
        ],
        // 2 分項目
        score2: [
          { k: 'dmWithCC', t: '糖尿病，有併發症（DM with complications）', s: 2 },
          { k: 'hemiplegia', t: '偏癱或截癱（Hemiplegia or Paraplegia）', s: 2 },
          { k: 'renalDisease', t: '中度或重度腎臟疾病（Renal Disease）', s: 2 },
          { k: 'tumor', t: '任何腫瘤（過去 5 年內）', s: 2 },
          { k: 'leukemia', t: '白血病（Leukemia）', s: 2 },
          { k: 'lymphoma', t: '淋巴瘤（Lymphoma）', s: 2 }
        ],
        // 3 分項目
        score3: [
          { k: 'moderateLiver', t: '中度或重度肝臟疾病（Moderate/Severe Liver Disease）', s: 3 }
        ],
        // 6 分項目
        score6: [
          { k: 'metastatic', t: '轉移性實體腫瘤（Metastatic Solid Tumor）', s: 6 },
          { k: 'aids', t: 'AIDS', s: 6 }
        ]
      };
    }

    generateHTML() {
      return `
<!-- ========================================
     Charlson 共病指數（CCI）
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📋</span> 
    Charlson 共病指數（CCI）
    <span class="badge">總分：<span id="cciTotal" style="font-weight: 700; color: var(--brand);">0</span></span>
  </h3>
  
  ${MessageBoxBuilder.info(`<strong>📊 評分說明：</strong><br>
    請勾選患者目前或過去曾有的共病項目。<br>
    • <strong>0 分</strong>：無共病<br>
    • <strong>1-2 分</strong>：低共病負擔<br>
    • <strong>3-4 分</strong>：中度共病負擔<br>
    • <strong>≥5 分</strong>：高共病負擔`)}
  
  <div id="cciBody" style="margin-top: 1rem;"></div>
  <div id="cciResult" style="margin-top: 1rem;"></div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 13 (Charlson 共病指數)');
      
      const container = document.querySelector('#cciBody');
      // 如果已經建立過，不要重複建立（避免清空選擇）
      if (container && container.hasChildNodes()) {
        console.log('✅ CCI 表單已存在，跳過重複初始化');
        return;
      }
      
      this.buildCCI();
      
      console.log('✅ Charlson 共病指數已初始化');
    }

    /**
     * 建立 CCI 項目
     */
    buildCCI() {
      const container = document.querySelector('#cciBody');
      if (!container) return;

      container.innerHTML = '';
      
      // 1 分項目
      const section1 = this.createSection('1 分項目', this.CCI_ITEMS.score1);
      container.appendChild(section1);
      
      // 2 分項目
      const section2 = this.createSection('2 分項目', this.CCI_ITEMS.score2);
      container.appendChild(section2);
      
      // 3 分項目
      const section3 = this.createSection('3 分項目', this.CCI_ITEMS.score3);
      container.appendChild(section3);
      
      // 6 分項目
      const section6 = this.createSection('6 分項目', this.CCI_ITEMS.score6);
      container.appendChild(section6);
    }

    /**
     * 建立分數區塊
     */
    createSection(title, items) {
      const section = document.createElement('div');
      section.style.cssText = 'margin-bottom: 1.5rem; border: 2px solid var(--line); border-radius: 12px; padding: 1rem;';
      
      const header = document.createElement('h4');
      header.style.cssText = 'font-size: 1rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--line); color: var(--ink);';
      header.textContent = title;
      section.appendChild(header);
      
      const grid = document.createElement('div');
      grid.style.cssText = 'display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;';
      
      items.forEach(item => {
        const checkbox = this.createCheckbox(item);
        grid.appendChild(checkbox);
      });
      
      section.appendChild(grid);
      
      return section;
    }

    /**
     * 建立單個 checkbox
     */
    createCheckbox(item) {
      const label = document.createElement('label');
      label.style.cssText = 'display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border: 2px solid var(--line); border-radius: 8px; cursor: pointer; background: var(--card); transition: all 0.2s;';
      
      label.innerHTML = `
        <input type="checkbox" id="cci_${item.k}" data-score="${item.s}" 
               style="width: 18px; height: 18px; cursor: pointer; accent-color: var(--brand);">
        <span style="flex: 1; font-size: 0.95rem;">${item.t}</span>
        <span style="font-weight: 600; color: var(--muted); font-size: 0.875rem;">${item.s} 分</span>
      `;
      
      // 綁定 hover 效果
      label.addEventListener('mouseenter', () => {
        label.style.borderColor = 'var(--brand)';
        label.style.background = 'var(--surface)';
      });
      
      label.addEventListener('mouseleave', () => {
        label.style.borderColor = 'var(--line)';
        label.style.background = 'var(--card)';
      });
      
      // 綁定 change 事件
      const checkbox = label.querySelector('input[type="checkbox"]');
      checkbox.addEventListener('change', () => this.compute());
      
      return label;
    }

    /**
     * 計算總分並更新結果
     */
    compute() {
      const totalEl = document.querySelector('#cciTotal');
      const resultEl = document.querySelector('#cciResult');
      
      if (!totalEl || !resultEl) return;

      let total = 0;
      let checkedCount = 0;
      
      // 計算所有已勾選項目的分數
      const allCheckboxes = document.querySelectorAll('#cciBody input[type="checkbox"]');
      allCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
          checkedCount++;
          total += parseInt(checkbox.dataset.score);
        }
      });
      
      totalEl.textContent = total;
      
      // 顯示共病負擔評估
      if (checkedCount > 0 || total === 0) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        
        if (total === 0) {
          tag.style = 'background: #d1fae5; color: #065f46; font-weight: 600;';
          tag.textContent = '✅ 無共病（0 分）';
        } else if (total <= 2) {
          tag.style = 'background: #dbeafe; color: #1e40af; font-weight: 600;';
          tag.textContent = `📊 低共病負擔（${total} 分）- 共 ${checkedCount} 項疾病`;
        } else if (total <= 4) {
          tag.style = 'background: #fef3c7; color: #92400e; font-weight: 600;';
          tag.textContent = `⚠️ 中度共病負擔（${total} 分）- 共 ${checkedCount} 項疾病`;
        } else {
          tag.style = 'background: #fee2e2; color: #991b1b; font-weight: 600;';
          tag.textContent = `🚨 高共病負擔（${total} 分）- 共 ${checkedCount} 項疾病`;
        }
        
        resultEl.innerHTML = '';
        resultEl.appendChild(tag);
      } else {
        resultEl.innerHTML = '';
      }
    }
  }

  // 註冊到全域
  window.CGAForm13 = new CGAForm13();
  
  console.log('✅ CGAForm13 模組已載入');
})();
