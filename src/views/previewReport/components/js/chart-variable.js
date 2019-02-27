/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-27 11:18:09
 * @LastEditTime: 2019-02-27 18:08:38
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
  { value: 335, name: '直接访问' },
  { value: 310, name: '邮件营销' },
  { value: 234, name: '联盟广告' },
  { value: 135, name: '视频广告' },
  { value: 1548, name: '搜索引擎' }
]

const barDefaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const barDefaultData = [120, 200, 150, 80, 70, 110, 130]

const lineDefaultXData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const lineDefaultData = [820, 932, 901, 934, 1290, 1330, 1320]

export const defaultPieOption = {
  color: defaultChartColors,
  title: { show: false },
  legend: { orient: 'vertical', left: '5%', top: '0', icon: 'circle' },
  tooltip: { confine: true, trigger: 'item', formatter: '{a} <br/>{b}: {c} ({d}%)' },
  series: [
    {
      name: '未命名饼图',
      type: 'pie',
      radius: '55%',
      minAngle: 5,
      center: ['75%', '65%'],
      itemStyle: { normal: { borderWidth: 1, borderColor: '#e5e5e5' } },
      label: { show: false },
      labelLine: { show: false },
      data: pieDefaultData
    }
  ]
}

export const defaultBarOption = {
  color: defaultChartColors,
  tooltip: { confine: true, trigger: 'axis', axisPointer: { type: 'cross' }, formatter: '{a} <br/>{b}点 {c}次' },
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
  series: [{ name: '未命名曲线图图', type: 'line', data: lineDefaultData, smooth: true }]
}
