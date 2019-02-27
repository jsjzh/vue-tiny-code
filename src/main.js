import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../assets/css/reset.css'
import '../assets/css/normalize.css'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

console.log(app)
