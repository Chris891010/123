// CGA 表單模組 2: 個人史/家系圖/功能回顧
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm02 {
    constructor() {
      this.id = 2;
      this.title = "個人史/家系圖/功能回顧";
    }

    generateHTML() {
      return `
<!-- ========================================
     個人生活習慣史
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 1.5rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  🚬 個人生活習慣史
</h3>

<div class="form">
  <!-- 吸菸史 -->
  <div class="field col-2">
    <label>吸菸狀態</label>
    <select id="smoke" required>
      <option value="">-</option>
      <option>從不吸菸</option>
      <option>已戒菸</option>
      <option>目前吸菸</option>
    </select>
  </div>
  <div class="field col-2">
    <label>菸齡/戒菸年數</label>
    <input id="smokeY" type="number" min="0" placeholder="年">
  </div>
  <div class="field col-4">
    <label>吸菸型態</label>
    <input id="smokeType" placeholder="例：每日1包、偶爾抽、朋友聚會時">
  </div>

  <!-- 飲酒史 -->
  <div class="field col-2">
    <label>飲酒狀態</label>
    <select id="alcohol" required>
      <option value="">-</option>
      <option>從不喝酒</option>
      <option>已戒酒</option>
      <option>偶爾飲用</option>
      <option>經常飲用</option>
    </select>
  </div>
  <div class="field col-2">
    <label>酒齡/戒酒年數</label>
    <input id="alcoholY" type="number" min="0" placeholder="年">
  </div>
  <div class="field col-4">
    <label>飲酒頻率/量</label>
    <input id="alcoholAvg" placeholder="例：每週2-3次、每次1-2瓶啤酒">
  </div>

  <!-- 檳榔史 -->
  <div class="field col-2">
    <label>檳榔嚼食</label>
    <select id="betel" required>
      <option value="">-</option>
      <option>從不嚼食</option>
      <option>已戒除</option>
      <option>目前嚼食</option>
    </select>
  </div>
  <div class="field col-2">
    <label>嚼食年數</label>
    <input id="betelY" type="number" min="0" placeholder="年">
  </div>
  <div class="field col-4">
    <label>過敏史/重大事故</label>
    <input id="allergy" placeholder="無 / 請詳細說明藥物或食物過敏">
  </div>

  <!-- 疫苗接種史 -->
  <div class="field col-12">
    <label>疫苗接種紀錄</label>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="v_flu" style="width: auto; cursor: pointer;">
        <span>流感疫苗（最近一年）</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="v_pcv" style="width: auto; cursor: pointer;">
        <span>肺炎鏈球菌疫苗</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="v_covid" style="width: auto; cursor: pointer;">
        <span>COVID-19 疫苗</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="v_tdap" style="width: auto; cursor: pointer;">
        <span>破傷風 (Td/Tdap)</span>
      </label>
    </div>
  </div>
</div>

<!-- ========================================
     重大疾病史
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  🏥 重大疾病史
</h3>

<div class="form">
  <div class="field col-12">
    <label>疾病史選項</label>
    <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="hx_none" style="width: auto; cursor: pointer;">
        <span>無重大疾病史</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="hx_ca" style="width: auto; cursor: pointer;">
        <span>惡性腫瘤</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="hx_ca_meta" style="width: auto; cursor: pointer;">
        <span>伴遠端轉移</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="hx_auto" style="width: auto; cursor: pointer;">
        <span>免疫風濕疾病</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="hx_hiv" style="width: auto; cursor: pointer;">
        <span>HIV / AIDS</span>
      </label>
      <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
        <input type="checkbox" id="hx_deform" style="width: auto; cursor: pointer;">
        <span>疾病致畸形/殘障</span>
      </label>
    </div>
  </div>
  <div class="field col-12">
    <label>其他疾病史補充說明</label>
    <input id="hx_note" placeholder="請詳細說明其他重大疾病、慢性病或手術史">
  </div>
</div>

<!-- ========================================
     功能性回顧
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  👁️ 感官功能與日常問題
</h3>

<div class="form">
  <!-- 視覺 -->
  <div class="field col-3">
    <label>視力問題</label>
    <select id="rv_v" required>
      <option value="">-</option>
      <option>無問題</option>
      <option>有問題</option>
      <option>無法評估</option>
    </select>
  </div>
  <div class="field col-3">
    <label>配戴眼鏡</label>
    <select id="rv_glass" required>
      <option value="">-</option>
      <option>否</option>
      <option>是</option>
    </select>
  </div>

  <!-- 聽覺 -->
  <div class="field col-3">
    <label>聽力問題</label>
    <select id="rv_h" required>
      <option value="">-</option>
      <option>無問題</option>
      <option>有問題</option>
      <option>無法評估</option>
    </select>
  </div>
  <div class="field col-3">
    <label>使用助聽器</label>
    <select id="rv_aid" required>
      <option value="">-</option>
      <option>否</option>
      <option>左耳</option>
      <option>右耳</option>
      <option>雙側</option>
    </select>
  </div>

  <!-- 溝通 -->
  <div class="field col-12">
    <label>語言/溝通能力備註</label>
    <input id="rv_comm" placeholder="例：口齒清晰、需用台語溝通、有表達困難等">
  </div>

  <!-- 牙齒 -->
  <div class="field col-3">
    <label>牙齒問題</label>
    <select id="rv_teeth" required>
      <option value="">-</option>
      <option>無問題</option>
      <option>有問題</option>
    </select>
  </div>
  <div class="field col-3">
    <label>假牙使用</label>
    <select id="rv_denture" required>
      <option value="">-</option>
      <option>否</option>
      <option>活動假牙</option>
      <option>固定假牙</option>
    </select>
  </div>

  <!-- 睡眠 -->
  <div class="field col-3">
    <label>睡眠問題</label>
    <select id="rv_sleep" required>
      <option value="">-</option>
      <option>無問題</option>
      <option>有問題</option>
      <option>無法評估</option>
    </select>
  </div>
  <div class="field col-3">
    <label>使用助眠藥</label>
    <select id="rv_sleepmed" required>
      <option value="">-</option>
      <option>否</option>
      <option>是</option>
    </select>
  </div>

  <!-- 排泄 -->
  <div class="field col-3">
    <label>便秘問題</label>
    <select id="rv_const" required>
      <option value="">-</option>
      <option>無</option>
      <option>有</option>
    </select>
  </div>
  <div class="field col-3">
    <label>使用瀉藥</label>
    <select id="rv_lax" required>
      <option value="">-</option>
      <option>否</option>
      <option>是</option>
    </select>
  </div>
</div>

<!-- ========================================
     家系圖（簡易）
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  👨‍👩‍👧‍👦 家系圖（簡易記錄）
</h3>

<div class="form">
  <div class="field col-2">
    <label>家庭角色</label>
    <select id="famRole" required>
      <option value="">-</option>
      <option>父親</option>
      <option>母親</option>
      <option>配偶</option>
      <option>兄弟姊妹</option>
      <option>子女</option>
      <option>其他親屬</option>
    </select>
  </div>
  <div class="field col-2">
    <label>姓名</label>
    <input id="famName" placeholder="姓名">
  </div>
  <div class="field col-2">
    <label>性別</label>
    <select id="famSex" required>
      <option value="">-</option>
      <option>男</option>
      <option>女</option>
    </select>
  </div>
  <div class="field col-2">
    <label>年齡</label>
    <input id="famAge" type="number" min="0" placeholder="歲">
  </div>
  <div class="field col-2">
    <label>生存狀態</label>
    <select id="famStatus" required>
      <option value="">-</option>
      <option>在世</option>
      <option>已過世</option>
    </select>
  </div>
  <div class="field col-6">
    <label>重要疾病/備註</label>
    <input id="famDx" placeholder="例：糖尿病、高血壓、癌症等">
  </div>
</div>

<div style="margin: 1rem 0;">
  <button class="btn btn-primary" id="addFam">➕ 新增家庭成員</button>
  <span style="color: var(--muted); font-size: 0.875rem; margin-left: 1rem;">
    新增後以標籤方式顯示，點擊 × 可刪除
  </span>
</div>

<div id="famRows" style="margin-top: 1.5rem;">
  <div style="margin-bottom: 1rem;">
    <strong style="color: var(--brand); font-size: 0.9375rem;">父母</strong>
    <div id="rowParent" style="margin-top: 0.5rem;"></div>
  </div>
  <div style="margin-bottom: 1rem;">
    <strong style="color: var(--brand); font-size: 0.9375rem;">配偶</strong>
    <div id="rowSpouse" style="margin-top: 0.5rem;"></div>
  </div>
  <div style="margin-bottom: 1rem;">
    <strong style="color: var(--brand); font-size: 0.9375rem;">兄弟姊妹</strong>
    <div id="rowSibling" style="margin-top: 0.5rem;"></div>
  </div>
  <div style="margin-bottom: 1rem;">
    <strong style="color: var(--brand); font-size: 0.9375rem;">子女</strong>
    <div id="rowChild" style="margin-top: 0.5rem;"></div>
  </div>
  <div style="margin-bottom: 1rem;">
    <strong style="color: var(--brand); font-size: 0.9375rem;">其他親屬</strong>
    <div id="rowOther" style="margin-top: 0.5rem;"></div>
  </div>
</div>

<!-- ========================================
     跌倒事件紀錄
     ======================================== -->
<h3 style="color: var(--brand); font-size: 1.125rem; font-weight: 700; margin: 2rem 0 1rem 0; padding-bottom: 0.5rem; border-bottom: 2px solid var(--line);">
  ⚠️ 跌倒事件紀錄
</h3>

<div class="form">
  <div class="field col-3">
    <label>近一年曾跌倒</label>
    <select id="fallAny" required>
      <option value="">-</option>
      <option>否</option>
      <option>是</option>
    </select>
  </div>
  <div class="field col-3">
    <label>跌倒次數</label>
    <input id="fallCnt" type="number" min="0" placeholder="次">
  </div>
  <div class="field col-12">
    <label>整體概述</label>
    <input id="fallBrief" placeholder="例：在浴室滑倒、走路時絆倒、從床上跌落等">
  </div>
</div>

<h4 style="color: var(--ink); font-size: 1rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0;">
  詳細事件記錄
</h4>

<div class="form">
  <div class="field col-3">
    <label>日期</label>
    <input id="feDate" type="date">
  </div>
  <div class="field col-3">
    <label>地點</label>
    <input id="fePlace" placeholder="例：浴室、客廳">
  </div>
  <div class="field col-3">
    <label>發生情境</label>
    <input id="feCtx" placeholder="例：洗澡時、走路時">
  </div>
  <div class="field col-3">
    <label>傷害結果</label>
    <input id="feOut" placeholder="例：無傷、擦傷、骨折">
  </div>
  <div class="field col-12">
    <label>詳細備註</label>
    <input id="feNote" placeholder="更詳細的描述或其他相關資訊">
  </div>
</div>

<div style="margin: 1rem 0;">
  <button class="btn btn-primary" id="addFall">➕ 新增跌倒事件</button>
</div>

<div id="fallList" style="margin-top: 1.5rem;"></div>`;
    }
  }

  // 註冊到全域
  window.CGAForm02 = new CGAForm02();
  
  console.log('✅ CGAForm02 模組已載入');
})();
