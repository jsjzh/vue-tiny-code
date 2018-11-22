/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2018-10-30 15:29:59
 * @LastEditors: jsjzh
 * @LastEditTime: 2018-11-22 11:02:14
 * @Description: dom 操作工具箱
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();