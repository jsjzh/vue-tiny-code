/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-13 08:39:08
 * @LastEditTime: 2019-03-13 15:17:01
 * @Description: 使用方式
 *  <div v-waves>test</div>
 *  <div v-waves="{color: 'red'}">test</div>
 */
import './waves.css'

import { on, off } from '@/utils/dom'

const context = `@@wavesContext`

function handleClick(el, binding) {
  el.style.position = 'relative'
  el.style.overflow = 'hidden'

  function handle(e) {
    let options = { color: 'rgba(0, 0, 0, 0.15)' }
    options = { ...options, ...binding.value }
    // getBoundingClientRect 弊端
    // 每次调用都会强制浏览器重新计算整个页面的布局，可能给网页造成相当大的闪烁
    // const rect = el.getBoundingClientRect()
    let ripple = el.querySelector('.waves-ripple')
    if (!ripple) {
      ripple = document.createElement('span')
      ripple.className = 'waves-ripple'
      ripple.style.height = ripple.style.width = Math.max(el.offsetWidth, el.offsetHeight) + 'px'
      el.appendChild(ripple)
    } else {
      ripple.className = 'waves-ripple'
    }
    ripple.style.top =
      (e.pageY - el.offsetTop - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
        document.body.scrollTop) + 'px'
    ripple.style.left =
      (e.pageX - el.offsetLeft - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
        document.body.scrollLeft) + 'px'
    ripple.style.backgroundColor = options.color
    ripple.className = 'waves-ripple z-active'
  }

  if (!el[context]) {
    el[context] = {
      removeHandle: handle
    }
  } else {
    el[context].removeHandle = handle
  }
  return handle
}

export default {
  bind(el, binding) {
    on(el, 'click', handleClick(el, binding))
  },
  update(el, binding) {
    off(el, 'click', el[context].removeHandle)
    on(el, 'click', handleClick(el, binding))
  },
  unbind(el) {
    off(el, 'click', el[context].removeHandle)
    el[context] = null
    delete el[context]
  }
}
