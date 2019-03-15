import customLoading from './customLoading'
import service from './service'

export default {
  install(Vue) {
    Vue.directive('customLoading', customLoading)
  },
  service
}
