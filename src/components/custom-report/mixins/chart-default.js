/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-27 10:20:10
 * @LastEditTime: 2019-05-12 11:16:18
 * @Description: chart 实例默认 mixin 配置
 */
import { debounce } from 'lodash'
import { defaultLineOption, defaultPieOption, defaultBarOption } from '../js/variable'

const chartOptions = { defaultLineOption, defaultPieOption, defaultBarOption }

export default {
  methods: {
    // 同时还接受父组件传来的 option
    setOption(option) {
      this.$$chartInstance && this.$$chartInstance.setOption(option)
      // TODO 某些情况下，页面第一次载入会不显示图表，猜想应该是 microtask 和 macrotask 的锅
      // 后续会去看看 echarts 源码里是如何 setOption 的，暂时用延时来处理
      setTimeout(() => {
        this.handleResize()
      }, 1000)
    },
    handleResize() {
      this.$nextTick(() => {
        this.$$chartInstance && typeof this.$$chartInstance === 'object' && this.$$chartInstance.resize()
      })
    },
    initChart(refName) {
      let chartDom = this.$refs[refName]
      this.$$chartInstance = this.$echarts.init(chartDom)
    },
    addResizeListener() {
      this.$$events.resize = debounce(this.handleResize, 200, true)
      window.addEventListener('resize', this.$$events.resize)
    }
  },
  mounted() {
    this.$$chartInstance = null
    this.$$events = { resize: null }

    this.initChart(this.$options.name)
    this.setOption(chartOptions[this.optionName])
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
