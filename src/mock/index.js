const mock = require('mockjs').mock
import { transUrlParams } from '@/utils'

import { componentDatas, dragReportData } from './modules/variable'

const randomCount = '@integer(10, 100)'
const randomKeyArr = ['邮件营销', '联盟广告', '视频广告', '搜索引擎', '弹出广告', '营销引流', '直接访问']
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

mock(/report\/getRandomData/, 'get', config =>
  mock(
    randomKeyArr.map((name, index) => ({
      name: name,
      value: randomCount,
      xdata: randomXAxisArr[index],
      arrData: new Array(7).fill(randomCount)
    }))
  )
)
