/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-18 10:49:33
 * @LastEditTime: 2019-03-07 14:07:15
 * @Description: 用了 webpack 的动态加载加载组件，组件名要满足 custom-report-xxx.vue
 */

import { hyphen2hump } from '@/utils'

const customReports = require.context('@/components/custom-report', false, /custom\-report\-.+\.vue$/)

const reports = {}

const requireAll = requireContext =>
  requireContext.keys().forEach(name => {
    const _name = hyphen2hump(name.match(/(custom\-report\-.+)\./)[1])
    reports[_name] = requireContext(name).default
  })

requireAll(customReports)

export default reports
