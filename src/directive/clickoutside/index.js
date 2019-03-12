import clickoutside from './clickoutside'

clickoutside.install = function(Vue) {
  Vue.directive('clickoutside', clickoutside)
}

export default clickoutside
