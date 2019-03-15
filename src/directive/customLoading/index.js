import customLoading from './customLoading'
import service from './service'

customLoading.install = function(Vue) {
  Vue.directive('customLoading', customLoading)
}

export default customLoading

// export default {
//   install(Vue) {
//     Vue.directive('customLoading', customLoading)
//   },
//   service
// }
