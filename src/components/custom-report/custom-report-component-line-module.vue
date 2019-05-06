<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-06 20:53:34
 * @Description: custom-report-component-line-module
 -->
<template>
  <default-line-chart ref="chart" @reload="reloadChart"/>
</template>

<script>
import defaultLineChart from "./default-line-chart";
import { lineOption } from "./js/variable";

export default {
  name: "custom-report-component-line-module",
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
        this.renderLineChart(newVal);
      }
    }
  },
  components: { defaultLineChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(lineOption);
      this.reportData.length && this.renderLineChart(this.reportData);
    },
    renderLineChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        xAxis: { data: option.map(item => item.name) },
        series: [{ data: option.map(item => item.value) }]
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

