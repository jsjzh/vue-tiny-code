const mock = require('mockjs').mock
import { transUrlParams } from '@/utils'

import { componentDatas, dragReportData } from './modules/variable'

const randomCount = '@integer(10, 100)'
const randomKeyArr = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
const randomXAxisArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

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

mock(/report\/getLineAreaData/, 'get', config => {
  return mock(
    randomKeyArr.map((name, index) => ({ xData: randomXAxisArr[index], name, data: new Array(10).fill(randomCount) }))
  )
})

mock(/report\/getBarStackData/, 'get', config => {
  return mock(
    randomKeyArr.map((name, index) => ({ xData: randomXAxisArr[index], name, data: new Array(10).fill(randomCount) }))
  )
})
