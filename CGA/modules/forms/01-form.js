// CGA 表單模組 1: 基本資料
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm01 {
    constructor() {
      this.id = 1;
      this.title = "基本資料";
    }

    generateHTML() {
      return `<div class="form">
  <div class="field"><label>姓名</label><input id="pname"></div>
  <div class="field"><label>病歷號/索引</label><input id="pid"></div>
  <div class="field"><label>床號</label><input id="bed"></div>
  <div class="field"><label>性別</label><select id="sex"><option></option><option>女</option><option>男</option></select></div>

  <div class="field"><label>年齡</label><input id="age" type="number" min="0" max="120"></div>
  <div class="field"><label>住院日</label><input id="adm" type="date"></div>
  <div class="field"><label>出院日</label><input id="dis" type="date"></div>
  <div class="field"><label>初評日期</label><input id="iDate" type="date"></div>

  <div class="field"><label>複評日期</label><input id="fDate" type="date"></div>
  <div class="field"><label>教育程度</label><select id="edu"><option></option><option>不識字</option><option>識字未就學</option><option>國小</option><option>國中</option><option>高中</option><option>大專以上</option></select></div>
  <div class="field"><label>婚姻狀態</label><select id="marital"><option></option><option>未婚</option><option>已婚</option><option>喪偶</option><option>離婚</option><option>其他</option></select></div>
  <div class="field"><label>居住狀況</label><select id="living"><option></option><option>獨居</option><option>與配偶</option><option>與家人</option><option>機構/安養</option><option>其他</option></select></div>

  <div class="field col-6"><label>住所</label><input id="address"></div>
  <div class="field"><label>居住樓層</label><select id="floor"><option></option><option>一樓</option><option>二樓以上無電梯</option><option>二樓以上有電梯</option></select></div>
  <div class="field"><label>宗教信仰</label><select id="religion"><option></option><option>無</option><option>佛教</option><option>道教</option><option>基督教</option><option>天主教</option><option>其他</option></select></div>
  <div class="field"><label>工作</label><select id="job"><option></option><option>退休</option><option>家管</option><option>目前有工作</option></select></div>

  <div class="field"><label>家庭經濟狀況</label><select id="economy"><option></option><option>富裕</option><option>小康</option><option>貧窮</option><option>其他</option></select></div>
  <div class="field"><label>主要照顧者</label><select id="caregiver"><option></option><option>配偶</option><option>子女</option><option>外籍照服</option><option>其他</option></select></div>
  <div class="field"><label>主要醫療決定者</label><select id="decision"><option></option><option>自己</option><option>配偶</option><option>子女</option><option>機構人員</option><option>其他</option></select></div>
  <div class="field"><label>安寧/預立醫療書</label><select id="ad"><option></option><option>無</option><option>有</option><option>不知道</option><option>無法評估</option></select></div>

  <div class="field"><label>身高（cm）</label><input id="ht" type="number" step="0.1"></div>
  <div class="field"><label>體重（kg）</label><input id="wt" type="number" step="0.1"></div>
  <div class="field"><label>BMI</label><input id="bmi" readonly></div>
  <div class="field"><label>體脂肪（BIA %）</label><input id="bia" type="number" step="0.1"></div>
  <div class="field"><label>IBW(22×BH²)</label><input id="ibw" readonly></div>
  <div class="field"><label>與 IBW 差</label><input id="ibwDiff" readonly></div>
</div>
<div class="hint">身高/體重即時計算 BMI、IBW、與 IBW 差值。</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm01 = new CGAForm01();
  
  console.log('✅ CGAForm01 模組已載入');
})();
