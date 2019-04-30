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

/**
 * 获取某一报表详细布局信息
 */
Mock.mock(/getreportcomponentinfo/, 'get', config => {
  let { reportUnionKey } = transUrlParams(config.url)
  return _dragReportData.find(report => report.reportUnionKey === reportUnionKey)
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
  return { status: 'success', code: 200, data: { reportUnionKey } }
})

Mock.mock(/updatestructureinfo/, 'post', config => {
  let updateInfo = transBodyParams(config.body)
  let report = _dragReportData.find(reports => reports.reportUnionKey === updateInfo.reportUnionKey)
  report = { ...report, ...updateInfo }
  return { status: 'success', code: 200, data: { reportUnionKey: updateInfo.reportUnionKey } }
})

Mock.mock(/report\/getCountData/, 'get', config =>
  Mock.mock({
    countKey: {
      countOne: randomCount,
      countTwo: randomCount,
      rate: randomCount,
      average: randomCount
    }
  })
)
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
