import './waves.css'

import { on, off } from '@/utils/dom'

let options = { type: 'hit', color: 'rgba(0, 0, 0, 0.15)' }

function handleClick(el, binding) {
  el.style.position = 'relative'
  el.style.overflow = 'hidden'
  return function(e) {
    const rect = el.getBoundingClientRect()
    let ripple = el.querySelector('.waves-ripple')
    if (!ripple) {
      ripple = document.createElement('span')
      ripple.className = 'waves-ripple'
      ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
      el.appendChild(ripple)
    } else {
      ripple.className = 'waves-ripple'
    }
    switch (options.type) {
      case 'center':
        ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
        ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
        break
      default:
        ripple.style.top =
          (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
            document.body.scrollTop) + 'px'
        ripple.style.left =
          (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
            document.body.scrollLeft) + 'px'
    }
    ripple.style.backgroundColor = options.color
    ripple.className = 'waves-ripple z-active'
  }
}

export default {
  bind(el, binding) {
    on(el, 'click', handleClick(el, binding))
  },
  unbind() {
    console.log('unbind', arguments)
  }
}
