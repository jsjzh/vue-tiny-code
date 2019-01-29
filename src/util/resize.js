/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2018-11-22 14:20:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-01-29 22:31:02
 * @Description: resize
 * @from: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
 */
let attachEvent = document.attachEvent
let isIE = navigator.userAgent.match(/Trident/)
let requestFrame = (function() {
  let raf =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(fn) {
      return window.setTimeout(fn, 20)
    }
  return function(fn) {
    return raf(fn)
  }
})()

let cancelFrame = (function() {
  let cancel =
    window.cancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.clearTimeout
  return function(id) {
    return cancel(id)
  }
})()

function resizeListener(e) {
  let win = e.target || e.srcElement
  if (win.__resizeRAF__) cancelFrame(win.__resizeRAF__)
  win.__resizeRAF__ = requestFrame(function() {
    let trigger = win.__resizeTrigger__
    trigger.__resizeListeners__.forEach(function(fn) {
      fn.call(trigger, e)
    })
  })
}

function objectLoad(e) {
  this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__
  this.contentDocument.defaultView.addEventListener('resize', resizeListener)
}

export function addResizeListener(element, fn) {
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    if (attachEvent) {
      element.__resizeTrigger__ = element
      element.attachEvent('onresize', resizeListener)
    } else {
      if (getComputedStyle(element).position == 'static') element.style.position = 'relative'
      let obj = (element.__resizeTrigger__ = document.createElement('object'))
      obj.setAttribute(
        'style',
        'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;'
      )
      obj.__resizeElement__ = element
      obj.onload = objectLoad
      obj.type = 'text/html'
      if (isIE) element.appendChild(obj)
      obj.data = 'about:blank'
      if (!isIE) element.appendChild(obj)
    }
  }
  element.__resizeListeners__.push(fn)
}

export function removeResizeListener(element, fn) {
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    if (attachEvent) element.detachEvent('onresize', resizeListener)
    else {
      element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize', resizeListener)
      element.__resizeTrigger__ = !element.removeChild(element.__resizeTrigger__)
    }
  }
}
