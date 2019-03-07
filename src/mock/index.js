const mock = require('mockjs').mock
import { transUrlParams } from '@/utils'

import { componentDatas, dragReportData } from './modules/variable'

const randomCount = '@integer(10, 80)'
const randomKeyArr = ['10km', '20km', '30km', '40km', '50km', '60km']

mock(/getReportData/, 'get', config => {
  let { reportKey } = transUrlParams(config.url)
  return dragReportData.find(report => report.reportKey === reportKey) || dragReportData[0]
})
mock(/getComponents/, 'get', config => componentDatas)

mock(/report\/getCountData/, 'get', config => {
  return mock({
    countKey: {
      countOne: randomCount,
      countTwo: randomCount,
      rate: randomCount,
      average: randomCount
    }
  })
})

mock(/report\/getPieData/, 'get', config => {
  return mock(randomKeyArr.map(name => ({ value: randomCount, name })))
})

mock(/report\/getTableData/, 'get', config => {
  return mock(randomKeyArr.map(name => ({ count: randomCount, value: randomCount, name })))
})

mock(/report\/getBarData/, 'get', config => {
  return mock(randomKeyArr.map(name => ({ count: randomCount, value: randomCount, name })))
})

mock(/report\/getLineData/, 'get', config => {
  return mock(randomKeyArr.map(name => ({ count: randomCount, value: randomCount, name })))
})
