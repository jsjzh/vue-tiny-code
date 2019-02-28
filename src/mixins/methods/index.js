/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2018-11-30 11:37:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-28 16:05:11
 * @Description: 全局实例注入 methods
 */
export default {
  methods: {
    /**
     * 用于简便 $message 的用法，message 前需要带入 0/1/2 以及 _ 来表示提示类型
     * @param {string} message 传入信息
     * @param {function} callback 回调
     */
    $msg(message = '0_操作成功', callback, duration = 1500) {
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
  }
}
