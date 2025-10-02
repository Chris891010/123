// CGA 表單模組 9: 行動/肌少（CHS）
// 自動生成，請勿手動編輯

(function() {
  'use strict';

  class CGAForm09 {
    constructor() {
      this.id = 9;
      this.title = "行動/肌少（CHS）";
    }

    compute() {
      // 行動功能
      const gsSec = this.$('#gsSec');
      const gsVal = this.num(gsSec);
      const gaitSpeed = this.$('#gaitSpeed');
      if (gaitSpeed) {
        gaitSpeed.value = (gsVal && gsVal > 0) ? (4 / gsVal).toFixed(2) : '';
      }

      const grip1 = this.num(this.$('#grip1'));
      const grip2 = this.num(this.$('#grip2'));
      const grip3 = this.num(this.$('#grip3'));
      const arr = [grip1, grip2, grip3].filter(x => x != null);
      const gripMax = this.$('#gripMax');
      if (gripMax) {
        gripMax.value = arr.length ? Math.max(...arr).toFixed(1) : '';
      }

      const flags = this.$('#mobFlags');
      if (flags) {
        flags.innerHTML = '';
        const sp = parseFloat(gaitSpeed ? gaitSpeed.value : '');
        if (sp && sp < 0.8) this.tag(flags, '步速 <0.8 m/s');
        
        const tug = this.num(this.$('#tug'));
        if (tug != null && tug >= 20) this.tag(flags, 'TUG ≥20s');
        
        const gmax = parseFloat(gripMax ? gripMax.value : '');
        const sex = this.nv(this.$('#sex'));
        if (gmax && ((sex === '男' && gmax < 26) || (sex === '女' && gmax < 18))) {
          this.tag(flags, '握力偏低');
        }
        
        const fallCnt = this.$('#fallCnt');
        const falls = parseInt(this.nv(fallCnt) || '0', 10) || 0;
        if (falls >= 2) this.tag(flags, '近一年跌倒 ≥2');
      }

      // CHS
      const vals = ['#chsWeak', '#chsSlow', '#chsWL', '#chsExh', '#chsLow'].map(id => {
        const el = this.$(id);
        return parseInt((this.nv(el).match(/\d+/) || ['0'])[0], 10) || 0;
      });
      const t = vals.reduce((a, b) => a + b, 0);
      const chsTotal = this.$('#chsTotal');
      const chsResult = this.$('#chsResult');
      if (chsTotal) chsTotal.textContent = t;
      if (chsResult) chsResult.value = t >= 3 ? '衰弱' : t >= 1 ? '前衰弱' : '健壯';
    }

    $(sel) { return document.querySelector(sel); }
    nv(el) { return el ? el.value.trim() : ''; }
    num(el) { const v = parseFloat(this.nv(el)); return isNaN(v) ? null : v; }
    tag(parent, txt) {
      if (!parent) return;
      const s = document.createElement('span');
      s.className = 'badge tag';
      s.textContent = txt;
      parent.appendChild(s);
    }

    generateHTML() {
      return `<div class="sec"><h3>行動功能</h3>
  <div class="form">
    <div class="field"><label>TUG（秒）</label><input id="tug" type="number" step="0.1"></div>
    <div class="field"><label>4 公尺（秒）</label><input id="gsSec" type="number" step="0.1"></div>
    <div class="field"><label>步速（m/s）</label><input id="gaitSpeed" readonly></div>
    <div class="field"><label>近一年跌倒（次）</label><input id="falls" type="number" min="0"></div>
    <div class="field"><label>慣用手</label><select id="gripHand"><option></option><option>右</option><option>左</option></select></div>
    <div class="field"><label>握力 1（kg）</label><input id="grip1" type="number" step="0.1"></div>
    <div class="field"><label>握力 2（kg）</label><input id="grip2" type="number" step="0.1"></div>
    <div class="field"><label>握力 3（kg）</label><input id="grip3" type="number" step="0.1"></div>
    <div class="field"><label>握力最大（kg）</label><input id="gripMax" readonly></div>
    <div class="field"><label>CFS（1–9）</label><select id="cfs"><option></option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option></select></div>
  </div>
  <div id="mobFlags"></div>
</div>

<div class="sec"><h3>CHS（衰弱五指標） <span class="badge">總分：<span id="chsTotal">0</span>/5</span></h3>
  <div class="form">
    <div class="field col-6"><label>握力低下（Weakness）</label><select id="chsWeak"><option></option><option>0 正常</option><option>1 異常</option></select></div>
    <div class="field col-6"><label>步行緩慢（Slowness）</label><select id="chsSlow"><option></option><option>0 小於門檻</option><option>1 大於門檻</option></select></div>
    <div class="field col-6"><label>體重減輕（≥5kg/年）</label><select id="chsWL"><option></option><option>0 無</option><option>1 有</option></select></div>
    <div class="field col-6"><label>易疲勞（Exhaustion）</label><select id="chsExh"><option></option><option>0 無</option><option>1 有</option></select></div>
    <div class="field col-6"><label>低活動量</label><select id="chsLow"><option></option><option>0 高於標準</option><option>1 低於標準</option></select></div>
    <div class="field col-6"><label>結論</label><input id="chsResult" readonly></div>
  </div>
</div>`;
    }
  }

  // 註冊到全域
  window.CGAForm09 = new CGAForm09();
  
  console.log('✅ CGAForm09 模組已載入');
})();
