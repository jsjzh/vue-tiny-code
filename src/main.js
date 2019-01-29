import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../assets/css/reset.css'
import '../assets/css/normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
