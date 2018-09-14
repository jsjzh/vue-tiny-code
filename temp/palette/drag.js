let isDrag = false;
/**
 * 对鼠标点击、移动、抬起事件进行包装
 * @param {Element} elem 
 * @param {Object} options 
 */
export default function (elem, options) {
  const moveFn = function (event) {
    options.move && options.move(event || window.event);
  }
  const endFn = function (event) {
    document.removeEventListener("mousemove", moveFn);
    document.removeEventListener("mouseup", endFn);
    document.onselectstart = null;
    document.ondragstart = null;
    isDrag = false;
    options.end && options.end(event || window.event);
  }

  elem.addEventListener("mousedown", function (event) {
    if (isDrag) return;
    document.onselectstart = function () { return false; };
    document.ondragstart = function () { return false; };
    document.addEventListener("mousemove", moveFn);
    document.addEventListener("mouseup", endFn);
    isDrag = true;
    options.start && options.start(event || window.event);
  })
}