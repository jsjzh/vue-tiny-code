import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../static/css/reset.css'
import '../static/css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
