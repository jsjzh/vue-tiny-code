import Vue from 'vue'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.prototype.$msg = function(message = '0_操作成功', callback, duration = 1500) {
  let arr = ['success', 'error', 'info']
  let dealArr = message.split('_')
  let type = arr[~~dealArr[0]] || 'info'
  message = dealArr[1] || '未知信息'
  this.$message({
    type,
    showClose: true,
    message,
    duration
  })
  if (typeof callback === 'function') {
    callback(true)
  } else {
    return Promise.resolve(true)
  }
}
