/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:34:43
 * @LastEditTime: 2019-05-14 11:37:44
 * @Description:
 *  组件公用变量
 *  该处不设置 data 相关内容，只设置一些特殊的 chart 样式
 */
export { defaultChartColors, defaultPieOption, defaultBarOption, defaultLineOption } from './chart-variable'

import { scoreColor } from './chart-variable'

export const tableOption = [{ prop: 'name', label: '名称' }, { prop: 'value', label: '次数' }]

export const vehicleScoreTableOneOption = [
  { prop: 'plate_no', label: '车牌' },
  { prop: 'score', label: '评分（前 10 名）' }
]

export const vehicleScoreTableTwoOption = [
  { prop: 'plate_no', label: '车牌' },
  { prop: 'score', label: '评分（后 10 名）' }
]

export const barFirstOption = {
  toolbox: { show: false },
  xAxis: { splitNumber: 1 },
  series: [{ name: '柱状图随机数据' }]
}

export const barStackOption = {
  toolbox: { show: false },
  xAxis: { show: false, data: [] },
  yAxis: { show: false },
  legend: { show: false },
  angleAxis: {},
  radiusAxis: { type: 'category', z: 10 },
  polar: {},
  series: []
}

export const pieOption = { series: [{ name: '饼图随机数据' }] }

export const pieSecondOption = { series: [{ name: '饼图2随机数据', center: ['23%', '50%'] }] }

export const lineOption = { series: [{ name: '折线图随机数据' }] }

export const lineAreaOptions = { xAxis: { boundaryGap: false } }

export const alarmEventDistributionPieOption = {
  title: { text: '报警事件分布', left: '15%', top: '2%', show: true },
  legend: { orient: 'vertical', right: '25%', top: '20%', icon: 'circle' },
  series: [{ name: '事件分布', radius: '75%', center: ['25%', '55%'] }]
}

export const eventProcessingReportPieOption = {
  title: { text: '事件处理报表', left: '15%', top: '2%', show: true },
  legend: { orient: 'vertical', right: '25%', top: '25%', icon: 'circle' },
  series: [{ name: '事件处理', radius: '75%', center: ['25%', '55%'] }]
}

export const alarmIntervalDistributionLineOption = {
  legend: { left: '10%', data: ['在线车辆', '报警事件次数'] },
  tooltip: { formatter: '{b} 点<br />在线车辆 {c} 辆' },
  yAxis: [{ type: 'value', name: '辆' }, { type: 'value', name: '次' }],
  xAxis: { type: 'category' },
  grid: { top: '15%' },
  series: [
    { name: '在线车辆', type: 'bar', yAxisIndex: 0 },
    { name: '报警事件次数', type: 'line', yAxisIndex: 1, areaStyle: {} }
  ]
}

export const vehicleScorePieOption = {
  legend: { left: '35%', bottom: '10%' },
  grid: { top: '10%' },
  series: { name: '车辆评分', center: ['50%', '35%'], radius: '60%' }
}

export const drivingScoreLineOption = {
  series: { name: '驾驶评分', smooth: true },
  grid: { top: '12%' },
  yAxis: [{ type: 'value', name: '分' }],
  visualMap: {
    show: false,
    pieces: [
      { gte: 0, lt: 40, color: scoreColor[3] },
      { gte: 40, lt: 60, color: scoreColor[2] },
      { gte: 60, lt: 80, color: scoreColor[1] },
      { gte: 80, lt: 100, color: scoreColor[0] }
    ]
  }
}

export const drivingScoreBarOption = {
  toolbox: { show: false },
  yAxis: { type: 'value', name: '人', axisLine: { show: false }, splitLine: { show: false } },
  xAxis: { axisLine: { show: false }, splitLine: { show: false } },
  series: [{ name: '驾驶评分' }],
  legend: { show: false }
}

export const eventName = [
  { prop: 'pcw', name: '行人碰撞提示' },
  { prop: 'fcw', name: '车辆碰撞预警' },
  { prop: 'ldw', name: '频繁变道' },
  { prop: 'hmw', name: '长时间跟车过近' },
  { prop: 'sli', name: '连续超速' },
  { prop: 'cw', name: '疑似碰撞及侧翻' },
  { prop: 'drastic', name: '激烈驾驶' }
]

export const eventDealName = [
  { prop: 'untreat', name: '未处理' },
  { prop: 'comms', name: '已与司机确认沟通' },
  { prop: 'park', name: '建议停车休息' },
  { prop: 'slow', name: '建议降低车速' },
  { prop: 'ignore', name: '正常情况可忽略' },
  { prop: 'other', name: '其他' }
]
