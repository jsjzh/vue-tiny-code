/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:34:43
 * @LastEditTime: 2019-03-08 11:15:05
 * @Description: 组件公用变量
 */
export { defaultChartColors, defaultPieOption, defaultBarOption, defaultLineOption } from './chart-variable'

export const tableOption = [
  { prop: 'name', label: '名称' },
  { prop: 'value', label: '报警' },
  { prop: 'count', label: '次数' }
]

export const barOption = {
  toolbox: { show: false },
  xAxis: { splitNumber: 1 },
  series: [{ name: '柱状图随机数据' }]
}

export const pieOption = { series: [{ name: '饼图随机数据' }] }

export const pieTwoOption = { series: [{ name: '饼图2随机数据', center: ['70%', '65%'] }] }

export const lineOption = { series: [{ name: '折线图随机数据' }] }

export const workingTimeDistributionPieChartOption = {
  series: [{ name: '报警类型分布', center: ['50%', '45%'] }],
  legend: { orient: 'horizontal', left: 'center', bottom: '5%', icon: 'circle' }
}

export const workingTimetimeTendencyLineChartOption = { series: [{ name: '作业趋势' }] }

export const fullTabsGradeAverage = {
  grid: { top: '20%' },
  legend: { top: '2%' },
  series: [
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '行业平均' },
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '当前车辆' }
  ]
}

export const fullTabsGradeHighway = {
  grid: { top: '20%' },
  legend: { top: '2%' },
  series: [
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '高速' },
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '非高速' }
  ]
}

export const fullTabsGradeTime = {
  grid: { top: '20%' },
  legend: { top: '2%' },
  series: [
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '日间' },
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '夜间' }
  ]
}

export const fullTabsGradeDimension = {
  grid: { top: '20%' },
  legend: { top: '2%' },
  series: [
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '碰撞' },
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '偏道' },
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '超速' },
    { type: 'line', symbolSize: 5, symbol: 'circle', smooth: true, name: '车距' }
  ]
}
