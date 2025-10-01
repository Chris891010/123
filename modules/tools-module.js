// 工具庫模組 - 事件通信版本 (tools-module.js)
// 這個模組負責生成UI並通過事件與主頁面通信

(function() {
  'use strict';

  // 工具庫模組類
  class ToolsModule {
    constructor() {
      this.activeCat = 'all';
      this.registeredTools = new Map(); // 新增：註冊的工具
      // 工具配置：添加 module 指向檔案路徑，實現通用載入
      this.tools = [
        {id:'sp3e',title:'3E 安全移位臨床路徑',desc:'站-轉/動力站立/全身吊帶 決策提示＋檢核',cats:['form','education'],module:'./modules/form/sp3e.js',className:'Tool3E'},
        {id:'es3c',title:'3C 床邊環境安全巡檢表',desc:'房/床巡檢，指派與備註',cats:['form','management'],module:'./modules/form/es3c.js',className:'ES3C'},
        {id:'mc2g',title:'2G 變革管理檢核表',desc:'Managing Change Checklist（季檢視）',cats:['management','form'],module:'./modules/management/2g.js',className:'Tool2G'},
        {id:'cp3a',title:'3A 跌倒照護流程圖',desc:'住院病人臨床路徑＋完成檢核',cats:['form','management'],module:'./modules/form/3a.js',className:'Tool3A'},
        {id:'fk2e',title:'2E 防跌知識測驗',desc:'員工防跌知識多選題，自動計分',cats:['assessment','education'],module:'./modules/assessment/2e.js',className:'Tool2E'},
        {id:'stratify',title:'STRATIFY 量表',desc:'入院/轉床篩檢',cats:['assessment'],module:'./modules/assessment/stratify.js',className:'ToolSTRATIFY'},
        {id:'morse',title:'Morse Fall Scale',desc:'住院常用風險分級',cats:['assessment'],module:'./modules/assessment/morse.js',className:'ToolMorse'},
        {id:'huddle',title:'Post-Fall Huddle',desc:'事件後快速會議',cats:['form'],module:'./modules/form/huddle.js',className:'ToolHuddle'},
        {id:'rca',title:'RCA 根因分析',desc:'原因分析與改善',cats:['form','management'],module:'./modules/form/rca.js',className:'ToolRCA'},
        {id:'resource1e',title:'Resource Needs（1E）＋設備盤點',desc:'資源盤點與 Smart Tech 設備盤點',cats:['management'],action:'openResource1E'},
        {id:'leadership1c',title:'Management Support（1C）',desc:'管理支持度檢核',cats:['management'],action:'openLeadership1C'},
        {id:'org1f',title:'Organizational Readiness（1F）',desc:'組織準備度檢核（含 Smart Tech 備註）',cats:['management'],action:'openOrganizational1F'},
        {id:'qi2b',title:'Quality Improvement（2B）',desc:'品質改善流程檢核（PDCA）',cats:['management'],module:'./modules/management/2b.js',className:'Tool2B'},
        {id:'stakeholder',title:'Stakeholder Analysis（1B）',desc:'利害關係人與溝通',cats:['management','form'],action:'openStakeholder'}
      ];
    }

    // 生成工具庫HTML
    generateHTML(filter = null) {
      if (filter) {
        this.activeCat = filter;
      }

      const html = `
        <div class="row" style="justify-content:space-between">
          <h2>工具庫</h2>
          <div class="search" style="min-width:280px">
            <input id="tools-search" type="search" placeholder="搜尋：2B 品質改善、1F 準備度、1E 設備盤點…" 
                   onkeyup="ToolsModuleAPI.handleSearch(this.value)"/>
          </div>
        </div>
        <div class="filter-pills">
          <button class="pill ${this.activeCat === 'all' ? 'active' : ''}" data-cat="all" 
                  onclick="ToolsModuleAPI.handleFilter('all')">全部</button>
          <button class="pill ${this.activeCat === 'assessment' ? 'active' : ''}" data-cat="assessment" 
                  onclick="ToolsModuleAPI.handleFilter('assessment')">量表/評估</button>
          <button class="pill ${this.activeCat === 'form' ? 'active' : ''}" data-cat="form" 
                  onclick="ToolsModuleAPI.handleFilter('form')">流程/表單</button>
          <button class="pill ${this.activeCat === 'management' ? 'active' : ''}" data-cat="management" 
                  onclick="ToolsModuleAPI.handleFilter('management')">管理/治理</button>
          <button class="pill ${this.activeCat === 'patient' ? 'active' : ''}" data-cat="patient" 
                  onclick="ToolsModuleAPI.handleFilter('patient')">病人/家屬</button>
        </div>
        <div id="tools-list" class="grid cols-4">
          ${this.generateToolsHTML()}
        </div>
      `;

      return html;
    }

    // 生成工具列表HTML
    generateToolsHTML(searchQuery = '') {
      const query = searchQuery.toLowerCase();
      
      const filteredTools = this.tools.filter(tool => {
        const categoryMatch = (this.activeCat === 'all') || tool.cats.includes(this.activeCat);
        const keywordMatch = !query || 
                            tool.title.toLowerCase().includes(query) || 
                            tool.desc.toLowerCase().includes(query);
        return categoryMatch && keywordMatch;
      });

      if (filteredTools.length === 0) {
        return '<div class="card"><h3>沒有找到符合條件的工具</h3><div class="small">請嘗試調整搜尋條件或篩選分類</div></div>';
      }

      return filteredTools.map(tool => {
        // 決定動作：優先使用 module，其次使用 action
        let actionValue = 'none';
        if (tool.module) {
          actionValue = tool.id; // 使用工具 ID 作為動作識別
        } else if (tool.action) {
          actionValue = tool.action; // 保持舊有 action 邏輯
        }
        
        return `
        <div class="card">
          <h3>${tool.title}</h3>
          <div class="small">${tool.desc}</div>
          <button class="btn" onclick="ToolsModuleAPI.handleAction('${actionValue}', '${tool.title}')">
            使用
          </button>
        </div>
      `;
      }).join('');
    }

    // 更新工具列表
    updateToolsList(searchQuery = '') {
      const toolsListElement = document.getElementById('tools-list');
      if (toolsListElement) {
        toolsListElement.innerHTML = this.generateToolsHTML(searchQuery);
      }
    }

    // 設置篩選
    setFilter(category) {
      this.activeCat = category;
      
      // 更新按鈕狀態
      document.querySelectorAll('#view-tools .pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.cat === category);
      });

      // 更新工具列表
      this.updateToolsList();
    }

    // 通用工具載入方法
    loadTool(toolConfig) {
      console.log(`載入工具: ${toolConfig.title}`);
      
      // 檢查新註冊系統
      if (this.registeredTools.has(toolConfig.id)) {
        console.log(`${toolConfig.title} 已在註冊系統中，直接顯示`);
        this.showRegisteredTool(toolConfig.id);
        return;
      }
      
      // 檢查舊的className系統
      const globalClassName = toolConfig.className;
      if (globalClassName && typeof window[globalClassName] !== 'undefined') {
        console.log(`${toolConfig.title} 已載入，直接顯示`);
        this.showTool(toolConfig);
        return;
      }
      
      // 動態載入工具腳本
      const script = document.createElement('script');
      script.src = toolConfig.module;
      
      const self = this;
      script.onload = () => {
        console.log(`${toolConfig.title} 腳本載入成功`);
        // 給一點時間讓模組註冊
        setTimeout(() => {
          if (self.registeredTools.has(toolConfig.id)) {
            self.showRegisteredTool(toolConfig.id);
          } else {
            self.showTool(toolConfig);
          }
        }, 50);
      };
      
      script.onerror = () => {
        console.error(`無法載入 ${toolConfig.title} 腳本`);
        alert(`❌ 無法載入 ${toolConfig.title}，請檢查檔案路徑`);
      };
      
      document.head.appendChild(script);
    }

    // 顯示註冊的工具
    showRegisteredTool(toolId) {
      const tool = this.registeredTools.get(toolId);
      if (tool && tool.generateContent) {
        const container = document.getElementById('view-tools');
        if (container) {
          container.innerHTML = tool.generateContent();
        }
      }
    }

    // 註冊工具（供新模組使用）
    registerTool(toolConfig) {
      console.log(`註冊工具: ${toolConfig.title}`);
      this.registeredTools.set(toolConfig.id, toolConfig);
    }

    // 通用工具顯示方法
    showTool(toolConfig) {
      const globalClassName = toolConfig.className;
      console.log(`開始顯示 ${toolConfig.title}, ${globalClassName} 類型:`, typeof window[globalClassName]);
      
      if (typeof window[globalClassName] === 'undefined') {
        console.error(`${toolConfig.title} 未正確載入`);
        alert(`❌ ${toolConfig.title} 載入失敗`);
        return;
      }
      
      // 使用工具庫容器顯示工具
      const toolsElement = document.getElementById('view-tools');
      
      if (!toolsElement) {
        console.error('找不到 view-tools 容器');
        alert('❌ 找不到顯示容器');
        return;
      }

      // 使用工具的 generateHTML 方法
      const toolInstance = window[globalClassName];
      if (toolInstance && typeof toolInstance.generateHTML === 'function') {
        toolsElement.innerHTML = toolInstance.generateHTML();
        console.log(`✅ ${toolConfig.title} 已顯示`);
      } else {
        console.error(`${toolConfig.title} 沒有 generateHTML 方法`);
        alert(`❌ ${toolConfig.title} 缺少必要的方法`);
      }
    }
  }

  // 全域API - 供主頁面調用
  window.ToolsModuleAPI = {
    instance: new ToolsModule(),

    // 請求生成工具庫HTML
    generateContent(filter = null) {
      console.log('生成工具庫內容，篩選:', filter);
      return this.instance.generateHTML(filter);
    },

    // 處理搜尋
    handleSearch(query) {
      console.log('搜尋:', query);
      this.instance.updateToolsList(query);
    },

    // 處理篩選
    handleFilter(category) {
      console.log('篩選分類:', category);
      this.instance.setFilter(category);
    },

    // 處理工具動作（通用方法）
    handleAction(actionName, toolTitle) {
      console.log('執行動作:', actionName, toolTitle);
      
      if (actionName === 'none') {
        alert(`${toolTitle} 功能尚未實現`);
        return;
      }

      // 查找工具配置
      const toolConfig = this.instance.tools.find(tool => 
        tool.action === actionName || 
        tool.id === actionName ||
        tool.id === actionName.replace('open', '').toLowerCase()
      );
      
      console.log('查找工具配置:', actionName, toolConfig);
      
      if (toolConfig && toolConfig.module) {
        // 使用通用載入方法
        console.log('找到工具配置，開始載入:', toolConfig.title);
        this.instance.loadTool(toolConfig);
        return;
      }

      // 通過事件通知主頁面執行對應功能（向下相容）
      const event = new CustomEvent('toolsModuleAction', {
        detail: { action: actionName, title: toolTitle }
      });
      document.dispatchEvent(event);
    },



    // 獲取工具數量（供主頁面查詢）
    getToolsCount() {
      return this.instance.tools.length;
    },

    // 獲取篩選後的工具數量
    getFilteredCount(category = null, searchQuery = '') {
      const cat = category || this.instance.activeCat;
      const query = searchQuery.toLowerCase();
      
      return this.instance.tools.filter(tool => {
        const categoryMatch = (cat === 'all') || tool.cats.includes(cat);
        const keywordMatch = !query || 
                            tool.title.toLowerCase().includes(query) || 
                            tool.desc.toLowerCase().includes(query);
        return categoryMatch && keywordMatch;
      }).length;
    },

    // 返回工具庫
    backToTools() {
      // 重新載入工具庫內容
      const toolsElement = document.getElementById('view-tools');
      if (toolsElement && window.ToolsModuleAPI) {
        toolsElement.innerHTML = window.ToolsModuleAPI.generateContent();
      }
    },

    // 通用工具載入方法
    loadTool(toolConfig) {
      return this.instance.loadTool(toolConfig);
    },

    // 通用工具顯示方法
    showTool(toolConfig) {
      return this.instance.showTool(toolConfig);
    },

    // 註冊工具（供新模組使用）
    registerTool(toolConfig) {
      return this.instance.registerTool(toolConfig);
    }
  };

  console.log('工具庫模組載入完成，包含', window.ToolsModuleAPI.getToolsCount(), '個工具');

})();