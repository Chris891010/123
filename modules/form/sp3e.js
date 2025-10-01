/**
 * 3E 安全移位臨床路徑工具
 */

(function() {
  'use strict';

  // 3E 工具
  class Tool3E {
    constructor() {
      this.isInitialized = false;
    }

    // 生成 3E 工具的 HTML 內容
    generateHTML() {
      return `
<div class="sp3e-container">
<div class="row backonly"><button class="btn" onclick="ToolsModuleAPI.backToTools()">← 返回工具庫</button></div>
    <h2>3E 安全移位臨床路徑（Clinical Pathway for Safe Patient Handling）</h2>
    <details open><summary><b>介紹與決策流程</b></summary>
      <ul class="small">
        <li>目的：將「安全移位」原則系統化，用於床↔椅、椅↔馬桶、椅↔椅、車↔椅等情境。</li>
        <li>原理：依病人是否可承重、是否配合、上肢力量等條件，決定人力與輔具。</li>
        <li>用法：可作為臨床決策提示、教育教材或流程標準化依據。下方提供小幫手與「完成檢核」。</li>
      </ul>

      <!-- 流程圖：步驟式決策樹 -->
      <div class="card">
        <h3>安全移位決策流程</h3>
      
      <!-- 開始 -->
      <div class="decision-tree">
        <div class="step-box start-box">
          <div class="step-number">START</div>
          <div class="step-title">病人需要移位</div>
          <div class="step-desc">評估病人移位需求</div>
        </div>
        
        <div class="arrow-down"></div>
        
        <!-- 第一個問題 -->
        <div class="question-box">
          <div class="question-text">病人可以<strong>承重</strong>嗎？</div>
          <div class="question-note">（評估下肢力量與穩定性）</div>
        </div>
        
        <div class="arrow-down"></div>
        
        <!-- 三個主要分支 -->
        <div class="branches-container">
          
          <!-- 分支1：完全承重 -->
          <div class="branch-path green">
            <div class="path-label">完全承重</div>
            <div class="arrow-down"></div>
            <div class="result-box success">
              <div class="result-title">站立監督</div>
              <div class="result-desc">僅需1人在旁守候<br>確保安全即可</div>
              <div class="result-badge">安全</div>
            </div>
          </div>
          
          <!-- 分支2：部分承重 -->
          <div class="branch-path yellow">
            <div class="path-label">部分承重</div>
            <div class="arrow-down"></div>
            
            <div class="sub-question">
              <div class="question-text mini">病人可以<strong>配合</strong>嗎？</div>
            </div>
            
            <div class="sub-branches">
              <div class="sub-path left">
                <div class="sub-label">可配合</div>
                <div class="arrow-down"></div>
                <div class="result-box info">
                  <div class="result-title">輔助行走</div>
                  <div class="result-desc">站-轉移位 + 步態帶<br>或動力站立輔具</div>
                  <div class="result-badge">需1人協助</div>
                </div>
              </div>
              
              <div class="sub-path right">
                <div class="sub-label">不配合</div>
                <div class="arrow-down"></div>
                <div class="result-box warning">
                  <div class="result-title">坐式移位</div>
                  <div class="result-desc">
                    上肢有力？<br>
                    否:需扶手 是:可訓練
                  </div>
                  <div class="result-badge">需評估人力</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 分支3：無法承重 -->
          <div class="branch-path red">
            <div class="path-label">無法承重</div>
            <div class="arrow-down"></div>
            
            <div class="result-box danger">
              <div class="result-title">機械式移位</div>
              <div class="result-desc">全身吊帶<br>+ 2人協助操作</div>
              <div class="result-badge">高風險</div>
            </div>
          </div>
          
        </div>
      </div>
      
      <style>
        .decision-tree {
          font-family: 'Noto Sans TC', sans-serif;
          max-width: 950px;
          margin: 0 auto;
          padding: 20px;
          background: linear-gradient(135deg, var(--surface) 0%, var(--surface-secondary) 100%);
          border-radius: 16px;
          color: var(--ink);
        }
        
        .step-box, .question-box, .result-box {
          background: var(--card-bg);
          border-radius: 10px;
          padding: 12px 16px;
          margin: 8px auto;
          box-shadow: 0 3px 10px var(--shadow);
          text-align: center;
          max-width: 280px;
          color: var(--ink);
          border: 1px solid var(--line);
        }
        
        .start-box {
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          color: white;
          border: 3px solid var(--info-text);
        }
        
        .step-number {
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 8px;
          display: inline-block;
        }
        
        .step-title {
          font-size: 17px;
          font-weight: bold;
          margin-bottom: 4px;
        }
        
        .step-desc {
          font-size: 14px;
          opacity: 0.9;
        }
        
        .question-box {
          background: var(--warning-bg);
          border: 2px solid var(--warning);
          max-width: 300px;
        }
        
        .question-text {
          font-size: 16px;
          font-weight: bold;
          color: var(--warning-text);
        }
        
        .question-note {
          font-size: 13px;
          color: var(--muted);
          margin-top: 4px;
        }
        
        .connector {
          text-align: center;
          font-size: 24px;
          margin: 8px 0;
        }
        
        .arrow-down {
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 15px solid var(--content);
          margin: 15px auto;
        }
        
        .branches-container {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .branch-path {
          text-align: center;
        }
        
        .branch-path.green,
        .branch-path.red {
          flex: 0.8;
          min-width: 200px;
          max-width: 240px;
        }
        
        .branch-path.yellow {
          flex: 1.4;
          min-width: 320px;
          max-width: 400px;
        }
        
        .path-label {
          font-weight: bold;
          padding: 6px 10px;
          border-radius: 18px;
          margin-bottom: 10px;
          font-size: 14px;
        }
        
        .green .path-label {
          background: var(--success-bg);
          color: var(--success-text);
          border: 2px solid var(--success);
        }
        
        .yellow .path-label {
          background: var(--warning-bg);
          color: var(--warning-text);
          border: 2px solid var(--warning);
        }
        
        .red .path-label {
          background: var(--danger-bg);
          color: var(--danger-text);
          border: 2px solid var(--danger);
        }
        

        
        .result-box.success {
          background: var(--success-bg);
          border: 2px solid var(--success);
          color: var(--success-text);
        }
        
        .result-box.info {
          background: var(--info-bg);
          border: 2px solid var(--info);
          color: var(--info-text);
        }
        
        .result-box.warning {
          background: var(--warning-bg);
          border: 2px solid var(--warning);
          color: var(--warning-text);
        }
        
        .result-box.danger {
          background: var(--danger-bg);
          border: 2px solid var(--danger);
          color: var(--danger-text);
        }
        
        .result-title {
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 6px;
        }
        
        .result-desc {
          font-size: 13px;
          line-height: 1.3;
          margin-bottom: 6px;
        }
        
        .result-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: bold;
          background: var(--shadow);
          border: 1px solid var(--line);
          color: var(--muted);
        }
        
        .sub-question {
          background: var(--warning-bg);
          border: 2px solid var(--warning);
          border-radius: 8px;
          padding: 8px;
          margin: 8px auto;
          max-width: 220px;
        }
        
        .question-text.mini {
          font-size: 14px;
          font-weight: bold;
        }
        
        .sub-branches {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }
        
        .sub-path {
          flex: 1;
        }
        
        .sub-label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .sub-path .result-box {
          font-size: 13px;
          padding: 8px;
          margin: 4px 0;
        }
        
        .sub-path .result-title {
          font-size: 14px;
        }
        
        .sub-path .arrow-down {
          border-top: 8px solid var(--content);
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          margin: 8px auto;
        }
        
        .sub-path .result-desc {
          font-size: 12px;
        }
        
        .mini-question {
          background: var(--warning-light);
          border-radius: 6px;
          padding: 8px;
          margin: 5px 0;
        }
        
        .question-text.tiny {
          font-size: 12px;
          font-weight: bold;
        }
        
        .tiny-branches {
          display: flex;
          gap: 6px;
          margin-top: 6px;
        }
        
        .tiny-result {
          flex: 1;
        }
        
        .tiny-label {
          font-size: 11px;
          font-weight: bold;
          display: block;
          margin-bottom: 3px;
        }
        
        .tiny-box {
          font-size: 10px;
          padding: 5px;
          border-radius: 4px;
          border: 1px solid;
        }
        
        .tiny-box.warning {
          background: var(--warning-bg);
          border-color: var(--warning);
        }
        
        .tiny-box.info {
          background: var(--info-bg);
          border-color: var(--info);
        }
        
        @media (max-width: 768px) {
          .branches-container {
            flex-direction: column;
            align-items: center;
          }
          
          .branch-path {
            min-width: 240px;
            max-width: 100%;
          }
          
          .sub-branches {
            flex-direction: column;
          }
        }

        /* 狀態訊息樣式 */
        .status-success {
          color: var(--success-text);
        }

        .status-warning {
          color: var(--warning-text);
        }

        .status-danger {
          color: var(--danger-text);
        }
      </style>
      </div>
    </details>

    <div class="toolbar">
      <button class="btn" onclick="Tool3E.save()">儲存</button>
      <button class="btn" onclick="Tool3E.load()">載入</button>
      <button class="btn" onclick="Tool3E.clear()">清空</button>
      <button class="btn primary" onclick="window.print()">列印</button>
    </div>

    <form data-form-id="sp3e" id="sp3eForm">
      <fieldset class="q decision-helper">
        <h3 class="fieldset-title">決策小幫手</h3>
        <div class="decision-grid">
          <label class="decision-item">可承重
            <select name="E_weight" data-label="可承重" onchange="window.Tool3E && Tool3E.updateDecision()">
              <option value=""></option><option>完全</option><option>部分</option><option>無法</option>
            </select>
          </label>
          <label class="decision-item">可配合
            <select name="E_coop" data-label="可配合" onchange="window.Tool3E && Tool3E.updateDecision()">
              <option value=""></option><option>是</option><option>否</option>
            </select>
          </label>
          <label class="decision-item">上肢有力
            <select name="E_ue" data-label="上肢有力" onchange="window.Tool3E && Tool3E.updateDecision()">
              <option value=""></option><option>是</option><option>否</option>
            </select>
          </label>
        </div>
        <div class="suggestion-area" id="sp3eSuggest">請選擇病人條件以獲得移位建議</div>
        
        <style>
          /* 統一的fieldset樣式 */
          .sp3e-container .q {
            border: 2px solid var(--line);
            border-radius: 8px;
            padding: 20px;
            margin: 8px 0;
            background-color: var(--card-bg);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            color: var(--ink);
          }
          
          .sp3e-container .fieldset-title {
            margin: 0 0 16px 0;
            font-weight: bold;
            font-size: 18px;
            color: var(--ink);
          }
          
          .decision-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 16px;
          }
          
          .sp3e-container .decision-item {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            color: var(--ink);
          }
          
          .sp3e-container .decision-item select,
          .sp3e-container .decision-item input {
            margin-top: 6px;
            padding: 8px 10px;
            border: 1px solid var(--line);
            border-radius: 6px;
            font-size: 14px;
            background-color: var(--card-bg);
            color: var(--ink);
            transition: border-color 0.2s;
          }
          
          .sp3e-container .decision-item select:focus,
          .sp3e-container .decision-item input:focus {
            outline: none;
            border-color: var(--brand);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .sp3e-container .suggestion-area {
            background-color: var(--brand-50);
            border: 1px solid var(--line);
            border-radius: 6px;
            padding: 12px;
            font-size: 14px;
            color: var(--ink);
            line-height: 1.5;
          }
          
          @media (max-width: 768px) {
            .decision-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }
          }
            
            .q {
              padding: 16px;
            }
          }
          
          /* 檢核表格容器樣式 */
          .sp3e-container .checklist-container {
            overflow-x: auto;
            border-radius: 6px;
            background-color: var(--card-bg);
            border: 1px solid var(--line);
          }
          
          .sp3e-container .checklist-container table {
            width: 100%;
            border-collapse: collapse;
            margin: 0;
          }
          
          .sp3e-container .checklist-container th,
          .sp3e-container .checklist-container td {
            padding: 10px 8px;
            border-bottom: 1px solid var(--line);
            text-align: center;
            color: var(--ink);
          }
          
          .sp3e-container .checklist-container th {
            background-color: var(--th-bg);
            font-weight: 600;
            color: var(--th-text);
          }
          
          .checklist-container td:nth-child(2) {
            text-align: left;
          }
          
          .checklist-container td:last-child {
            text-align: left;
          }
          
          .sp3e-container .checklist-container input[type="text"] {
            width: 100%;
            padding: 4px 6px;
            border: 1px solid var(--line);
            border-radius: 4px;
            font-size: 13px;
            background-color: var(--input-bg);
            color: var(--input-text);
          }
          
          .sp3e-container .checklist-container input[type="radio"] {
            transform: scale(1.1);
          }
          
          /* 修復表格狀態文字位移問題 */
          .checklist-container tfoot td {
            position: relative;
          }
          
          #E_msg {
            min-height: 20px;
            display: block;
            width: 100%;
            word-wrap: break-word;
            white-space: normal;
          }
          
          .checklist-container table {
            table-layout: fixed;
          }
          
          .sp3e-container .checklist-container tfoot {
            background-color: var(--th-bg);
          }
          
          .sp3e-container .checklist-container tfoot td {
            color: var(--th-text);
          }
        </style>
      </fieldset>

      <fieldset class="q checklist-fieldset">
        <h3 class="fieldset-title">完成檢核（是/否）</h3>
        <div class="checklist-container">
          <table>
            <thead><tr><th style="width:36px">#</th><th>項目</th><th style="width:90px">是</th><th style="width:90px">否</th><th>備註</th></tr></thead>
            <tbody id="E_rows">
              <tr>
                <td>1</td><td>評估病人承重能力</td>
                <td><input type="radio" name="E_check1" value="是" onchange="window.Tool3E && Tool3E.updateChecklist()"></td>
                <td><input type="radio" name="E_check1" value="否" onchange="window.Tool3E && Tool3E.updateChecklist()"></td>
                <td><input type="text" name="E_note1" placeholder="備註"></td>
              </tr>
              <tr>
                <td>2</td><td>確認病人配合意願</td>
                <td><input type="radio" name="E_check2" value="是" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="radio" name="E_check2" value="否" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="text" name="E_note2" placeholder="備註"></td>
              </tr>
              <tr>
                <td>3</td><td>評估上肢力量</td>
                <td><input type="radio" name="E_check3" value="是" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="radio" name="E_check3" value="否" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="text" name="E_note3" placeholder="備註"></td>
              </tr>
              <tr>
                <td>4</td><td>準備適當輔具</td>
                <td><input type="radio" name="E_check4" value="是" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="radio" name="E_check4" value="否" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="text" name="E_note4" placeholder="備註"></td>
              </tr>
              <tr>
                <td>5</td><td>確保足夠人力</td>
                <td><input type="radio" name="E_check5" value="是" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="radio" name="E_check5" value="否" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="text" name="E_note5" placeholder="備註"></td>
              </tr>
              <tr>
                <td>6</td><td>環境安全檢查</td>
                <td><input type="radio" name="E_check6" value="是" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="radio" name="E_check6" value="否" onchange="Tool3E.updateChecklist()"></td>
                <td><input type="text" name="E_note6" placeholder="備註"></td>
              </tr>
            </tbody>
            <tfoot><tr><td></td><td><b>合計</b></td><td id="E_yes">0</td><td id="E_no">0</td><td id="E_msg" class="small">請完成檢核</td></tr></tfoot>
          </table>
        </div>
            </fieldset>
</div>
    `;
    }

    // 更新決策建議
    updateDecision() {
      const weight = document.querySelector('select[name="E_weight"]')?.value || '';
      const cooperation = document.querySelector('select[name="E_coop"]')?.value || '';
      const upperLimb = document.querySelector('select[name="E_ue"]')?.value || '';
      const staffCount = document.querySelector('input[name="E_staff"]')?.value || '';
      
      let suggestion = '';
      
      if (weight === '完全') {
        suggestion = '🟢 守候即可：病人可完全承重，僅需 1 人守候確保安全，可使用步態帶進行站立迴轉。';
      } else if (weight === '部分' && cooperation === '是') {
        suggestion = '🟡 輔助移位：使用站立迴轉技巧配合步態帶，或使用動力站立輔具，通常需要 1 人協助。';
      } else if (weight === '部分' && cooperation === '否') {
        suggestion = '🟠 吊帶移位：建議使用全身吊帶配合 2 人協助，確保安全。';
      } else if (weight === '無法') {
        suggestion = '🔴 完全協助：必須使用全身吊帶配合 2 人協助，必要時增加人力。';
      } else {
        suggestion = '請完整選擇病人條件以獲得個人化移位建議。';
      }

      const textElement = document.getElementById('sp3eSuggest');
      if (textElement) {
        textElement.innerHTML = suggestion;
      }
    }

    // 更新檢核清單
    updateChecklist() {
      const yesInputs = document.querySelectorAll('#sp3eForm input[type="radio"][value="是"]:checked');
      const noInputs = document.querySelectorAll('#sp3eForm input[type="radio"][value="否"]:checked');
      
      const yesCount = yesInputs.length;
      const noCount = noInputs.length;
      
      const yesElement = document.getElementById('E_yes');
      const noElement = document.getElementById('E_no');
      const msgElement = document.getElementById('E_msg');
      
      if (yesElement) yesElement.textContent = yesCount;
      if (noElement) noElement.textContent = noCount;
      
      if (msgElement) {
        if (yesCount >= 4) {
          msgElement.innerHTML = '<span class="status-success">✅ 安全移位要件多已就緒</span>';
        } else if (yesCount >= 2) {
          msgElement.innerHTML = '<span class="status-warning">⚠️ 部分要件缺漏，請補強人力/輔具與溝通</span>';
        } else {
          msgElement.innerHTML = '<span class="status-danger">❌ 尚未就緒，建議暫緩或改採吊帶輔具</span>';
        }
      }
    }

    // 儲存功能
    save() {
      const data = {
        weight: document.querySelector('select[name="E_weight"]')?.value || '',
        cooperation: document.querySelector('select[name="E_coop"]')?.value || '',
        upperLimb: document.querySelector('select[name="E_ue"]')?.value || '',
        staffCount: document.querySelector('input[name="E_staff"]')?.value || '',
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('tool3E_data', JSON.stringify(data));
      alert('尚未開發');
    }

    // 載入功能
    load() {
      const saved = localStorage.getItem('tool3E_data');
      if (saved) {
        const data = JSON.parse(saved);
        
        const weightSelect = document.querySelector('select[name="E_weight"]');
        const coopSelect = document.querySelector('select[name="E_coop"]');
        const ueSelect = document.querySelector('select[name="E_ue"]');
        const staffInput = document.querySelector('input[name="E_staff"]');
        
        if (weightSelect) weightSelect.value = data.weight || '';
        if (coopSelect) coopSelect.value = data.cooperation || '';
        if (ueSelect) ueSelect.value = data.upperLimb || '';
        if (staffInput) staffInput.value = data.staffCount || '';
        
        this.updateDecision();
        alert('尚未開發');
      } else {
        alert('❌ 找不到儲存的數據');
      }
    }

    // 清空功能
    clear() {
      if (confirm('確定要清空所有數據嗎？')) {
        document.querySelectorAll('select, input[type="number"], input[type="text"]').forEach(element => {
          element.value = '';
        });
        
        document.querySelectorAll('input[type="radio"]').forEach(element => {
          element.checked = false;
        });
        
        const suggestElement = document.getElementById('sp3eSuggest');
        const yesCountElement = document.getElementById('E_yes');
        const noCountElement = document.getElementById('E_no');
        const msgElement = document.getElementById('E_msg');
        
        if (suggestElement) suggestElement.innerHTML = '請選擇病人條件以獲得移位建議';
        if (yesCountElement) yesCountElement.textContent = '0';
        if (noCountElement) noCountElement.textContent = '0';
        if (msgElement) msgElement.innerHTML = '請完成檢核';

        alert('尚未開發');
      }
    }
  }

  // 創建全局實例
  const tool3E = new Tool3E();

  // 全域接口
  window.Tool3E = {
    generateHTML: () => tool3E.generateHTML(),
    updateDecision: () => tool3E.updateDecision(),
    updateChecklist: () => tool3E.updateChecklist(),
    save: () => tool3E.save(),
    load: () => tool3E.load(),
    clear: () => tool3E.clear(),
    init: () => {
      // 初始化時綁定事件監聽器
      setTimeout(() => {
        const form = document.getElementById('sp3eForm');
        if (form) {
          const selects = form.querySelectorAll('select, input[type="number"]');
          selects.forEach(element => {
            element.addEventListener('change', () => tool3E.updateDecision());
          });
          
          const radios = form.querySelectorAll('input[type="radio"]');
          radios.forEach(element => {
            element.addEventListener('change', () => tool3E.updateChecklist());
          });
          
          console.log('✅ 3E 工具事件監聽器已綁定');
        }
      }, 100);
    }
  };

  console.log('✅ 3E 安全移位工具載入完成');
  
  // 當頁面載入完成後，自動初始化事件監聽器
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      window.Tool3E && window.Tool3E.init && window.Tool3E.init();
    });
  }

})();