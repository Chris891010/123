// CGA 表單模組 14: 出院狀況
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm14 {
    constructor() {
      this.id = 14;
      this.title = "出院狀況";
    }

    generateHTML() {
      return `<div class="sec"><h3>出院狀況</h3>
  <div class="form">
    <div class="field"><label>出院去向</label><select id="dcDest"><option></option><option>返家</option><option>返家（居服/復健）</option><option>轉介機構</option><option>安寧/長照機構</option><option>其他</option></select></div>
    <div class="field"><label>功能與照顧需求</label><select id="dcNeed"><option></option><option>維持</option><option>改善</option><option>惡化</option></select></div>
    <div class="field"><label>DNR/AD 註記</label><select id="dcAD"><option></option><option>無</option><option>有</option></select></div>
    <div class="field col-6"><label>主要出院衛教</label><input id="dcEdu"></div>
    <div class="field col-12"><label>備註</label><input id="dcNote"></div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm14 = new CGAForm14();
  
  console.log('✅ CGAForm14 模組已載入');
})();
