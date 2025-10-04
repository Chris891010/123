// ============================================================================
// 選擇題卡片建構器 (ChoiceCardBuilder)
// ============================================================================
// 用於建立卡片式選擇題佈局（單選按鈕形式）
// 適用於 ADL、IADL 等評估量表
// ============================================================================

(function() {
  'use strict';

  class ChoiceCardBuilder {
    constructor(options = {}) {
      this.options = {
        columns: options.columns || 2,  // 欄位數量
        gap: options.gap || '1.5rem',   // 卡片間距
        showScore: options.showScore !== false,  // 是否顯示分數
        mobileBreakpoint: options.mobileBreakpoint || 768,  // 手機斷點
        ...options
      };
    }

    /**
     * 建立卡片式表單容器
     * @param {Array} items - 項目陣列，每個項目包含 {k: key, t: title, opts: options, skip: boolean}
     * @param {string} namePrefix - radio name 前綴 (例如 'adl' 或 'iadl')
     * @param {HTMLElement} container - 容器元素
     * @returns {HTMLElement} - 建立的網格容器
     */
    build(items, namePrefix, container) {
      if (!container) return null;
      
      container.innerHTML = '';
      
      // 建立網格容器
      const gridContainer = document.createElement('div');
      gridContainer.style.cssText = `display: grid; grid-template-columns: repeat(${this.options.columns}, 1fr); gap: ${this.options.gap};`;
      
      items.forEach((item, index) => {
        const card = this.createCard(item, index, namePrefix);
        gridContainer.appendChild(card);
      });
      
      container.appendChild(gridContainer);
      
      // 響應式調整
      this.setupResponsive(gridContainer);
      
      return gridContainer;
    }

    /**
     * 建立單個卡片
     */
    createCard(item, index, namePrefix) {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--surface); border: 2px solid var(--line); border-radius: 12px; padding: 1.25rem;';
      
      // 標題區域
      const header = this.createHeader(item, index, namePrefix);
      card.appendChild(header);
      
      // 選項區域
      const optionsContainer = this.createOptions(item, namePrefix);
      card.appendChild(optionsContainer);
      
      return card;
    }

    /**
     * 建立卡片標題
     */
    createHeader(item, index, namePrefix) {
      const header = document.createElement('div');
      header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--line);';
      
      const titleHtml = item.skip 
        ? `${index + 1}. ${item.t} <span style="color: var(--muted); font-size: 0.875rem; font-weight: 400;">(男性可跳過)</span>`
        : `${index + 1}. ${item.t}`;
      
      const scoreHtml = this.options.showScore 
        ? `<span id="${namePrefix}_${item.k}" style="font-size: 1.25rem; font-weight: 700; color: var(--brand);">0</span>`
        : '';
      
      header.innerHTML = `
        <span style="font-weight: 700; color: var(--brand); font-size: 1rem;">${titleHtml}</span>
        ${scoreHtml}
      `;
      
      return header;
    }

    /**
     * 建立選項容器
     */
    createOptions(item, namePrefix) {
      const optionsContainer = document.createElement('div');
      optionsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem;';
      
      item.opts.forEach((option, optIndex) => {
        const optionLabel = this.createOptionLabel(item, option, optIndex, namePrefix);
        optionsContainer.appendChild(optionLabel);
      });
      
      return optionsContainer;
    }

    /**
     * 建立單個選項標籤
     */
    createOptionLabel(item, option, optIndex, namePrefix) {
      const optionLabel = document.createElement('label');
      optionLabel.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border-radius: 8px; cursor: pointer; border: 2px solid var(--line); transition: 0.2s;';
      
      // 取得分數和文字
      const score = this.getScore(option, optIndex);
      const text = this.getText(option);
      
      // 建立 HTML
      const skipAttr = item.skip ? `data-skip="1"` : '';
      const scoreDisplay = this.options.showScore 
        ? `<span style="font-weight: 600; color: var(--ink); font-size: 1rem;">${score} 分</span>`
        : '';
      
      optionLabel.innerHTML = `
        <input type="radio" name="${namePrefix}.${item.k}" value="${score}" ${skipAttr}
               style="width: 15px; height:15px; cursor: pointer; accent-color: #6b7280; margin: 0;">
        <span style="flex: 1;">${text}</span>
        ${scoreDisplay}
      `;
      
      return optionLabel;
    }

    /**
     * 取得選項分數 (支援多種格式)
     */
    getScore(option, index) {
      if (typeof option === 'object' && option.s !== undefined) {
        return option.s;  // Barthel 格式: {s: 10, txt: '獨立'}
      } else {
        return index === 0 ? 1 : 0;  // Lawton 格式: 第一個選項 1 分，其他 0 分
      }
    }

    /**
     * 取得選項文字
     */
    getText(option) {
      if (typeof option === 'object' && option.txt !== undefined) {
        return option.txt;  // Barthel 格式
      } else {
        return option;  // Lawton 格式 (直接字串)
      }
    }

    /**
     * 設定響應式佈局
     */
    setupResponsive(gridContainer) {
      const mediaQuery = window.matchMedia(`(max-width: ${this.options.mobileBreakpoint}px)`);
      const handleResize = (e) => {
        if (e.matches) {
          gridContainer.style.gridTemplateColumns = '1fr';
        } else {
          gridContainer.style.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
        }
      };
      mediaQuery.addListener(handleResize);
      handleResize(mediaQuery);
    }

    /**
     * 更新單個項目的分數顯示
     */
    updateScore(namePrefix, itemKey, score) {
      const scoreEl = document.querySelector(`#${namePrefix}_${itemKey}`);
      if (scoreEl) {
        scoreEl.textContent = score + ' 分';
      }
    }

    /**
     * 更新所有項目的分數顯示
     */
    updateAllScores(items, namePrefix) {
      items.forEach(item => {
        const sel = document.querySelector(`input[name="${namePrefix}.${item.k}"]:checked`);
        const score = sel ? +sel.value : 0;
        this.updateScore(namePrefix, item.k, score);
      });
    }
  }

  // 註冊到全域
  window.ChoiceCardBuilder = ChoiceCardBuilder;
  
  console.log('✅ ChoiceCardBuilder 工具已載入');
})();
