import hoverswitch from './hoverswitch'

const install = function(Vue) {
  Vue.directive('hoverswitch', hoverswitch)
}

hoverswitch.install = install

export default hoverswitch
