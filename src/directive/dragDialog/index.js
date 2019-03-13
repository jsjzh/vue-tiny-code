import dragDialog from './dragDialog'

dragDialog.install = function(Vue) {
  Vue.directive('dragDialog', dragDialog)
}

export default dragDialog
