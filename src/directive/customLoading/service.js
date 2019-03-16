import Vue from 'vue'
import customLoading from '@/components/custom-loading'

const Mask = Vue.extend(customLoading)

Mask.prototype.close = function() {
  this.visible = false
  let timer = setTimeout(() => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.$destroy()
    clearTimeout(timer)
  }, 2000)
}

const Loading = options => {
  let parent = document.querySelector(options.target)
  let mask = new Mask({
    el: document.createElement('div'),
    data: options
  })
  parent.appendChild(mask.$el)
  mask.visible = true
  return mask
}

export default Loading
