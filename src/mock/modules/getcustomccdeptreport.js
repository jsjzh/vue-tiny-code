const Mock = require('mockjs')

import { getRamdomCountByNum } from '@/utils'

const randomCount = '@integer(10, 100)'

const baseParams = [
  { prop: 'safe_score', title: '安全评分' },
  { prop: 'day_score', title: '日间评分' },
  { prop: 'night_score', title: '夜间评分' },
  { prop: 'total_hours', title: '总时长' },
  { prop: 'avg_hours', title: '平均时长' },
  { prop: 'operate_score', title: '运营评分' },
  { prop: 'unoperate_score', title: '非运营评分' },
  { prop: 'expressway_score', title: '高速评分' },
  { prop: 'normalway_score', title: '非高速评分' },
  { prop: 'total_mile', title: '总里程' },
  { prop: 'avg_mile', title: '平均里程' },
  { prop: 'total_event', title: '总事件' },
  { prop: 'avg_event', title: '平均事件' },
  { prop: 'total_operate', title: '运营次数' },
  { prop: 'avg_operate', title: '平均运营次数' },
  { prop: 'max_speed', title: '最高车速' },
  { prop: 'avg_speed', title: '平均车速' }
]

const dimensionScores = [
  { prop: 'cornering', title: '转弯评分', tips: '继续保持 or 危险请注意' },
  { prop: 'acc', title: '加速评分', tips: '继续保持 or 危险请注意' },
  { prop: 'slow', title: '减速评分', tips: '继续保持 or 危险请注意' },
  { prop: 'sli', title: '速度评分', tips: '继续保持 or 危险请注意' },
  { prop: 'fcw', title: '追尾碰撞评分', tips: '继续保持 or 危险请注意' },
  { prop: 'lane', title: '车道保持评分', tips: '继续保持 or 危险请注意' },
  { prop: 'hmw', title: '车距控制评分', tips: '继续保持 or 危险请注意' },
  { prop: 'pcw', title: '行人和非机动碰撞评分', tips: '继续保持 or 危险请注意' },
  { prop: 'turn_ctrl', title: '转向灯控制评分', tips: '继续保持 or 危险请注意' },
  { prop: 'break_ctrl', title: '刹车控制评分', tips: '继续保持 or 危险请注意' }
]

const eventInfos = [
  'pcw',
  'fcw',
  'ldw',
  'hmw',
  'sli',
  'cw',
  'drastic',
  'untreat',
  'comms',
  'park',
  'slow',
  'ignore',
  'other'
]

const baseParamData = {}
baseParams.forEach(baseParam => {
  baseParamData[baseParam.prop] = {
    name: baseParam.title,
    value: randomCount,
    trend: '@integer(-1, 1)',
    rate: randomCount
  }
})
const dimensionScoreData = {}
dimensionScores.forEach(dimensionScore => {
  dimensionScoreData[dimensionScore.prop] = {
    name: dimensionScore.title,
    score: '@integer(0, 10)',
    tips: dimensionScore.tips
  }
})
const eventInfoData = {}
eventInfos.forEach(eventInfo => {
  eventInfoData[eventInfo] = randomCount
})
const eventHourListData = new Array(24).fill(null).map((value, index) => ({
  hour: index,
  vehicle_count: randomCount,
  event_count: randomCount,
  operation_count: randomCount
}))

const vehicleScoreData = {
  excellent: randomCount,
  good: randomCount,
  normal: randomCount,
  bad: randomCount,
  ranking_top_10: new Array(10).fill(null).map((value, index) => ({
    score: randomCount,
    plate_no: '沪DK@integer(1000, 9999)'
  })),
  ranking_tail_10: new Array(10).fill(null).map((value, index) => ({
    score: randomCount,
    plate_no: '沪DK@integer(1000, 9999)'
  }))
}

Mock.mock(/report\/getcustomccdeptreport/, 'post', config => {
  const driveScoreListData = new Array(31).fill(null).map((value, index) => {
    const counts = getRamdomCountByNum(100, 4)
    return {
      date: index,
      score: randomCount,
      excellent: counts[0],
      good: counts[1],
      normal: counts[2],
      bad: counts[3]
    }
  })

  return Mock.mock({
    status: 200,
    message: 'OK',
    data: {
      base_param: baseParamData,
      dimension_score: dimensionScoreData,
      event_info: eventInfoData,
      event_hour_list: eventHourListData,
      vehicle_score: vehicleScoreData,
      drive_score_list: driveScoreListData
    }
  })
})
