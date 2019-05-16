window.$$XMLHttpRequest = window.XMLHttpRequest

const Mock = require('mockjs')
import { transUrlParams, transBodyParams, getRamdomCountByNum } from '@/utils'
import { componentDatas, dragReportData, reportListDatas } from './variable'

let $$id = 0

let _componentDatas = componentDatas
let _dragReportData = dragReportData
let _reportListDatas = reportListDatas

Mock.setup({
  timeout: 200
})

import './modules/getcustomccdeptreport'

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

const alarmType = [
  'pedestrian collision warning',
  'vehicle collision warning',
  'frequently change lanes',
  'too close for too long',
  'continuous speed',
  'suspected collision and rollover',
  'intense driving'
]

const processState = [
  'untreated',
  'has been confirmed with the driver',
  'Suggest stopping for a rest',
  'Recommend speed reduction',
  'Normal circumstances can be ignored',
  'other'
]

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
      rate: '@integer(-100, 100)',
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

Mock.mock(/report\/getAlarmData/, 'get', config =>
  Mock.mock(
    alarmType.map((name, index) => ({
      name: name,
      value: randomCount,
      xdata: randomXAxisArr[index],
      arrData: new Array(7).fill(randomCount)
    }))
  )
)

Mock.mock(/report\/getDealData/, 'get', config =>
  Mock.mock(
    processState.map((name, index) => ({
      name: name,
      value: randomCount,
      xdata: randomXAxisArr[index],
      arrData: new Array(7).fill(randomCount)
    }))
  )
)

Mock.mock(/report\/getAlarmTimeData/, 'get', config =>
  Mock.mock(
    new Array(24).fill(null).map((time, index) => ({
      xdata: index,
      carCount: randomCount,
      alarmCount: randomCount
    }))
  )
)

Mock.mock(/report\/getVehicleScoreData/, 'get', config => {
  return Mock.mock(
    new Array(20).fill(null).map(() => ({
      score: randomCount,
      plate: '沪DK@integer(1000, 9999)'
    }))
  )
})

Mock.mock(/report\/getDrivingScoreLineData/, 'get', config => {
  return Mock.mock(
    new Array(31).fill(null).map((time, index) => ({
      xdata: index,
      score: randomCount
    }))
  )
})

Mock.mock(/report\/getDrivingScoreBarData/, 'get', config => {
  return Mock.mock(
    new Array(31).fill(null).map((time, index) => {
      const counts = getRamdomCountByNum(100, 4)
      return {
        xdata: index,
        countOne: counts[0],
        countTwo: counts[1],
        countThree: counts[2],
        countFour: counts[3]
      }
    })
  )
})
