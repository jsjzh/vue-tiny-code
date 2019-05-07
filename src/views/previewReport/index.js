/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-18 10:49:33
 * @LastEditTime: 2019-05-07 09:32:32
 * @Description: 用了 webpack 的动态加载加载组件，组件名要满足 custom-report-xxx.vue
 */

import { hyphen2hump, dir2file } from '@/utils'

// TODO 后续还需要改进，应该只读取 custom-report-component 目录下的组件
const customReports = require.context('@/components/custom-report', true, /custom\-report\-.+\.vue$/)

const reports = {}

function requireAll(requireContext) {
  requireContext.keys().forEach(filePath => {
    const realName = dir2file(filePath)
    const componentName = hyphen2hump(realName.match(/(custom\-report\-.+)\.vue$/)[1])
    reports[componentName] = requireContext(filePath).default
  })
}

requireAll(customReports)

export default reports
