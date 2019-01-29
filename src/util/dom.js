/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2018-10-30 15:29:59
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-01-29 22:30:55
 * @Description: dom 操作工具箱
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

export function addClass(el, classNames) {
  if (el.classList) {
    return classNames.forEach(function(cl) {
      el.classList.add(cl)
    })
  }
  el.className += ' ' + classNames.join(' ')
}

export function removeClass(el, classNames) {
  if (el.classList) {
    return classNames.forEach(function(cl) {
      el.classList.remove(cl)
    })
  }
  el.className = el.className.replace(new RegExp('(^|\\b)' + classNames.join('|') + '(\\b|$)', 'gi'), ' ')
}

export function getScrollbarWidth() {
  const outer = document.createElement('div')
  outer.className = 'el-scrollbar__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)

  return widthNoScroll - widthWithScroll
}
