// CGA 表單模組 7: GDS-5 / CAM / Braden
// 包含表單 HTML 和計算邏輯

(function() {
  'use strict';

  class CGAForm07 {
    constructor() {
      this.id = 7;
      this.title = "GDS-5 / CAM / Braden";
      
      // GDS-5 憂鬱量表定義
      this.GDS5 = [
        {n:1, txt:'過去一星期，基本上，您對現在的生活滿意嗎？', rev:true},
        {n:2, txt:'您是否常感到厭煩？'},
        {n:3, txt:'您是否經常感到無助做什麼都沒有用？'},
        {n:4, txt:'您是否比較樂於在家裡而較不喜歡外出？'},
        {n:5, txt:'您是否感覺現在生活得很沒有價值？'}
      ];
      
      // Braden 壓傷量表定義
      this.BRADEN = [
        {k:'sensory', t:'感覺知覺'},
        {k:'moist', t:'濕度'},
        {k:'activity', t:'活動'},
        {k:'mobility', t:'移動'},
        {k:'nutrition', t:'營養'},
        {k:'friction', t:'摩擦/剪力'}
      ];
    }
    
    // 輔助函數
    $(selector) {
      return document.querySelector(selector);
    }
    
    nv(el) {
      return (el?.value ?? '').trim();
    }
    
    tag(wrap, txt) {
      const t = document.createElement('span');
      t.className = 'tag';
      t.textContent = txt;
      wrap.appendChild(t);
    }

    generateHTML() {
      return `<div class="sec"><h3>GDS-5 老年憂鬱量表 <span class="badge">總分：<span id="gdsTotal">0</span>/5</span></h3>
  <table class="table"><thead><tr><th>#</th><th>題目</th><th>是/否</th></tr></thead><tbody id="gdsBody"></tbody></table>
  <div id="gdsFlags"></div>
</div>

<div class="sec"><h3>CAM 譫妄評估</h3>
  <div class="pop">條件：①急性起病/波動 + ②注意力不集中 + (③思維紊亂 或 ④意識改變) ⇒ 譫妄。</div>
  <div class="form">
    <div class="field col-6"><label>① 急性起病或波動</label><select id="cam1"><option></option><option>否</option><option>是</option></select></div>
    <div class="field col-6"><label>② 注意力不集中</label><select id="cam2"><option></option><option>否</option><option>是</option></select></div>
    <div class="field col-6"><label>③ 思維紊亂</label><select id="cam3"><option></option><option>否</option><option>是</option></select></div>
    <div class="field col-6"><label>④ 意識改變</label><select id="cam4"><option></option><option>否</option><option>是</option></select></div>
    <div class="field col-6"><label>結論</label><input id="camResult" readonly></div>
  </div>
</div>

<div class="sec"><h3>Braden 壓傷風險（6–23） <span class="badge">總分：<span id="bradenTotal">0</span></span></h3>
  <div class="form" id="bradenGrid"></div>
  <div id="bradenFlags"></div>
</div>`;
    }
    
    // 初始化：建立動態表格
    initialize() {
      // 初始化 GDS-5 表格
      const gdsBody = this.$('#gdsBody');
      if (gdsBody) {
        gdsBody.innerHTML = '';
        this.GDS5.forEach(it => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td>${it.n}</td><td>${it.txt}</td><td><label class="tag"><input type="radio" name="gds${it.n}" value="Y"> 是</label><label class="tag"><input type="radio" name="gds${it.n}" value="N"> 否</label></td>`;
          gdsBody.appendChild(tr);
        });
      }
      
      // 初始化 Braden 表格
      const bradenGrid = this.$('#bradenGrid');
      if (bradenGrid) {
        bradenGrid.innerHTML = '';
        this.BRADEN.forEach(it => {
          const d = document.createElement('div');
          d.className = 'field col-4';
          d.innerHTML = `<label>${it.t}（1–4）</label><select class="braden" data-k="${it.k}"><option></option><option>1</option><option>2</option><option>3</option><option>4</option></select>`;
          bradenGrid.appendChild(d);
        });
      }
      
      console.log('✅ GDS/CAM/Braden 表格已初始化');
    }
    
    // 計算分數
    compute() {
      // 計算 GDS-5
      const gdsTotal = this.$('#gdsTotal');
      if (gdsTotal) {
        let t = 0;
        this.GDS5.forEach(it => {
          const sel = this.$(`input[name="gds${it.n}"]:checked`);
          const v = sel ? sel.value : '';
          if (!v) return;
          t += it.rev ? (v === 'N' ? 1 : 0) : (v === 'Y' ? 1 : 0);
        });
        gdsTotal.textContent = t;
        
        const gdsFlags = this.$('#gdsFlags');
        if (gdsFlags) {
          gdsFlags.innerHTML = '';
          if (t >= 2) this.tag(gdsFlags, 'GDS-5 ≥2 可能憂鬱');
        }
      }
      
      // 計算 CAM
      const camResult = this.$('#camResult');
      if (camResult) {
        const v = [
          this.nv(this.$('#cam1')) === '是',
          this.nv(this.$('#cam2')) === '是',
          this.nv(this.$('#cam3')) === '是',
          this.nv(this.$('#cam4')) === '是'
        ];
        const pos = v[0] && v[1] && (v[2] || v[3]);
        const cam1 = this.$('#cam1');
        const hasEmpty = !cam1 || [1,2,3,4].some(i => !this.nv(this.$(`#cam${i}`)));
        camResult.value = hasEmpty ? '' : (pos ? '譫妄' : '非譫妄');
      }
      
      // 計算 Braden
      const bradenTotal = this.$('#bradenTotal');
      if (bradenTotal) {
        let t = 0, ok = 0;
        const bradenInputs = document.querySelectorAll('.braden');
        bradenInputs.forEach(s => {
          const v = parseInt(this.nv(s) || '0', 10) || 0;
          if (v) { t += v; ok++; }
        });
        bradenTotal.textContent = t || 0;
        
        const bradenFlags = this.$('#bradenFlags');
        if (bradenFlags) {
          bradenFlags.innerHTML = '';
          if (ok === 6) {
            if (t <= 12) this.tag(bradenFlags, '高風險（≤12）');
            else if (t <= 16) this.tag(bradenFlags, '中度風險（13–16）');
            else this.tag(bradenFlags, '低風險');
          }
        }
      }
    }
  }

  // 註冊到全域
  window.CGAForm07 = new CGAForm07();
  
  console.log('✅ CGAForm07 模組已載入');
})();
