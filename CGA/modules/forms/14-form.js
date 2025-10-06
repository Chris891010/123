// ============================================================================
// CGA 表單模組 14: 出院規劃與後續照護
// ============================================================================

(function() {
  'use strict';

  class CGAForm14 {
    constructor() {
      this.id = 14;
      this.title = "出院規劃與後續照護";
    }

    generateHTML() {
      return `
<!-- ========================================
     出院去向與安排
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">🏠</span> 
    出院去向與安排
  </h3>
  
  <div class="form" style="margin-top: 1rem;">
    ${DropdownBuilder.createMultiple([
      {
        id: 'dischargeDestination',
        label: '出院去向',
        colSpan: 'col-6',
        options: [
          '返家（無需額外服務）',
          '返家（需居家服務）',
          '返家（需居家護理）',
          '返家（需居家復健）',
          '轉介長期照護機構',
          '轉介護理之家',
          '轉介安寧療護',
          '轉院',
          '其他'
        ]
      },
      {
        id: 'dischargeDate',
        label: '預計出院日期',
        colSpan: 'col-6',
        options: ['今日', '明日', '2-3 日內', '一週內', '待評估']
      }
    ])}
  </div>
</div>

<!-- ========================================
     功能狀態與照顧需求
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📊</span> 
    功能狀態與照顧需求
  </h3>
  
  <div class="form" style="margin-top: 1rem;">
    ${DropdownBuilder.createMultiple([
      {
        id: 'functionalStatus',
        label: '整體功能狀態（相較入院時）',
        colSpan: 'col-6',
        options: [
          '明顯改善',
          '略有改善',
          '維持穩定',
          '略有退化',
          '明顯退化'
        ]
      },
      {
        id: 'careLevel',
        label: '所需照顧程度',
        colSpan: 'col-6',
        options: [
          '完全獨立',
          '需部分協助',
          '需大部分協助',
          '完全依賴',
          '需專業照護'
        ]
      },
      {
        id: 'mobilityAid',
        label: '行動輔具需求',
        colSpan: 'col-6',
        options: [
          '無需輔具',
          '拐杖',
          '助行器',
          '輪椅',
          '電動輪椅',
          '其他'
        ]
      },
      {
        id: 'homeModification',
        label: '居家環境改善建議',
        colSpan: 'col-6',
        options: [
          '無需改善',
          '加裝扶手',
          '移除障礙物',
          '改善照明',
          '防滑措施',
          '其他'
        ]
      }
    ])}
  </div>
</div>

<!-- ========================================
     醫療決策與照護計畫
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">📝</span> 
    醫療決策與照護計畫
  </h3>
  
  <div class="form" style="margin-top: 1rem;">
    ${DropdownBuilder.createMultiple([
      {
        id: 'dnrStatus',
        label: 'DNR（不施行心肺復甦術）意願',
        colSpan: 'col-6',
        options: [
          '無簽署',
          '已簽署 DNR',
          '已簽署 DNR + 安寧緩和醫療',
          '家屬意見分歧',
          '待討論'
        ]
      },
      {
        id: 'advanceDirective',
        label: '預立醫療決定（AD）',
        colSpan: 'col-6',
        options: [
          '無',
          '已完成預立醫療照護諮商（ACP）',
          '已簽署預立醫療決定書',
          '規劃中',
          '家屬不同意討論'
        ]
      }
    ])}
  </div>
</div>

<!-- ========================================
     出院衛教與追蹤計畫
     ======================================== -->
<div class="sec">
  <h3>
    <span style="font-size: 1.5rem;">🎓</span> 
    出院衛教與追蹤計畫
  </h3>
  
  ${MessageBoxBuilder.info('請填寫主要的出院衛教內容與後續追蹤安排。')}
  
  <div class="form" style="margin-top: 1rem;">
    <div class="field col-12">
      <label style="font-weight: 600;">主要出院衛教內容</label>
      <textarea id="dischargeEducation" 
                rows="4" 
                placeholder="例如：用藥指導、飲食控制、傷口照護、復健運動、居家安全注意事項等"
                style="width: 100%; padding: 0.75rem; border: 2px solid var(--line); border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
    </div>
    
    <div class="field col-12">
      <label style="font-weight: 600;">後續追蹤與轉介安排</label>
      <textarea id="followUpPlan" 
                rows="3" 
                placeholder="例如：門診追蹤時間、居家護理安排、復健療程、長照資源轉介等"
                style="width: 100%; padding: 0.75rem; border: 2px solid var(--line); border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
    </div>
    
    <div class="field col-12">
      <label style="font-weight: 600;">其他備註</label>
      <textarea id="dischargeNotes" 
                rows="3" 
                placeholder="其他需要特別注意或交代的事項"
                style="width: 100%; padding: 0.75rem; border: 2px solid var(--line); border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
    </div>
  </div>
</div>`;
    }

    /**
     * 初始化表單
     */
    initialize() {
      console.log('🔧 初始化 Form 14 (出院規劃與後續照護)');
      
      // 啟用自動跳到下一欄功能
      if (window.AutoNextField) {
        window.AutoNextField.enableForForm(13, {
          delay: 100,
          autoExpand: true
        });
        console.log('✅ Form 14 自動跳轉已啟用');
      }
      
      console.log('✅ 出院規劃與後續照護已初始化');
    }
  }

  // 註冊到全域
  window.CGAForm14 = new CGAForm14();
  
  console.log('✅ CGAForm14 模組已載入');
})();
