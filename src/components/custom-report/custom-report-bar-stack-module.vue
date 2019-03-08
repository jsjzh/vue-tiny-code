<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-08 11:54:05
 * @Description: custom-report-bar-stack-module
 -->
<template>
  <default-bar-chart ref="chart" @reload="reloadChart"/>
</template>

<script>
import defaultBarChart from "./default-bar-chart";
import { barOption } from "./js/variable";

export default {
  name: "custom-report-bar-stack-module",
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
  components: { defaultBarChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(barOption);
      this.reportData.length && this.renderLineChart(this.reportData);
    },
    renderLineChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        xAxis: {show: false},
        yAxis: {show: false},
        legend: {show: false},
        angleAxis: {},
        radiusAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四"],
          z: 10
        },
        polar: {},
        series: [
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            stack: "a"
          },
          {
            type: "bar",
            data: [2, 4, 6, 8],
            coordinateSystem: "polar",
            stack: "a"
          },
          {
            type: "bar",
            data: [1, 2, 3, 4],
            coordinateSystem: "polar",
            stack: "a"
          }
        ]
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

