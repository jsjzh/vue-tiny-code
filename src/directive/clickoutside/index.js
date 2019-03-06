import clickoutside from './clickoutside'

const install = function(Vue) {
  Vue.directive('clickoutside', clickoutside)
}

clickoutside.install = install

export default clickoutside
