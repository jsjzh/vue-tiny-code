const mock = require('mockjs').mock
import { transUrlParams } from '@/utils'

import { componentDatas, dragReportData } from './modules/dragReport'

mock(/getReportData/, 'get', config => {
  let { reportKey } = transUrlParams(config.url)
  return dragReportData.find(report => report.reportKey === reportKey)
})
mock(/getComponents/, 'get', config => componentDatas)
