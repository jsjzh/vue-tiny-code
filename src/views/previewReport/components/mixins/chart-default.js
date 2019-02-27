/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-27 10:20:10
 * @LastEditTime: 2019-02-27 15:41:05
 * @Description: chart 实例默认 mixin 配置
 */
import { defaultLineOption, defaultPieOption, defaultBarOption } from '../js/variable'

const chartOptions = { defaultLineOption, defaultPieOption, defaultBarOption }

export default {
  methods: {
    // 同时还接受父组件传来的 option
    renderChart(option) {
      this.$$chartInstance && this.$$chartInstance.setOption(option)
    },
    handleResize() {
      this.$nextTick(() => {
        typeof this.$$chartInstance === 'object' && this.$$chartInstance.resize()
      })
    },
    initChart(refName) {
      let chartDom = this.$refs[refName]
      this.$$chartInstance = this.$echarts.init(chartDom)
    },
    addResizeListener() {
      this.$$events.resize = _.debounce(this.handleResize, 200, true)
      window.addEventListener('resize', this.$$events.resize)
    }
  },
  mounted() {
    this.$$chartInstance = null
    this.$$events = {
      resize: null
    }

    this.initChart(this.$options.name)
    this.renderChart(chartOptions[this.optionName])
    this.$emit('reload', this.$$chartInstance)
    this.addResizeListener()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$$events.resize)
    this.$$chartInstance.dispose()
    this.$$chartInstance = null
    this.$$events.resize = null
    this.$$events = null
  }
}
