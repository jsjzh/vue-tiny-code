<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-11 15:02:34
 * @Description: custom-report-component-bar-stack-module
 -->
<template>
  <default-bar-chart ref="chart" @reload="reloadChart"/>
</template>

<script>
import defaultBarChart from "./default-bar-chart";
import { barStackOption } from "./js/variable";

export default {
  name: "custom-report-component-bar-stack-module",
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
  components: { defaultBarChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(barStackOption);
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        radiusAxis: {
          data: option.map(item => item.xdata)
        },
        series: option.map(item => ({
          type: "bar",
          name: item.name,
          data: item.arrData,
          coordinateSystem: "polar",
          stack: "a"
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

