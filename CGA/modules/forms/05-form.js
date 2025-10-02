// CGA 表單模組 5: Mini-Cog / MMSE
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm05 {
    constructor() {
      this.id = 5;
      this.title = "Mini-Cog / MMSE";
    }

    compute() {
      // Mini-Cog
      const r = this.num(this.$('#miniRecall')) || 0;
      const c = parseInt(this.nv(this.$('#miniCDT')) || '0', 10) || 0;
      const t = r + c;
      const miniTotal = this.$('#miniTotal');
      if (miniTotal) miniTotal.value = t;

      // MMSE
      let s = 0;
      this.$$('.mmse.time').forEach(x => s += parseInt(this.nv(x) || '0', 10) || 0);
      this.$$('.mmse.place').forEach(x => s += parseInt(this.nv(x) || '0', 10) || 0);
      this.$$('.mmse.reg').forEach(x => s += parseInt(this.nv(x) || '0', 10) || 0);
      s += parseInt(this.nv(this.$('#mmseSerial')) || '0', 10) || 0;
      s += parseInt(this.nv(this.$('#mmseRecall')) || '0', 10) || 0;
      ['name', 'rep', 'step3', 'read', 'write', 'copy'].forEach(cls => {
        const el = this.$('.mmse.' + cls);
        if (el) s += parseInt(this.nv(el) || '0', 10) || 0;
      });
      const mmseTotal = this.$('#mmseTotal');
      if (mmseTotal) mmseTotal.textContent = s;
    }

    $(sel) { return document.querySelector(sel); }
    $$(sel) { return document.querySelectorAll(sel); }
    nv(el) { return el ? el.value.trim() : ''; }
    num(el) { const v = parseFloat(this.nv(el)); return isNaN(v) ? null : v; }

    generateHTML() {
      return `<div class="sec">
  <h3>Mini-Cog（0–5） + 畫時鐘試驗（CDT）</h3>
  <div class="pop">指引：請說出 3 個不相關名詞→分心作業→畫時鐘「10:10」→回憶 3 詞。總分=回憶(0–3)+CDT(0/2)。</div>
  <div class="form">
    <div class="field"><label>回憶（0–3）</label><input id="miniRecall" type="number" min="0" max="3"></div>
    <div class="field"><label>CDT（0=異常/1=部分/2=正常）</label>
      <select id="miniCDT"><option></option><option value="0">0 異常</option><option value="1">1 部分</option><option value="2">2 正常</option></select></div>
    <div class="field"><label>總分</label><input id="miniTotal" readonly></div>
    <div class="field"><label>Mini-Cog 判讀</label>
      <select id="miniBinary"><option></option><option>0 正常</option><option>1 異常</option><option>9 拒絕</option><option>999 無法評估</option></select></div>
  </div>
</div>

<div class="sec"><h3>MMSE（逐題；預設空白） <span class="badge">總分：<span id="mmseTotal">0</span>/30</span></h3>
  <div class="form">
    <div class="col-12"><b>定向力 – 時間（5）</b></div>
    <div class="field"><label>年</label><select class="mmse time"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>月</label><select class="mmse time"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>日</label><select class="mmse time"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>星期</label><select class="mmse time"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>季節</label><select class="mmse time"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>定向力 – 地點（5）</b></div>
    <div class="field"><label>國家/城市</label><select class="mmse place"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>縣市/區</label><select class="mmse place"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>醫院/機構</label><select class="mmse place"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>科別/病房</label><select class="mmse place"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>樓層</label><select class="mmse place"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>登錄（3）</b></div>
    <div class="field"><label>詞 1</label><select class="mmse reg"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>詞 2</label><select class="mmse reg"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>詞 3</label><select class="mmse reg"><option></option><option>0</option><option>1</option></select></div>

    <div class="col-12"><b>系列減七（0–5）</b></div>
    <div class="field"><label>正確題數</label><select id="mmseSerial"><option></option><option>0</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select></div>

    <div class="col-12"><b>延遲回憶（0–3）</b></div>
    <div class="field"><label>回憶分數</label><select id="mmseRecall"><option></option><option>0</option><option>1</option><option>2</option><option>3</option></select></div>

    <div class="col-12"><b>語言/指令（8）</b></div>
    <div class="field"><label>命名兩物（0–2）</label><select class="mmse name"><option></option><option>0</option><option>1</option><option>2</option></select></div>
    <div class="field"><label>覆誦（0–1）</label><select class="mmse rep"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>三段指令（0–3）</label><select class="mmse step3"><option></option><option>0</option><option>1</option><option>2</option><option>3</option></select></div>
    <div class="field"><label>閱讀（0–1）</label><select class="mmse read"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>書寫（0–1）</label><select class="mmse write"><option></option><option>0</option><option>1</option></select></div>
    <div class="field"><label>摹寫（0–1）</label><select class="mmse copy"><option></option><option>0</option><option>1</option></select></div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm05 = new CGAForm05();
  
  console.log('✅ CGAForm05 模組已載入');
})();
