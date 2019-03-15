import Vue from 'vue'
import customLoading from '@/components/custom-loading'

const Mask = Vue.extend(customLoading)

Mask.prototype.close = function() {
  this.visible = false
}

export default function Loading(options) {
  let parent = document.querySelector(options.target)
  let mask = new Mask({
    el: document.createElement('div'),
    data: options
  })
  parent.appendChild(mask.$el)
  mask.visible = true
  return mask
}
