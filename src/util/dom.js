let list = []

EventTarget.prototype._addEventListener = function () {
  list.push(arguments)
  // return this.addEventListener.apply(this, arguments)
  return EventTarget.prototype.addEventListener.apply(this, arguments)
};

export const on = (function () {
  if (document._addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element._addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();