<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-11 15:10:26
 * @Description: custom-report-line-area-module
 -->
<template>
  <default-line-chart ref="chart" @reload="reloadChart"/>
</template>

<script>
import defaultLineChart from "./default-line-chart";
import { lineOption } from "./js/variable";

export default {
  name: "custom-report-line-area-module",
  props: {
    reportData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    reportData: {
      handler(newVal, oldVal) {
        // 父组件数据更新触发 echart 更新
        this.renderChart(newVal);
      }
    }
  },
  components: { defaultLineChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(lineOption);
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        xAxis: { data: option.map(item => item.xdata) },
        series: option.map(item => ({
          type: "line",
          name: item.name,
          areaStyle: {},
          data: item.arrData
        }))
      });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>

