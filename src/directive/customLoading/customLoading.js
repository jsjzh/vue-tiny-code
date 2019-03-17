import Vue from 'vue'
import customLoading from '@/components/custom-loading'

const context = '@@loadingContext'
const Mask = Vue.extend(customLoading)

const toggleLoading = (el, binding) => {
  if (binding.value) {
    if (binding.modifiers.fullscreen) {
      insertDom(document.body, el, binding)
    }
  } else {
    el[context].instance.visible = false
  }
}

const insertDom = (parent, el, binding) => {
  el[context].instance.visible = true
  parent.appendChild(el[context].mask)
}

export default {
  bind: function(el, binding, vnode) {
    const mask = new Mask({
      el: document.createElement('div'),
      data() {
        return {
          fullscreen: !binding.modifiers.fullscreen
        }
      }
    })
    if (!el[context]) {
      el[context] = {
        instance: mask,
        mask: mask.$el
      }
    } else {
      el[context].instance = mask
      el[context].mask = mask.$el
    }
    binding.value && toggleLoading(el, binding)
  },
  update: function(el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind: function(el, binding) {
    el[context].instance && el[context].instance.$destroy()
    el[context] = null
    delete el[context]
  }
}
