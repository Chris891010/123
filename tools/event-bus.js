// 事件總線 - 用於模組間通訊
// 實現發布-訂閱模式，解耦模組依賴

(function() {
  'use strict';

  class EventBus {
    constructor() {
      this.events = {};
    }

    /**
     * 訂閱事件
     * @param {string} eventName - 事件名稱
     * @param {Function} callback - 回調函數
     */
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }

    /**
     * 取消訂閱事件
     * @param {string} eventName - 事件名稱
     * @param {Function} callback - 回調函數
     */
    off(eventName, callback) {
      if (!this.events[eventName]) return;
      
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }

    /**
     * 發布事件
     * @param {string} eventName - 事件名稱
     * @param {*} data - 事件數據
     */
    emit(eventName, data) {
      if (!this.events[eventName]) return;
      
      this.events[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`❌ 事件處理錯誤 [${eventName}]:`, error);
        }
      });
    }

    /**
     * 訂閱一次性事件
     * @param {string} eventName - 事件名稱
     * @param {Function} callback - 回調函數
     */
    once(eventName, callback) {
      const onceCallback = (data) => {
        callback(data);
        this.off(eventName, onceCallback);
      };
      this.on(eventName, onceCallback);
    }
  }

  // 創建全域事件總線實例
  window.CGAEventBus = new EventBus();
  
  console.log('✅ 事件總線已初始化');
})();
