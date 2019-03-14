import { on, off } from '@/utils/dom'

export default {
  bind(el, binding, vnode) {
    const header = el.querySelector('.el-dialog__header')
    const dialog = el.querySelector('.el-dialog')
    header.style.cssText += ';cursor:move;'
    dialog.style.cssText += ';top:0px;margin: 0;'

    function handleMousedown(e) {
      let left = e.clientX
      let oldLeft = dialog.style.left

      let top = e.clientY
      let oldTop = dialog.style.top

      if (oldLeft.indexOf('px') !== -1) oldLeft = +oldLeft.replace('px', '')
      if (oldTop.indexOf('px') !== -1) oldTop = +oldTop.replace('px', '')

      function handleMousemove(e) {
        dialog.style.left = oldLeft + e.clientX - left + 'px'
        dialog.style.top = oldTop + e.clientY - top + 'px'
      }
      function handleMouseup(e) {
        off(document, 'mousemove', handleMousemove)
        off(document, 'mouseup', handleMouseup)
      }
      on(document, 'mousemove', handleMousemove)
      on(document, 'mouseup', handleMouseup)
    }

    on(header, 'mousedown', handleMousedown)
  }
}
