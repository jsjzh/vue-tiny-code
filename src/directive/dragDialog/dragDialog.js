import { on, off } from '@/utils/dom'

export default {
  bind(el, binding, vnode) {
    const header = el.querySelector('.el-dialog__header')
    const dialog = el.querySelector('.el-dialog')
    header.style.cssText += ';cursor:move;'
    dialog.style.cssText += ';top:0px;margin:0;'

    function handleMousedown(e) {
      let left = e.clientX
      let oldLeft = dialog.style.left

      let maxLeft = window.innerWidth - dialog.offsetWidth
      let maxTop = window.innerHeight - dialog.offsetHeight

      let top = e.clientY
      let oldTop = dialog.style.top

      if (oldLeft.indexOf('px') !== -1) oldLeft = +oldLeft.replace('px', '')
      if (oldTop.indexOf('px') !== -1) oldTop = +oldTop.replace('px', '')

      function handleMousemove(e) {
        let moveX = oldLeft + e.clientX - left
        moveX = moveX >= 0 ? moveX : 0
        dialog.style.left = Math.min(moveX, maxLeft) + 'px'
        let moveY = oldTop + e.clientY - top
        moveY = moveY >= 0 ? moveY : 0
        dialog.style.top = Math.min(moveY, maxTop) + 'px'
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
