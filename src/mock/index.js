const Mock = require('mockjs')
import { transUrlParams, transBodyParams } from '@/utils'
import { componentDatas, dragReportData, reportListDatas } from './modules/variable'

import * as R from 'ramda'

let $$id = 0

let _componentDatas = componentDatas
let _dragReportData = dragReportData
let _reportListDatas = reportListDatas

Mock.setup({
  timeout: 200
})

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

Mock.mock(/getreportcomponentinfo/, 'get', config => {
  let { reportUnionKey } = transUrlParams(config.url)
  return _dragReportData.find(report => report.reportUnionKey === reportUnionKey) || _dragReportData[0]
})

/**
 * 获取自定义报表的组件列表
 */
Mock.mock(/getcomponentinfo/, 'get', config => _componentDatas)
/**
 * 获取自定义报表列表
 */
Mock.mock(/getreportstructurelist/, 'get', config => _reportListDatas)
/**
 * 新增自定义报表
 */
Mock.mock(/operatestructureinfo/, 'post', config => {
  let { title, children } = transBodyParams(config.body)
  let newReport = { title, children, reportUnionKey: $$id++ }
  _reportListDatas.push(newReport)
  return newReport
})
/**
 * 删除自定义报表
 */
Mock.mock(/delstructureinfo/, 'post', config => {
  let { reportUnionKey } = transBodyParams(config.body)
  _reportListDatas = _reportListDatas.filter(report => report.reportUnionKey !== reportUnionKey)
})

Mock.mock(/report\/getCountData/, 'get', config => {
  return Mock.mock({
    countKey: {
      countOne: randomCount,
      countTwo: randomCount,
      rate: randomCount,
      average: randomCount
    }
  })
})

Mock.mock(/report\/getRandomData/, 'get', config =>
  Mock.mock(
    randomKeyArr.map((name, index) => ({
      name: name,
      value: randomCount,
      xdata: randomXAxisArr[index],
      arrData: new Array(7).fill(randomCount)
    }))
  )
)
