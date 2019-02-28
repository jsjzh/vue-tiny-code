import Vue from 'vue'
import App from './App.vue'
import router from './router'

import echarts from 'echarts'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '../assets/css/reset.css'
import '../assets/css/normalize.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
