import Vue from 'vue'
import echarts from 'echarts'
import { $msg } from '@/utils'
import ElementUI from 'element-ui'
import customLoading from '@/directive/customLoading'

Vue.prototype.$echarts = echarts
Vue.prototype.$msg = $msg
Vue.prototype.$customLoading = customLoading.service

Vue.use(ElementUI)
Vue.use(customLoading)

import teIcon from '@/components/te-icon'
Vue.component('te-icon', teIcon)
