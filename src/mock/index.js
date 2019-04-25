const mock = require('mockjs').mock
import { transUrlParams } from '@/utils'

import { componentDatas, dragReportData } from './modules/variable'

const randomCount = '@integer(10, 100)'
const randomKeyArr = [
  'email marketing',
  'union advertising',
  'search engine',
  'from video',
  'pop up ads',
  'marketing',
  'direct access'
]
const randomXAxisArr = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

mock(/getreportcomponentinfo/, 'get', config => {
  let { reportKey } = transUrlParams(config.url)
  return dragReportData.find(report => report.reportKey === reportKey) || dragReportData[0]
})

mock(/getcomponentinfo/, 'get', config => componentDatas)

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
