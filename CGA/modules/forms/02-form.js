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
      return `<div class="sec"><h3>個人史</h3>
  <div class="form">
    <div class="field"><label>吸菸</label><select id="smoke"><option></option><option>不吸菸</option><option>已戒菸</option><option>吸菸中</option></select></div>
    <div class="field"><label>菸齡/戒菸年</label><input id="smokeY" type="number"></div>
    <div class="field col-4"><label>吸菸型態</label><input id="smokeType" placeholder="偶爾/經常/朋友勸誘…"></div>
    <div class="field"><label>飲酒</label><select id="alcohol"><option></option><option>不喝</option><option>已戒酒</option><option>偶喝</option><option>經常</option></select></div>
    <div class="field"><label>酒齡/戒酒年</label><input id="alcoholY" type="number"></div>
    <div class="field col-6"><label>平均（杯/瓶/週）</label><input id="alcoholAvg"></div>
    <div class="field"><label>檣榔</label><select id="betel"><option></option><option>不嚼</option><option>已戒</option><option>習慣性嚼食</option></select></div>
    <div class="field"><label>年數</label><input id="betelY" type="number"></div>
    <div class="field col-6"><label>過敏/重大事故</label><input id="allergy" placeholder="無 / 具體說明"></div>
    <div class="field col-12"><label>疫苗史</label>
      <div class="tag"><input type="checkbox" id="v_flu"> 最近一年流感</div>
      <div class="tag"><input type="checkbox" id="v_pcv"> 肺炎鏈球菌</div>
      <div class="tag"><input type="checkbox" id="v_covid"> COVID-19</div>
      <div class="tag"><input type="checkbox" id="v_tdap"> Td/Tdap</div>
    </div>
  </div>
</div>

<div class="sec"><h3>家系圖（簡易）</h3>
  <div class="form">
    <div class="field"><label>角色</label><select id="famRole"><option></option><option>父親</option><option>母親</option><option>配偶</option><option>兄弟姊妹</option><option>子女</option><option>其他</option></select></div>
    <div class="field"><label>姓名</label><input id="famName"></div>
    <div class="field"><label>性別</label><select id="famSex"><option></option><option>男</option><option>女</option></select></div>
    <div class="field"><label>年齡</label><input id="famAge" type="number"></div>
    <div class="field"><label>狀態</label><select id="famStatus"><option></option><option>在世</option><option>過世</option></select></div>
    <div class="field col-6"><label>重要疾病/備註</label><input id="famDx"></div>
  </div>
  <div class="controls"><button class="btn" id="addFam">新增成員</button><span class="hint">以膠囊列呈現，可點 × 刪除。</span></div>
  <div id="famRows">
    <div><b>父母</b><div id="rowParent"></div></div>
    <div><b>配偶</b><div id="rowSpouse"></div></div>
    <div><b>兄弟姊妹</b><div id="rowSibling"></div></div>
    <div><b>子女</b><div id="rowChild"></div></div>
    <div><b>其他</b><div id="rowOther"></div></div>
  </div>
</div>

<div class="sec"><h3>重大疾病史</h3>
  <div class="tag"><input type="checkbox" id="hx_none"> 無</div>
  <div class="tag"><input type="checkbox" id="hx_ca"> 惡性腋瘤</div>
  <div class="tag"><input type="checkbox" id="hx_ca_meta"> 伴遠端轉移</div>
  <div class="tag"><input type="checkbox" id="hx_auto"> 免疫風濕疾病</div>
  <div class="tag"><input type="checkbox" id="hx_hiv"> HIV/AIDS</div>
  <div class="tag"><input type="checkbox" id="hx_deform"> 病致畸形/殘狀</div>
  <div class="form"><div class="field col-12"><label>其他</label><input id="hx_note"></div></div>
</div>

<div class="sec"><h3>功能性回顧（視/聽/語/牙/睡/便祕/尿失禁）</h3>
  <div class="form">
    <div class="field"><label>視覺</label><select id="rv_v"><option></option><option>無</option><option>有</option><option>無法評估</option></select></div>
    <div class="field"><label>配戴眼鏡</label><select id="rv_glass"><option></option><option>無</option><option>有</option></select></div>
    <div class="field"><label>聽覺</label><select id="rv_h"><option></option><option>無</option><option>有</option><option>無法評估</option></select></div>
    <div class="field"><label>助聽器</label><select id="rv_aid"><option></option><option>無</option><option>左</option><option>右</option><option>雙側</option></select></div>
    <div class="field col-6"><label>語言/溝通備註</label><input id="rv_comm"></div>
    <div class="field"><label>牙齒問題</label><select id="rv_teeth"><option></option><option>無</option><option>有</option></select></div>
    <div class="field"><label>假牙</label><select id="rv_denture"><option></option><option>無</option><option>活動</option><option>固定</option></select></div>
    <div class="field"><label>睡眠問題</label><select id="rv_sleep"><option></option><option>無</option><option>有</option><option>無法評估</option></select></div>
    <div class="field"><label>助眠藥</label><select id="rv_sleepmed"><option></option><option>無</option><option>有</option></select></div>
    <div class="field"><label>便祕</label><select id="rv_const"><option></option><option>無</option><option>有</option></select></div>
    <div class="field"><label>瀋藥</label><select id="rv_lax"><option></option><option>無</option><option>有</option></select></div>
  </div>
</div>

<div class="sec"><h3>跌倒事件簿</h3>
  <div class="form">
    <div class="field"><label>近一年曾跌倒</label><select id="fallAny"><option></option><option>否</option><option>是</option></select></div>
    <div class="field"><label>次數</label><input id="fallCnt" type="number" min="0"></div>
    <div class="field col-8"><label>概述</label><input id="fallBrief" placeholder="地點/情境/傷害…"></div>
    <div class="col-12"></div>
    <div class="field"><label>日期</label><input id="feDate" type="date"></div>
    <div class="field"><label>地點</label><input id="fePlace"></div>
    <div class="field"><label>情境</label><input id="feCtx"></div>
    <div class="field"><label>結果</label><input id="feOut"></div>
    <div class="field col-12"><label>備註</label><input id="feNote"></div>
  </div>
  <div class="controls"><button class="btn" id="addFall">新增事件</button></div>
  <div id="fallList"></div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm02 = new CGAForm02();
  
  console.log('✅ CGAForm02 模組已載入');
})();
