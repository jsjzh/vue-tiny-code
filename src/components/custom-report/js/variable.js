/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:34:43
 * @LastEditTime: 2019-05-09 08:26:39
 * @Description:
 *  组件公用变量
 *  该处不设置 data 相关内容，只设置一些特殊的 chart 样式
 */
export { defaultChartColors, defaultPieOption, defaultBarOption, defaultLineOption } from './chart-variable'

import { scoreColor } from './chart-variable'

export const tableOption = [{ prop: 'name', label: '名称' }, { prop: 'value', label: '次数' }]

export const vehicleScoreTableOneOption = [
  { prop: 'plate', label: '车牌' },
  { prop: 'score', label: '评分（前 10 名）' }
]

export const vehicleScoreTableTwoOption = [
  { prop: 'plate', label: '车牌' },
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

export const alarmEventDistributionPieOption = {
  title: { text: 'alarm-event-distribution', left: '5%', top: '2%', show: true },
  legend: { orient: 'vertical', right: '15%', top: '20%', icon: 'circle' },
  series: [{ name: '饼图2随机数据', radius: '70%', center: ['25%', '55%'] }]
}

export const eventProcessingReportPieOption = {
  title: { text: 'event-processing-report', left: '5%', top: '2%', show: true },
  legend: { orient: 'vertical', right: '10%', top: '25%', icon: 'circle' },
  series: [{ name: '饼图2随机数据', radius: '70%', center: ['25%', '55%'] }]
}

export const alarmIntervalDistributionLineOption = {
  legend: { left: '10%', data: ['online-vehicle', 'alarm-events'] },
  yAxis: [{ type: 'value', name: 'car' }, { type: 'value', name: 'count' }],
  xAxis: { type: 'category' },
  grid: { top: '15%' },
  series: [
    { name: 'online-vehicle', type: 'bar', yAxisIndex: 1 },
    { name: 'alarm-events', type: 'line', yAxisIndex: 0, areaStyle: {} }
  ]
}

export const vehicleScorePieOption = {
  legend: { left: 'center', bottom: '10%' },
  grid: { top: '10%' },
  series: {
    name: 'vehicle-score',
    center: ['50%', '35%'],
    radius: '60%'
  }
}

export const drivingScoreLineOption = {
  series: { name: 'driving-score', smooth: true },
  yAxis: [{ type: 'value', name: 'score' }],
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
  yAxis: { type: 'value', axisLine: { show: false }, splitLine: { show: false } },
  xAxis: { axisLine: { show: false }, splitLine: { show: false } },
  legend: { show: false }
}
