import Vue from 'vue'
import customLoading from '@/components/custom-loading'

const Mask = Vue.extend(customLoading)

const loadingDirective = {}

loadingDirective.install = Vue => {
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      insertDom(document.body, el, binding)
    } else {
      el.instance.visible = false
    }
  }

  const insertDom = (parent, el, binding) => {
    el.instance.visible = true
    parent.appendChild(el.mask)
  }
  Vue.directive('customLoading', {
    bind(el, binding, vnode) {
      const vm = vnode.context
      const mask = new Mask({
        el: document.createElement('div')
      })
      el.instance = mask
      el.mask = mask.$el

      binding.value && toggleLoading(el, binding)
    },
    update(el, binding) {
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    }
  })
}

export default loadingDirective
