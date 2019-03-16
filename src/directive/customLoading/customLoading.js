import Vue from 'vue'
import customLoading from '@/components/custom-loading'

const Mask = Vue.extend(customLoading)

const toggleLoading = (el, binding) => {
  if (binding.value) {
    if (binding.modifiers.fullscreen) {
      insertDom(document.body, el, binding)
    }
  } else {
    el.instance.visible = false
  }
}

const insertDom = (parent, el, binding) => {
  el.instance.visible = true
  parent.appendChild(el.mask)
}

export default {
  bind: function(el, binding, vnode) {
    debugger
    const mask = new Mask({
      el: document.createElement('div'),
      data() {
        return {
          fullscreen: !binding.modifiers.fullscreen
        }
      }
    })
    console.log(mask)
    el.instance = mask
    el.mask = mask.$el
    binding.value && toggleLoading(el, binding)
  },
  update: function(el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind: function(el, binding) {
    el.instance && el.instance.$destroy()
  }
}
