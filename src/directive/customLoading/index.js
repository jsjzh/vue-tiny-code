import customLoading from './customLoading'

customLoading.install = function(Vue) {
  Vue.directive('customLoading', customLoading)
}

export default customLoading
