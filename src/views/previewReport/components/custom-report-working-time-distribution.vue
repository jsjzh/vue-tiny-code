<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-26 16:01:51
 * @Description: custom-report-working-time-distribution
 -->
<template>
  <default-container class="custom-container">
    <div class="custom-item custom-title">{{title}}</div>
    <div class="custom-table-bar-container">
      <default-bar-chart ref="bar-chart" style="flex: 6" @reload="handleBarReload"/>
      <default-pie-chart ref="pie-chart" style="flex: 4" @reload="handlePieReload"/>
    </div>
  </default-container>
</template>

<script>
import defaultContainer from "./default-container";
import defaultBarChart from "./default-bar-chart";
import defaultPieChart from "./default-pie-chart";

import {
  workingTimeDistributionBarChartOption as barChartOption,
  workingTimeDistributionPieChartOption as pieChartOption
} from "./js/variable";
import { transBarChartData, transPieChartData } from "@/util/pageUtil";

export default {
  name: "custom-report-working-time-distribution",
  props: {
    title: {
      type: String,
      default: "未命名组件"
    },
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    barChartData() {
      return this.reportData.hour_list || [];
    },
    pieChartData() {
      return this.reportData.vehicle_work_total || {};
    }
  },
  watch: {
    barChartData: {
      handler(newVal, oldVal) {
        // console.log("barChartData", newVal);
        // 父组件数据更新触发 echart 更新
        this.renderBarChart(newVal);
      }
    },
    pieChartData: {
      handler(newVal, oldVal) {
        // console.log("pieChartData", newVal);
        // 父组件数据更新触发 echart 更新
        this.renderPieChart(newVal);
      }
    }
  },
  components: { defaultContainer, defaultBarChart, defaultPieChart },
  methods: {
    handlePieReload() {
      let pieChart = this.$refs["pie-chart"];
      pieChart.renderChart(pieChartOption);
      this.renderPieChart(this.pieChartData);
    },
    renderPieChart(option) {
      let pieChart = this.$refs["pie-chart"];
      pieChart.renderChart({
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
    handleBarReload(instance) {
      let barChart = this.$refs["bar-chart"];
      barChart.renderChart(barChartOption);
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
      barChart.renderChart({
        xAxis: { data: name },
        series: [{ data: value }]
      });
    }
  },
  mounted() {
    let barChart = this.$refs["bar-chart"];
    let pieChart = this.$refs["pie-chart"];
    barChart.renderChart(barChartOption);
    pieChart.renderChart(pieChartOption);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/default-variable.scss";
@import "./css/variable.scss";
.custom-container {
  @include componentContainer;
  & .custom-item {
    @include flexFullRow;
  }
  & .custom-title {
    @include title-4_8;
  }
  & .custom-table-bar-container {
    @include default-flex;
    width: 100%;
    height: 100%;
  }
}
</style>

