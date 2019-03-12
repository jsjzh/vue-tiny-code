import waves from './waves'

waves.install = function(Vue) {
  Vue.directive('waves', waves)
}

export default waves
