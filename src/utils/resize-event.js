/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2018-11-22 10:42:19
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-01-29 22:30:56
 * @Description: resize 窗口函数调用
 * @use
 *  addResizeListener(element, fn)
 *  removeResizeListener(element, fn)
 */
import ResizeObserver from 'resize-observer-polyfill'

const isServer = typeof window === 'undefined'

const listenerCtx = '$$resizeListener'
const observerCtx = '$$resizeObserver'

function resizeHandler(entries) {
  for (let entry of entries) {
    const listeners = entry.target[listenerCtx] || []
    listeners.length && listeners.forEach(fn => fn())
  }
}

export const addResizeListener = function(element, fn) {
  if (isServer || !element || !fn) return
  if (!element[listenerCtx]) {
    element[listenerCtx] = []
    element[observerCtx] = new ResizeObserver(resizeHandler)
    element[observerCtx].observe(element)
  }
  element[listenerCtx].push(fn)
}

export const removeResizeListener = function(element, fn) {
  if (isServer || !element || !element[listenerCtx]) return
  element[listenerCtx].splice(element[listenerCtx].indexOf(fn), 1)
  !element[listenerCtx].length && element[observerCtx].disconnect()
}
