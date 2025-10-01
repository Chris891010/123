(function() {
  'use strict';

  // 檢核項目定義 - [分類, 項目描述, 是否預設由設施工程處理]
  const INSPECTION_ITEMS = [
    ['1. 動線（Paths）','移除未使用設備（拐杖/助行器）', false],
    ['1. 動線（Paths）','未使用便盆椅移除', false],
    ['1. 動線（Paths）','徵得同意後重新擺設以清出動線', false],
    ['1. 動線（Paths）','床邊桌靠近床緣且不阻擋', false],
    ['1. 動線（Paths）','移除浴廁內不必要雜物', false],
    ['1. 動線（Paths）','窗簾束帶固定整齊', true],
    ['1. 動線（Paths）','電器線路整理並固定（電視/電話等）', true],
    ['2. 家具（Furniture）','床腳煞車上鎖', false],
    ['2. 家具（Furniture）','更換不穩定的床', true],
    ['2. 家具（Furniture）','床位貼牆（依消防/安全規範）', true],
    ['2. 家具（Furniture）','移除輕巧或不穩定的家具', true],
    ['2. 家具（Furniture）','清潔/修理/更換破損之床輪剎車', true],
    ['2. 家具（Furniture）','固定鬆動的家具', true],
    ['2. 家具（Furniture）','鎖緊鬆動之浴廁扶手', true],
    ['2. 家具（Furniture）','更換床邊鈴按鈕之橡膠墊', true],
    ['2. 家具（Furniture）','更換扶手止滑橡膠墊', true],
    ['2. 家具（Furniture）','修復破損坐墊或便盆椅', true],
    ['3. 易達性（Easy Access）','常用物品置於可及處（含呼叫鈴）', false],
    ['3. 易達性（Easy Access）','助行器於病人站起處可及', false],
    ['4. 地面（Floor）','更換/修補地坪', true],
    ['4. 地面（Floor）','更換或修復門檻高低落差', true],
    ['4. 地面（Floor）','房內與浴廁門檻設置斜坡', true],
    ['5. 照明（Lighting）','更換燈泡（使用規範瓦數）', true],
    ['5. 照明（Lighting）','修復房內照明或呼叫鈴燈', true],
    ['5. 照明（Lighting）','更換/延長呼叫鈴線', true],
    ['6. 器材（Equipment）','輪椅檢修（所有輪椅）', true],
    ['6. 器材（Equipment）','修復拐杖', true],
    ['6. 器材（Equipment）','修復助行器', true]
  ];

  let currentBedCount = 2; // 預設床位數

  /**
   * 生成3C床邊環境安全巡檢表內容
   */
  function generateContent() {
    return `
      <div class="card" style="max-width: 100%; overflow-x: auto;">
        <div class="row">
          <button class="btn" onclick="window.ToolsModuleAPI.backToTools()">← 返回工具庫</button>
        </div>
        
        <h3>3C 床邊環境安全巡檢表</h3>
        <p class="small">Tool Covering Environmental Safety at the Bedside</p>
        
        <details open style="margin-bottom: 16px;">
          <summary><strong>使用說明</strong></summary>
          <ul class="small" style="margin-top: 8px;">
            <li><strong>目的：</strong>由單位護理主管與設施工程共同巡檢病房與床邊環境，辨識並修復可能導致跌倒的環境風險</li>
            <li><strong>對象：</strong>住院病房（可逐房、逐床巡檢）</li>
            <li><strong>用法：</strong>在床欄上方輸入床位代碼（如 A、B、12、12-1），勾選需要處理的項目，可於「指派」選擇護理或設施工程並填寫備註</li>
            <li><strong>評估頻率：</strong>建議每月至少一次，或病人跌倒事件後立即評估</li>
          </ul>
        </details>

        <div class="toolbar" style="margin-bottom: 16px; gap: 8px; flex-wrap: wrap;">
          <button class="btn" onclick="ES3C.addBed()">➕ 新增床位</button>
          <button class="btn" onclick="ES3C.removeBed()">➖ 移除床位</button>
          <button class="btn" onclick="ES3C.saveData()">💾 儲存</button>
          <button class="btn" onclick="ES3C.loadData()">📁 載入</button>
          <button class="btn" onclick="ES3C.clearData()">🗑️ 清空</button>
          <button class="btn" onclick="ES3C.exportCSV()">📊 匯出CSV</button>
          <button class="btn primary" onclick="window.print()">🖨️ 列印</button>
        </div>

        <form id="es3cForm" data-form-id="es3c" style="margin-top: 16px;">
          <!-- 基本資料區 -->
          <fieldset style="border: 1px solid var(--line); border-radius: 8px; padding: 16px; margin-bottom: 16px;">
            <legend style="font-weight: 600; color: var(--content);">巡檢基本資料</legend>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span class="small">單位</span>
                <input type="text" name="unit" placeholder="如：5A病房" style="border: 1px solid var(--line); border-radius: 6px; padding: 8px;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span class="small">日期</span>
                <input type="date" name="date" style="border: 1px solid var(--line); border-radius: 6px; padding: 8px;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span class="small">房號</span>
                <input type="text" name="room" placeholder="如：501-1" style="border: 1px solid var(--line); border-radius: 6px; padding: 8px;">
              </label>
              <label style="display: flex; flex-direction: column; gap: 4px;">
                <span class="small">巡檢人員/簽名</span>
                <input type="text" name="inspector" placeholder="護理主管＋設施工程" style="border: 1px solid var(--line); border-radius: 6px; padding: 8px;">
              </label>
            </div>
          </fieldset>

          <!-- 巡檢表格區 -->
          <fieldset style="border: 1px solid var(--line); border-radius: 8px; padding: 16px;">
            <legend style="font-weight: 600; color: var(--content);">床邊環境安全巡檢</legend>
            <div style="overflow-x: auto; margin-top: 12px;">
              <table id="es3cTable" style="width: 100%; min-width: 600px; border-collapse: separate; border-spacing: 0; border: 1px solid var(--line); border-radius: 8px; overflow: hidden;">
                <thead id="es3cTableHead" style="background: var(--surface);"></thead>
                <tbody id="es3cTableBody"></tbody>
                <tfoot id="es3cTableFoot" style="background: var(--surface);"></tfoot>
              </table>
            </div>
          </fieldset>
        </form>

        <div id="es3cResults" style="margin-top: 16px;"></div>
      </div>
    `;
  }

  /**
   * 渲染巡檢表格
   */
  function renderTable() {
    const head = document.getElementById('es3cTableHead');
    const body = document.getElementById('es3cTableBody');
    const foot = document.getElementById('es3cTableFoot');
    
    if (!head || !body || !foot) return;

    // 清空現有內容
    head.innerHTML = '';
    body.innerHTML = '';
    foot.innerHTML = '';

    // 生成表頭
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th style="width: 220px; padding: 12px; text-align: left;">檢核項目</th>`;
    
    for (let i = 0; i < currentBedCount; i++) {
      const bedLabel = String.fromCharCode(65 + i); // A, B, C...
      headerRow.innerHTML += `
        <th style="width: 80px; text-align: center; padding: 8px;">
          <div style="margin-bottom: 4px;">床位</div>
          <input type="text" 
                 name="bed_${i}" 
                 placeholder="${bedLabel}" 
                 style="width: 100%; border: 1px solid var(--line); border-radius: 4px; padding: 4px; text-align: center; font-size: 12px;">
        </th>
      `;
    }
    
    headerRow.innerHTML += `
      <th style="width: 120px; text-align: center; padding: 12px;">指派</th>
      <th style="width: 200px; text-align: center; padding: 12px;">備註</th>
    `;
    head.appendChild(headerRow);

    // 生成檢核項目行
    INSPECTION_ITEMS.forEach((item, index) => {
      const [category, description, isFacilityDefault] = item;
      const row = document.createElement('tr');
      row.style.borderBottom = '1px solid var(--line)';
      
      row.innerHTML = `
        <td style="padding: 8px; vertical-align: top;">
          <div style="font-weight: 600; color: var(--content); margin-bottom: 4px;">${category}</div>
          <div class="small" style="line-height: 1.3;">${description}</div>
        </td>
      `;

      // 各床位檢核欄
      for (let i = 0; i < currentBedCount; i++) {
        row.innerHTML += `
          <td style="text-align: center; padding: 8px;">
            <input type="checkbox" name="check_${index}_${i}" value="1" 
                   style="transform: scale(1.2);" onchange="ES3C.updateSummary()">
          </td>
        `;
      }

      // 指派欄
      const defaultAssignment = isFacilityDefault ? '設施工程' : '';
      row.innerHTML += `
        <td style="padding: 8px;">
          <select name="assign_${index}" style="width: 100%; border: 1px solid var(--line); border-radius: 4px; padding: 4px;">
            <option value="">未指派</option>
            <option value="護理" ${defaultAssignment === '護理' ? 'selected' : ''}>護理</option>
            <option value="設施工程" ${defaultAssignment === '設施工程' ? 'selected' : ''}>設施工程</option>
          </select>
        </td>
      `;

      // 備註欄
      row.innerHTML += `
        <td style="padding: 8px;">
          <input type="text" name="note_${index}" placeholder="位置/工單號/聯絡人..." 
                 style="width: 100%; border: 1px solid var(--line); border-radius: 4px; padding: 4px;">
        </td>
      `;

      body.appendChild(row);
    });

    // 生成統計行
    const summaryRow = document.createElement('tr');
    summaryRow.innerHTML = `<td style="padding: 12px; font-weight: 600;">各床位勾選數</td>`;
    
    for (let i = 0; i < currentBedCount; i++) {
      summaryRow.innerHTML += `<td id="bedSummary_${i}" style="text-align: center; padding: 12px; font-weight: 600;">0</td>`;
    }
    
    summaryRow.innerHTML += `<td colspan="2" id="overallSummary" style="padding: 12px;" class="small"></td>`;
    foot.appendChild(summaryRow);

    // 綁定變更事件
    const form = document.getElementById('es3cForm');
    if (form) {
      form.addEventListener('change', updateSummary);
    }

    // 初始更新統計
    updateSummary();
  }

  /**
   * 更新統計資訊
   */
  function updateSummary() {
    // 計算各床位勾選數
    for (let i = 0; i < currentBedCount; i++) {
      const checkboxes = document.querySelectorAll(`input[name^="check_"][name$="_${i}"]`);
      const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
      
      const summaryCell = document.getElementById(`bedSummary_${i}`);
      if (summaryCell) {
        summaryCell.textContent = checkedCount;
        summaryCell.style.color = checkedCount > 0 ? 'var(--warning)' : 'var(--content)';
      }
    }

    // 計算總計並提供建議
    const allSummaries = Array.from(document.querySelectorAll('[id^="bedSummary_"]'))
                             .map(cell => parseInt(cell.textContent) || 0);
    const totalIssues = allSummaries.reduce((sum, count) => sum + count, 0);

    const overallSummary = document.getElementById('overallSummary');
    if (overallSummary) {
      if (totalIssues === 0) {
        overallSummary.innerHTML = `<span style="color: var(--success);">✓ 本次未發現需處理項目</span>`;
      } else {
        overallSummary.innerHTML = `
          <span style="color: var(--warning);">⚠️ 共 ${totalIssues} 項需處理</span>
          <div style="margin-top: 4px;">請依「指派」分流並追蹤完成進度</div>
        `;
      }
    }
  }

  /**
   * 新增床位
   */
  function addBed() {
    if (currentBedCount < 10) { // 限制最多10個床位
      currentBedCount++;
      renderTable();
    }
  }

  /**
   * 移除床位
   */
  function removeBed() {
    if (currentBedCount > 1) {
      currentBedCount--;
      renderTable();
    }
  }

  /**
   * 儲存資料 - 尚未開發
   */
  function saveData() {
    alert('💡 儲存功能尚未開發，請暫時使用匯出CSV來保存資料');
    
    // TODO: 實作資料儲存功能
    // const form = document.getElementById('es3cForm');
    // if (!form) return;
    // 
    // const formData = new FormData(form);
    // const data = {
    //   bedCount: currentBedCount,
    //   formData: {}
    // };
    // 
    // for (const [key, value] of formData.entries()) {
    //   data.formData[key] = value;
    // }
    // 
    // localStorage.setItem('es3c_data', JSON.stringify(data));
    // alert('✓ 巡檢資料已儲存');
  }

  /**
   * 載入資料 - 尚未開發
   */
  function loadData() {
    alert('💡 載入功能尚未開發，請重新填寫表單或使用匯出的CSV作為參考');
    
    // TODO: 實作資料載入功能
    // const savedData = localStorage.getItem('es3c_data');
    // if (!savedData) {
    //   alert('❌ 尚無已儲存的資料');
    //   return;
    // }
    // 
    // try {
    //   const data = JSON.parse(savedData);
    //   currentBedCount = data.bedCount || 2;
    //   renderTable();
    // 
    //   // 等待表格渲染完成後填充資料
    //   setTimeout(() => {
    //     const form = document.getElementById('es3cForm');
    //     if (form && data.formData) {
    //       Object.entries(data.formData).forEach(([key, value]) => {
    //         const element = form.querySelector(`[name="${key}"]`);
    //         if (element) {
    //           if (element.type === 'checkbox') {
    //             element.checked = !!value;
    //           } else {
    //             element.value = value;
    //           }
    //         }
    //       });
    //       updateSummary();
    //     }
    //   }, 100);
    // 
    //   alert('✓ 巡檢資料已載入');
    // } catch (error) {
    //   alert('❌ 資料載入失敗');
    // }
  }

  /**
   * 清空資料
   */
  function clearData() {
    if (confirm('確定要清空所有巡檢資料嗎？')) {
      currentBedCount = 2;
      renderTable();
      alert('✓ 已清空所有資料');
    }
  }

  /**
   * 匯出CSV
   */
  function exportCSV() {
    const form = document.getElementById('es3cForm');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // 準備CSV內容
    const csvRows = [];
    
    // 基本資料
    csvRows.push(['項目', '內容']);
    csvRows.push(['單位', data.unit || '']);
    csvRows.push(['日期', data.date || '']);
    csvRows.push(['房號', data.room || '']);
    csvRows.push(['巡檢人員', data.inspector || '']);
    csvRows.push(['']); // 空行

    // 巡檢結果
    csvRows.push(['檢核項目', '床位A', '床位B', '床位C', '床位D', '指派', '備註'].slice(0, 2 + currentBedCount + 2));
    
    INSPECTION_ITEMS.forEach((item, index) => {
      const [category, description] = item;
      const row = [`${category}: ${description}`];
      
      for (let i = 0; i < currentBedCount; i++) {
        row.push(data[`check_${index}_${i}`] ? '✓' : '');
      }
      
      row.push(data[`assign_${index}`] || '');
      row.push(data[`note_${index}`] || '');
      
      csvRows.push(row);
    });

    // 生成CSV字串
    const csvContent = csvRows.map(row => 
      row.map(field => `"${(field || '').toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n');

    // 下載CSV
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `3C床邊環境安全巡檢_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 將ES3C對象掛載到全域，供HTML調用
  window.ES3C = {
    generateContent: () => {
      const content = generateContent();
      // 內容載入後立即渲染表格
      setTimeout(() => renderTable(), 100);
      return content;
    },
    generateHTML: () => {
      const content = generateContent();
      // 內容載入後立即渲染表格
      setTimeout(() => renderTable(), 100);
      return content;
    },
    renderTable,
    updateSummary,
    addBed,
    removeBed,
    saveData,
    loadData,
    clearData,
    exportCSV
  };



})();