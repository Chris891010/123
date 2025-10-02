// CGA 表單模組 11: B9 生活品質（EQ-5D-3L / VAS）
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm11 {
    constructor() {
      this.id = 11;
      this.title = "B9 生活品質（EQ-5D-3L / VAS）";
      this.EQ5D = [
        {k:'mob',t:'行動：',opts:['我可以四處走動','我行動有些不便','我臥病在床']},
        {k:'self',t:'自我照顧：',opts:['我能照顧自己','我在盥洗/穿衣方面有些問題','我無法自己盥洗/穿衣']},
        {k:'usual',t:'平常活動：',opts:['可正常活動','有些困難','無法進行']},
        {k:'pain',t:'疼痛/不舒服：',opts:['沒有任何疼痛或不舒服','中度疼痛或不舒服','極度疼痛或不舒服']},
        {k:'anx',t:'焦慮/沮喪：',opts:['不覺得焦慮沮喪','中度焦慮沮喪','極度焦慮沮喪']},
      ];
    }

    initialize() {
      const grid = this.$('#eq5d');
      if (!grid) return;
      grid.innerHTML = '';
      this.EQ5D.forEach((it, idx) => {
        const d = document.createElement('div');
        d.className = 'field col-12';
        d.innerHTML = `<label>${String.fromCharCode(97+idx)}.${it.t}</label>` + it.opts.map((o, i) => `<label class="tag"><input type="radio" name="eq.${it.k}" value="${i+1}"> ${i+1} ${o}</label>`).join(' ');
        grid.appendChild(d);
      });
    }

    $(sel) { return document.querySelector(sel); }

    generateHTML() {
      return `<div class="sec"><h3>EQ-5D-3L</h3>
  <div class="form" id="eq5d"></div>
</div>
<div class="sec"><h3>EQ-VAS（0–100）</h3>
  <div class="form">
    <div class="field col-6"><label>今日健康狀態（0–100）</label><input id="eqVAS" type="range" min="0" max="100" step="1" value="50" oninput="eqVASVal.value=this.value"></div>
    <div class="field col-2"><label>數值</label><input id="eqVASVal" readonly value="50"></div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm11 = new CGAForm11();
  
  console.log('✅ CGAForm11 模組已載入');
})();
