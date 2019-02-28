import methods from './methods'

export default {
  install(Vue) {
    Vue.mixin({ ...methods })
  }
}
