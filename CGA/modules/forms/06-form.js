// CGA 表單模組 6: MoCA
// 蒙特利爾認知評估

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
      return `
${MessageBoxBuilder.info(`
  <strong>📋 量表說明：蒙特利爾認知評估（MoCA）</strong><br>
  MoCA 是一個簡短的認知篩檢工具，用於檢測輕度認知功能障礙。<br>
  <strong>評分範圍：</strong>0-30 分｜<strong>建議切點：</strong>≤25 分為認知障礙<br>
  <strong>教育程度校正：</strong>教育年限 ≤12 年者加 1 分
`)}

<div class="sec">
  <h3>MoCA（0–30） <span class="badge">總分：<span id="mocaTotal">0</span>/30</span></h3>
  
  <div class="form">
    <div class="col-12"><b>視空間與執行功能（5 分）</b></div>
    ${DropdownBuilder.createScore({label: '連線測驗', max: 1, className: 'moca visu', dataMax: '1'})}
    ${DropdownBuilder.createScore({label: '立方體繪製', max: 1, className: 'moca visu', dataMax: '1'})}
    ${DropdownBuilder.createScore({label: '時鐘–外框', max: 1, className: 'moca visu', dataMax: '1'})}
    ${DropdownBuilder.createScore({label: '時鐘–數字', max: 1, className: 'moca visu', dataMax: '1'})}
    ${DropdownBuilder.createScore({label: '時鐘–指針', max: 1, className: 'moca visu', dataMax: '1'})}
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>命名（3 分）</b></div>
    ${DropdownBuilder.createScore({label: '動物 1（獅子）', max: 1, className: 'moca name'})}
    ${DropdownBuilder.createScore({label: '動物 2（犀牛）', max: 1, className: 'moca name'})}
    ${DropdownBuilder.createScore({label: '動物 3（駱駝）', max: 1, className: 'moca name'})}
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>注意力（6 分）</b></div>
    ${DropdownBuilder.createScore({label: '數字順背', max: 1, className: 'moca attn'})}
    ${DropdownBuilder.createScore({label: '數字倒背', max: 1, className: 'moca attn'})}
    ${DropdownBuilder.createScore({label: 'Vigilance（警覺）', max: 1, className: 'moca attn'})}
    ${DropdownBuilder.createScore({label: '減七 1（93）', max: 1, className: 'moca attn'})}
    ${DropdownBuilder.createScore({label: '減七 2（86）', max: 1, className: 'moca attn'})}
    ${DropdownBuilder.createScore({label: '減七 3（79）', max: 1, className: 'moca attn'})}
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>語言（3 分）</b></div>
    ${DropdownBuilder.createScore({label: '覆誦句子 1', max: 1, className: 'moca lang'})}
    ${DropdownBuilder.createScore({label: '覆誦句子 2', max: 1, className: 'moca lang'})}
    ${DropdownBuilder.createScore({label: '語詞流暢性', max: 1, className: 'moca lang'})}
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>抽象思考（2 分）</b></div>
    ${DropdownBuilder.createScore({label: '相似性 1（火車-腳踏車）', max: 1, className: 'moca abst'})}
    ${DropdownBuilder.createScore({label: '相似性 2（手錶-尺）', max: 1, className: 'moca abst'})}
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>延遲回憶（5 分）</b></div>
    <div class="field col-6">
      <label>回憶詞彙數（臉、絲、教堂、雛菊、紅）</label>
      ${DropdownBuilder.createScore({id: 'mocaRecall', max: 5})}
    </div>
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>定向（6 分）</b></div>
    ${DropdownBuilder.createScore({label: '日期', max: 1, className: 'moca ori'})}
    ${DropdownBuilder.createScore({label: '月份', max: 1, className: 'moca ori'})}
    ${DropdownBuilder.createScore({label: '年份', max: 1, className: 'moca ori'})}
    ${DropdownBuilder.createScore({label: '星期', max: 1, className: 'moca ori'})}
    ${DropdownBuilder.createScore({label: '地點', max: 1, className: 'moca ori'})}
    ${DropdownBuilder.createScore({label: '城市', max: 1, className: 'moca ori'})}
  </div>

  <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #ddd;">

  <div class="form">
    <div class="col-12"><b>教育程度校正</b></div>
    <div class="field col-6"><label>教育加分（≤12 年 +1）</label><input id="eduBonus" readonly></div>
  </div>
</div>

${MessageBoxBuilder.success(`
  <strong>✅ 評估結果解讀：</strong><br>
  <strong>26-30 分：</strong>正常認知功能<br>
  <strong>18-25 分：</strong>輕度認知障礙<br>
  <strong>10-17 分：</strong>中度認知障礙<br>
  <strong>＜10 分：</strong>嚴重認知障礙
`)}
`;
    }

    initialize() {
      // 使用 AutoNextField 啟用自動跳轉功能
      if (window.AutoNextField) {
        window.AutoNextField.enableForForm(5, {
          delay: 100,
          autoExpand: true
        });
        console.log('✅ Form 06 自動跳轉已啟用');
      }
    }
  }

  // 註冊到全域
  window.CGAForm06 = new CGAForm06();
  
  console.log('✅ CGAForm06 模組已載入');
})();
