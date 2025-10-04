// ============================================================================
// CGA 表單模組 1: 基本資料
// ============================================================================
// 包含：個人基本資訊、教育程度、居住狀況、生理測量（身高/體重/BMI）
// ============================================================================

(function() {
  'use strict';

  class CGAForm01 {
    constructor() {
      this.id = 1;
      this.title = "基本資料";
    }

    /**
     * 生成基本資料表單的 HTML 模板
     * @returns {string} HTML 字串
     */
    generateHTML() {
      return `
<!-- ========================================
     病患基本資料
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 1.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  📋 病患基本資料
</h3>

<div class="form">
  <!-- 病歷號（全寬，用於搜尋帶入資料） -->
  <div class="field col-12">
    <label>病歷號 / 索引號 <span style="color: #ef4444;">*</span></label>
    <input id="pid" placeholder="請輸入病歷號（可自動帶入病患資料）" required>
  </div>

  <!-- 第一列：基本識別 -->
  <div class="field col-4">
    <label>姓名 <span style="color: #ef4444;">*</span></label>
    <input id="pname" placeholder="請輸入姓名" required>
  </div>
  <div class="field col-2">
    <label>床號</label>
    <input id="bed" placeholder="床號">
  </div>
  <div class="field col-2">
    <label>性別 <span style="color: #ef4444;">*</span></label>
    <select id="sex" required>
      <option value="">-</option>
      <option>男</option>
      <option>女</option>
    </select>
  </div>
  <div class="field col-2">
    <label>出生年月日 <span style="color: #ef4444;">*</span></label>
    <input id="birthDate" type="text" datepicker datepicker-format="yyyy-mm-dd" datepicker-autohide datepicker-buttons datepicker-autoselect-today placeholder="選擇日期" required>
  </div>
  <div class="field col-2">
    <label>年齡</label>
    <input id="age" type="number" readonly placeholder="自動計算" style="background: var(--surface); color: var(--muted);">
  </div>
  <div class="field col-3">
    <label>教育程度</label>
    <select id="edu" required>
      <option value="">-</option>
      <option>不識字</option>
      <option>識字未就學</option>
      <option>國小</option>
      <option>國中</option>
      <option>高中職</option>
      <option>大專以上</option>
    </select>
  </div>
  <div class="field col-3">
    <label>婚姻狀態</label>
    <select id="marital" required>
      <option value="">-</option>
      <option>已婚</option>
      <option>未婚</option>
      <option>喪偶</option>
      <option>離婚</option>
      <option>其他</option>
    </select>
  </div>
  <div class="field col-3">
    <label>宗教信仰</label>
    <select id="religion" required>
      <option value="">-</option>
      <option>無</option>
      <option>佛教</option>
      <option>道教</option>
      <option>基督教</option>
      <option>天主教</option>
      <option>其他</option>
    </select>
  </div>
</div>

<!-- ========================================
     居住環境資訊
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  🏠 居住環境資訊
</h3>

<div class="form">
  <!-- 住址（全寬） -->
  <div class="field col-12">
    <label>聯絡地址</label>
    <input id="address" placeholder="請輸入完整地址（含縣市、鄉鎮市區、街道門牌）">
  </div>

  <!-- 居住詳情 -->
  <div class="field col-3">
    <label>居住狀況</label>
    <select id="living" required>
      <option value="">-</option>
      <option>獨居</option>
      <option>與配偶同住</option>
      <option>與子女同住</option>
      <option>與家人同住</option>
      <option>安養機構</option>
      <option>其他</option>
    </select>
  </div>
  <div class="field col-3">
    <label>居住樓層</label>
    <select id="floor" required>
      <option value="">-</option>
      <option>一樓</option>
      <option>二樓以上（有電梯）</option>
      <option>二樓以上（無電梯）</option>
    </select>
  </div>
  <div class="field col-3">
    <label>工作狀態</label>
    <select id="job" required>
      <option value="">-</option>
      <option>已退休</option>
      <option>家管</option>
      <option>目前有工作</option>
      <option>待業中</option>
    </select>
  </div>
  <div class="field col-3">
    <label>經濟狀況</label>
    <select id="economy" required>
      <option value="">-</option>
      <option>富裕</option>
      <option>小康</option>
      <option>普通</option>
      <option>困難</option>
      <option>低收入戶</option>
    </select>
  </div>
</div>

<!-- ========================================
     照護資訊
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  👥 照護與醫療決策
</h3>

<div class="form">
  <div class="field col-3">
    <label>主要照顧者</label>
    <select id="caregiver" required>
      <option value="">-</option>
      <option>配偶</option>
      <option>子女</option>
      <option>其他家人</option>
      <option>外籍看護</option>
      <option>本籍看護</option>
      <option>無固定照顧者</option>
    </select>
  </div>
  <div class="field col-3">
    <label>醫療決策代理人</label>
    <select id="decision" required>
      <option value="">-</option>
      <option>本人</option>
      <option>配偶</option>
      <option>子女</option>
      <option>其他家人</option>
      <option>機構人員</option>
      <option>其他</option>
    </select>
  </div>
  <div class="field col-3">
    <label>預立醫療決定書 (AD)</label>
    <select id="ad" required>
      <option value="">-</option>
      <option>有（已簽署）</option>
      <option>無</option>
      <option>不清楚</option>
      <option>無法評估</option>
    </select>
  </div>
</div>

<!-- ========================================
     就醫紀錄
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  📅 就醫紀錄
</h3>

<div class="form">
  <div class="field col-3">
    <label>住院日期</label>
    <input id="adm" type="text" datepicker datepicker-format="yyyy-mm-dd" datepicker-autohide datepicker-buttons datepicker-autoselect-today placeholder="選擇日期">
  </div>
  <div class="field col-3">
    <label>出院日期</label>
    <input id="dis" type="text" datepicker datepicker-format="yyyy-mm-dd" datepicker-autohide datepicker-buttons datepicker-autoselect-today placeholder="選擇日期">
  </div>
  <div class="field col-3">
    <label>初次評估日期</label>
    <input id="iDate" type="text" datepicker datepicker-format="yyyy-mm-dd" datepicker-autohide datepicker-buttons datepicker-autoselect-today placeholder="選擇日期">
  </div>
  <div class="field col-3">
    <label>複評日期</label>
    <input id="fDate" type="text" datepicker datepicker-format="yyyy-mm-dd" datepicker-autohide datepicker-buttons datepicker-autoselect-today placeholder="選擇日期">
  </div>
</div>

<!-- ========================================
     生理測量
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  📏 生理測量數據
</h3>

<div class="form">
  <!-- 基礎測量 -->
  <div class="field col-2">
    <label>身高 (cm)</label>
    <input id="ht" type="number" step="0.1" placeholder="公分">
  </div>
  <div class="field col-2">
    <label>體重 (kg)</label>
    <input id="wt" type="number" step="0.1" placeholder="公斤">
  </div>
  <div class="field col-2">
    <label>體脂肪 (%)</label>
    <input id="bia" type="number" step="0.1" placeholder="選填">
  </div>
  
  <!-- 計算值（唯讀） -->
  <div class="field col-2">
    <label>BMI</label>
    <input id="bmi" readonly placeholder="自動計算" style="background: var(--surface); color: var(--muted);">
  </div>
  <div class="field col-2">
    <label>理想體重 (IBW)</label>
    <input id="ibw" readonly placeholder="自動計算" style="background: var(--surface); color: var(--muted);">
  </div>
  <div class="field col-2">
    <label>與 IBW 差異</label>
    <input id="ibwDiff" readonly placeholder="自動計算" style="background: var(--surface); color: var(--muted);">
  </div>
</div>

<!-- 提示訊息 -->
${InfoBoxBuilder.info(
  `<strong>💡 系統自動計算說明：</strong><br>
  • <strong>年齡</strong>：根據出生日期自動計算<br>
  • <strong>BMI</strong>：體重(kg) ÷ 身高²(m²)<br>
  • <strong>理想體重 (IBW)</strong>：22 × 身高²(m²)<br>
  • <strong>與 IBW 差異</strong>：實際體重 - 理想體重`)}`;
    }

    /**
     * 初始化表單（綁定年齡自動計算事件和初始化 Datepicker）
     */
    initialize() {
      // 使用 DatepickerHelper 初始化所有日期選擇器
      if (window.DatepickerHelper) {
        DatepickerHelper.init(['birthDate', 'adm', 'dis', 'iDate', 'fDate']);
      }

      const birthDateInput = document.getElementById('birthDate');
      const ageInput = document.getElementById('age');
      
      if (birthDateInput && ageInput) {
        // 計算年齡的函數
        const calculateAge = () => {
          const birthDate = birthDateInput.value;
          if (!birthDate) {
            ageInput.value = '';
            return;
          }
          
          const birth = new Date(birthDate);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          
          // 如果還沒過生日，年齡減1
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          
          ageInput.value = age >= 0 ? age : '';
        };
        
        // 綁定事件 - 監聽 changeDate 和 input 事件
        birthDateInput.addEventListener('changeDate', calculateAge);
        birthDateInput.addEventListener('input', calculateAge);
        birthDateInput.addEventListener('change', calculateAge);
        
        // 初始計算（如果已有值）
        calculateAge();
      }

      // 設定初評日期為今天
      const iDateInput = document.getElementById('iDate');
      if (iDateInput && !iDateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        iDateInput.value = today;
      }

      // 啟用自動跳到下一欄功能
      if (window.FormAutoFocus) {
        window.FormAutoFocus.enableForForm(0, {
          delay: 100,
          autoExpand: true,  // 啟用自動展開選單
          debug: true,       // 啟用除錯訊息以確認運作
          initDelay: 300
        });
      }
    }
  }

  // ========================================
  // 註冊到全域
  // ========================================
  window.CGAForm01 = new CGAForm01();
  
  console.log('✅ CGAForm01 模組已載入');
  
})();
