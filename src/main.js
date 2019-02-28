import Vue from 'vue'
import App from './App.vue'
import router from './router'

import echarts from 'echarts'
import ElementUI from 'element-ui'

import mixins from '@/mixins'

import '../static/css/reset.css'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/element-cover.scss'
import './assets/css/global.scss'

Vue.use(ElementUI)
Vue.use(mixins)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
