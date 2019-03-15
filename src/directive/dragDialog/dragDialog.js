import { on, off } from '@/utils/dom'

const context = '@@dragDialogContext'

export default {
  bind(el, binding, vnode) {
    const header = el.querySelector('.el-dialog__header')
    const dialog = el.querySelector('.el-dialog')
    header.style.cssText += ';cursor:move;'
    dialog.style.cssText += ';top:0px;'

    function handleMousedown(e) {
      document.documentElement.style.cssText += ';user-select:none;'

      let maxLeft = window.innerWidth - dialog.offsetWidth
      let startLeft = e.clientX
      let oldLeft = dialog.offsetLeft

      let maxTop = window.innerHeight - dialog.offsetHeight
      let startTop = e.clientY
      let oldTop = dialog.offsetTop

      dialog.style.cssText += `;margin:0;left:${oldLeft}px;top:${oldTop}px;`

      function handleMousemove(e) {
        let moveX = oldLeft + e.clientX - startLeft
        let currLeft = (dialog.style.left = Math.min(Math.max(0, moveX), maxLeft) + 'px')
        let moveY = oldTop + e.clientY - startTop
        let currTop = (dialog.style.top = Math.min(Math.max(0, moveY), maxTop) + 'px')

        dialog.style.cssText += `;left:${currLeft};top:${currTop};`

        // emit onDrag event
        vnode.child.$emit('dragDialog')
      }

      function handleMouseup(e) {
        document.documentElement.style.cssText += ';user-select:auto;'
        off(document, 'mousemove', handleMousemove)
        off(document, 'mouseup', handleMouseup)
      }

      on(document, 'mousemove', handleMousemove)
      on(document, 'mouseup', handleMouseup)
    }

    on(header, 'mousedown', handleMousedown)

    if (!el[context]) {
      el[context] = {
        removeHandle: handleMousedown
      }
    } else {
      el[context].removeHandle = handleMousedown
    }
  },
  unbind(el, binding, vnode) {
    const header = el.querySelector('.el-dialog__header')
    off(header, 'mousedown', el[context].removeHandle)
    el[context] = null
    delete el[context]
  }
}
