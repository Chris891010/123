// ============================================================================
// 下拉選單建構器 (DropdownBuilder)
// ============================================================================
// 用於快速建立統一樣式的下拉選單
// ============================================================================

(function() {
  'use strict';

  class DropdownBuilder {
    constructor(options = {}) {
      this.options = {
        emptyText: '-',           // 空選項顯示文字（預設為 "-"）
        emptyValue: '',           // 空選項的 value 值
        showEmpty: true,          // 是否顯示空選項
        ...options
      };
    }

    /**
     * 建立單個下拉選單
     * @param {Object} config - 配置物件
     * @param {string} config.id - select 的 id
     * @param {string} config.label - 標籤文字
     * @param {Array<string>} config.options - 選項陣列
     * @param {boolean} config.required - 是否必填
     * @param {string} config.colSpan - 欄位寬度 (col-2, col-3, col-4, col-6, col-12)
     * @param {string} config.emptyText - 自訂空選項文字
     * @param {string} config.defaultValue - 預設選中的值
     * @returns {string} - 返回完整的 HTML 字串
     */
    create(config) {
      const {
        id,
        label,
        options,
        required = false,
        colSpan = 'col-3',
        emptyText = this.options.emptyText,
        defaultValue = ''
      } = config;

      const requiredMark = required ? ' <span style="color: #ef4444;">*</span>' : '';
      const requiredAttr = required ? ' required' : '';
      const emptyOption = this.options.showEmpty 
        ? `<option value="${this.options.emptyValue}">${emptyText}</option>` 
        : '';

      const optionsHtml = options.map(opt => {
        const selected = opt === defaultValue ? ' selected' : '';
        return `<option${selected}>${opt}</option>`;
      }).join('');

      return `
  <div class="field ${colSpan}">
    <label>${label}${requiredMark}</label>
    <select id="${id}"${requiredAttr}>
      ${emptyOption}
      ${optionsHtml}
    </select>
  </div>`;
    }

    /**
     * 批量建立多個下拉選單
     * @param {Array<Object>} configs - 配置物件陣列
     * @returns {string} - 返回完整的 HTML 字串
     */
    createMultiple(configs) {
      return configs.map(config => this.create(config)).join('');
    }

    /**
     * 建立評分類型的下拉選單（0-N 分）
     * @param {Object} config - 配置物件
     * @param {string} config.id - select 的 id
     * @param {string} config.label - 標籤文字
     * @param {number} config.max - 最大分數
     * @param {string} config.className - 自訂 class
     * @param {string} config.dataMax - data-max 屬性
     * @param {string} config.emptyText - 自訂空選項文字（預設為 '-'）
     * @returns {string} - 返回完整的 select HTML 字串（不含 field 容器）
     */
    createScore(config) {
      const {
        id = '',
        label = '',
        max,
        className = '',
        dataMax = '',
        emptyText = this.options.emptyText
      } = config;

      const idAttr = id ? ` id="${id}"` : '';
      const classAttr = className ? ` class="${className}"` : '';
      const dataMaxAttr = dataMax ? ` data-max="${dataMax}"` : '';
      
      const options = [];
      options.push(`<option>${emptyText}</option>`); // 空選項，顯示 '-'
      for (let i = 0; i <= max; i++) {
        options.push(`<option>${i}</option>`);
      }

      if (label) {
        return `
  <div class="field">
    <label>${label}</label>
    <select${idAttr}${classAttr}${dataMaxAttr}>
      ${options.join('')}
    </select>
  </div>`;
      } else {
        return `<select${idAttr}${classAttr}${dataMaxAttr}>${options.join('')}</select>`;
      }
    }

    /**
     * 建立帶有群組的下拉選單
     * @param {Object} config - 配置物件
     * @param {string} config.id - select 的 id
     * @param {string} config.label - 標籤文字
     * @param {Array<Object>} config.groups - 選項群組 [{label: '群組名', options: [...]}]
     * @param {boolean} config.required - 是否必填
     * @param {string} config.colSpan - 欄位寬度
     * @returns {string} - 返回完整的 HTML 字串
     */
    createGrouped(config) {
      const {
        id,
        label,
        groups,
        required = false,
        colSpan = 'col-3'
      } = config;

      const requiredMark = required ? ' <span style="color: #ef4444;">*</span>' : '';
      const requiredAttr = required ? ' required' : '';
      const emptyOption = this.options.showEmpty 
        ? `<option value="${this.options.emptyValue}">${this.options.emptyText}</option>` 
        : '';

      const groupsHtml = groups.map(group => {
        const optionsHtml = group.options.map(opt => `<option>${opt}</option>`).join('');
        return `<optgroup label="${group.label}">${optionsHtml}</optgroup>`;
      }).join('');

      return `
  <div class="field ${colSpan}">
    <label>${label}${requiredMark}</label>
    <select id="${id}"${requiredAttr}>
      ${emptyOption}
      ${groupsHtml}
    </select>
  </div>`;
    }
  }

  // 註冊到全域
  window.DropdownBuilder = new DropdownBuilder();

  console.log('✅ DropdownBuilder 工具已載入');

})();
