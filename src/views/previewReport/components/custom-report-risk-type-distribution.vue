<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-26 14:44:53
 * @Description: custom-report-risk-type-distribution
 -->
<template>
  <default-container class="custom-container">
    <div class="custom-item custom-title">{{title}}</div>
    <div class="custom-table-pie-container">
      <default-table style="flex: 6" :tableData="reportData" :tableOption="tableOption"/>
      <default-pie-chart ref="pie-chart" style="flex: 4" @reload="handlePieReload"/>
    </div>
  </default-container>
</template>

<script>
import defaultContainer from "./default-container";
import defaultTable from "./default-table";
import defaultPieChart from "./default-pie-chart";
import {
  riskTypeDistributeTableOption as tableOption,
  riskTypeDistributeChartOption as chartOption
} from "./js/variable";
import { transPieChartData } from "@/utils";

export default {
  name: "custom-report-risk-type-distribution",
  data() {
    return { tableOption };
  },
  props: {
    title: {
      type: String,
      default: "未命名组件"
    },
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
        this.renderPieChart(newVal);
      }
    }
  },
  components: { defaultContainer, defaultTable, defaultPieChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    // 正常使用不会触发这个
    handlePieReload(instance) {
      let pieChart = this.$refs["pie-chart"];
      pieChart.renderChart(chartOption);
      this.renderPieChart(this.reportData);
    },
    renderPieChart(option) {
      let pieChart = this.$refs["pie-chart"];
      let data = transPieChartData(
        {
          valueKey: "alarms",
          nameKey: "name",
          toValueKey: "value",
          toNameKey: "name"
        },
        option
      );
      pieChart.renderChart({ series: [{ data }] });
    }
  },
  mounted() {
    let pieChart = this.$refs["pie-chart"];
    pieChart.renderChart(chartOption);
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";
@import "./css/variable.scss";
.custom-container {
  @include componentContainer;
  & .custom-item {
    @include flexFullRow;
  }
  & .custom-title {
    @include title-4_8;
  }
  & .custom-table-pie-container {
    @include default-flex;
    width: 100%;
    height: 100%;
  }
}
</style>

