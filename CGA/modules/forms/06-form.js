// CGA 表單模組 6: MoCA
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm06 {
    constructor() {
      this.id = 6;
      this.title = "MoCA";
    }

    compute() {
      let t = 0;
      this.$$('.moca.visu,.moca.name,.moca.attn,.moca.lang,.moca.abst,.moca.ori').forEach(x => {
        t += parseInt(this.nv(x) || '0', 10) || 0;
      });
      t += parseInt(this.nv(this.$('#mocaRecall')) || '0', 10) || 0;
      
      const eduMap = {'不識字': 1, '識字未就學': 1, '國小': 1, '國中': 1, '高中': 1, '大專以上': 0};
      const bonus = eduMap[this.nv(this.$('#edu'))];
      const eduBonus = this.$('#eduBonus');
      if (eduBonus) eduBonus.value = (bonus === undefined) ? '' : String(bonus);
      if (bonus !== undefined) t += bonus;
      
      const mocaTotal = this.$('#mocaTotal');
      if (mocaTotal) mocaTotal.textContent = t;
    }

    $(sel) { return document.querySelector(sel); }
    $$(sel) { return document.querySelectorAll(sel); }
    nv(el) { return el ? el.value.trim() : ''; }

    generateHTML() {
      return `<div class="sec"><h3>MoCA（0–30） <span class="badge">總分：<span id="mocaTotal">0</span>/30</span></h3>
  <div class="form">
    <div class="col-12"><b>視空/執行（5）</b></div>
    <div class="field"><label>連線</label><select class="moca visu" data-max="1"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>立方體</label><select class="moca visu" data-max="1"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>時鐘–外框</label><select class="moca visu" data-max="1"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>時鐘–數字</label><select class="moca visu" data-max="1"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>時鐘–指針</label><select class="moca visu" data-max="1"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>命名（3）</b></div>
    <div class="field"><label>動物 1</label><select class="moca name"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>動物 2</label><select class="moca name"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>動物 3</label><select class="moca name"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>注意力（6）</b></div>
    <div class="field"><label>順背</label><select class="moca attn"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>倒背</label><select class="moca attn"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>Vigilance</label><select class="moca attn"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>減七 1</label><select class="moca attn"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>減七 2</label><select class="moca attn"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>減七 3</label><select class="moca attn"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>語言（3）</b></div>
    <div class="field"><label>覆誦 1</label><select class="moca lang"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>覆誦 2</label><select class="moca lang"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>語詞流暢</label><select class="moca lang"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>抽象（2）</b></div>
    <div class="field"><label>相似 1</label><select class="moca abst"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>相似 2</label><select class="moca abst"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>延遲回憶（0–5）</b></div>
    <div class="field"><label>五詞</label><select id="mocaRecall"><option></option><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>

    <div class="col-12"><b>定向（6）</b></div>
    <div class="field"><label>日期</label><select class="moca ori"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>月份</label><select class="moca ori"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>年份</label><select class="moca ori"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>星期</label><select class="moca ori"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>地點</label><select class="moca ori"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>城市</label><select class="moca ori"><option></option><option>0</option><option>1</option></select></div>

    <div class="field"><label>教育加分（≤12 年 +1）</label><input id="eduBonus" readonly></div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm06 = new CGAForm06();
  
  console.log('✅ CGAForm06 模組已載入');
})();
