<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-07 18:15:40
 * @Description: custom-report-bar-pie-module
 -->
<template>
  <div style="display: flex">
    <default-bar-chart ref="bar-chart" style="flex: 6" @reload="reloadChart"/>
    <default-pie-chart ref="pie-chart" style="flex: 4" @reload="reloadChart"/>
  </div>
</template>

<script>
import defaultBarChart from "./default-bar-chart";
import defaultPieChart from "./default-pie-chart";

import { barOption, pieOption } from "./js/variable";

import { transBarChartData, transPieChartData } from "@/utils";

export default {
  name: "custom-report-bar-pie-module",
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
    },
    pieChartData: {
      handler(newVal, oldVal) {
        // 父组件数据更新触发 echart 更新
        this.renderPieChart(newVal);
      }
    }
  },
  components: { defaultBarChart, defaultPieChart },
  methods: {
    reloadChart() {
      Object.keys(this.$refs).forEach(chart => {
        chart.setOption(pieOption);
        this.renderChart(this.reportData);
      });
    },
    reloadChart() {
      let pieChart = this.$refs["pie-chart"];
      pieChart.setOption(pieChartOption);
      this.renderPieChart(this.pieChartData);
    },
    renderPieChart(option) {
      let pieChart = this.$refs["pie-chart"];
      pieChart.setOption({
        series: [
          {
            data: [
              { value: option.work_day_count, name: "日间" },
              { value: option.work_night_count, name: "夜间" }
            ]
          }
        ]
      });
    },
    // 开发模式下，热加载组件触发 echart 更新
    // 正常使用不会触发这个
    reloadChart(instance) {
      let barChart = this.$refs["bar-chart"];
      barChart.setOption(barChartOption);
      this.renderBarChart(this.barChartData);
    },
    renderBarChart(option) {
      let barChart = this.$refs["bar-chart"];
      let { name, value } = transBarChartData(
        {
          valueKey: "count",
          nameKey: "name",
          toValueKey: "value",
          toNameKey: "name"
        },
        option
      );
      barChart.setOption({
        xAxis: { data: name },
        series: [{ data: value }]
      });
    }
  },
  mounted() {
    let barChart = this.$refs["bar-chart"];
    let pieChart = this.$refs["pie-chart"];
    barChart.setOption(barChartOption);
    pieChart.setOption(pieChartOption);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>

