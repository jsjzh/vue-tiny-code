/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:34:43
 * @LastEditTime: 2019-03-11 16:42:12
 * @Description:
 *  组件公用变量
 *  该处不设置 data 相关内容，只设置一些特殊的 chart 样式
 */
export { defaultChartColors, defaultPieOption, defaultBarOption, defaultLineOption } from './chart-variable'

export const tableOption = [{ prop: 'name', label: '名称' }, { prop: 'value', label: '次数' }]

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

export const pieSecondOption = { series: [{ name: '饼图2随机数据', center: ['70%', '65%'] }] }

export const lineOption = { series: [{ name: '折线图随机数据' }] }
