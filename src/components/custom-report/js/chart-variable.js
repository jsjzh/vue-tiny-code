/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-27 11:18:09
 * @LastEditTime: 2019-03-11 16:55:58
 * @Description: 该文件只是为了方便管理 default-chart-option，在 variable 中会将这些变量曝露出去
 */

export const defaultChartColors = [
  '#ee7738',
  '#f59d2a',
  '#fcc419',
  '#ffe066',
  '#9bca63',
  '#b5c334',
  '#5e85a8',
  '#476480',
  '#34495d',
  '#2c3d4f'
]

/**
 * color 颜色系
 * title chart 标题
 * legend 图例组件
 * tooltip 提示框组件
 * series 系列列表
 * toolbox 工具栏
 * grid 网格
 * xAxis X 轴相关
 * yAxis Y 轴相关
 */

const pieDefaultData = [
  { value: 335, name: 'no-data-1' },
  { value: 310, name: 'no-data-2' },
  { value: 234, name: 'no-data-3' },
  { value: 135, name: 'no-data-4' },
  { value: 465, name: 'no-data-5' },
  { value: 379, name: 'no-data-6' },
  { value: 664, name: 'no-data-7' }
]

const barDefaultXData = ['no-data-1', 'no-data-2', 'no-data-3', 'no-data-4', 'no-data-5', 'no-data-6', 'no-data-7']
const barDefaultData = [120, 200, 150, 80, 70, 110, 130]

const lineDefaultXData = ['no-data-1', 'no-data-2', 'no-data-3', 'no-data-4', 'no-data-5', 'no-data-6', 'no-data-7']
const lineDefaultData = [820, 932, 901, 934, 1290, 1330, 1320]

export const defaultPieOption = {
  color: defaultChartColors,
  title: { show: false },
  legend: { orient: 'vertical', left: '5%', top: '15%', icon: 'circle' },
  tooltip: { confine: true, trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
  series: [
    {
      name: '未命名饼图',
      type: 'pie',
      radius: '55%',
      minAngle: 5,
      center: ['65%', '60%'],
      itemStyle: { normal: { borderWidth: 1, borderColor: '#e5e5e5' } },
      label: { show: false },
      labelLine: { show: false },
      data: pieDefaultData
    }
  ]
}

export const defaultBarOption = {
  color: defaultChartColors,
  tooltip: { confine: true, trigger: 'axis', axisPointer: { type: 'cross' }, formatter: '{a} <br/>{b} {c}' },
  legend: { left: 0, top: 0 },
  toolbox: { show: true, feature: { magicType: { show: true, type: ['line', 'bar'] }, restore: { show: true } } },
  grid: { left: '5%', right: '5%', top: '15%', bottom: 0, containLabel: true },
  xAxis: { data: barDefaultXData, axisPointer: { type: 'shadow' } },
  yAxis: { type: 'value' },
  series: [{ name: '未命名柱状图', type: 'bar', barWidth: '50%', data: barDefaultData }]
}

export const defaultLineOption = {
  color: defaultChartColors,
  tooltip: { confine: true, trigger: 'axis', axisPointer: { type: 'cross' } },
  grid: { left: '5%', right: '5%', top: '10%', bottom: 0, containLabel: true },
  xAxis: { type: 'category', boundaryGap: false, data: lineDefaultXData },
  yAxis: { type: 'value' },
  series: [{ name: '未命名曲线图图', type: 'line', data: lineDefaultData, smooth: false }]
}
