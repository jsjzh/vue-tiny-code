<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-27 18:25:52
 * @Description: custom-report-alarm-speed-distribution
 -->
<template>
  <default-container class="custom-container">
    <div class="custom-item custom-title">{{title}}</div>
    <div class="custom-table-pie-container">
      <default-pie-chart ref="pie-chart" style="flex: 1" @reload="handlePieReload"/>
    </div>
  </default-container>
</template>

<script>
import defaultContainer from "./default-container";
import defaultPieChart from "./default-pie-chart";
import { alarmSpeedDistribution as chartOption } from "./js/variable";
import { transPieChartData } from "@/util/pageUtil";

export default {
  name: "custom-report-alarm-speed-distribution",
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
  watch: {
    // reportData: {
    // 暂时不需要，该组件没有对应接口，使用假数据
    // handler(newVal, oldVal) {
    //   // 父组件数据更新触发 echart 更新
    //   this.renderPieChart(newVal);
    // }
    // }
  },
  components: { defaultContainer, defaultPieChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    // 正常使用不会触发这个
    // 暂时不需要，该组件没有对应接口，使用假数据
    handlePieReload(instance) {
      let pieChart = this.$refs["pie-chart"];
      pieChart.renderChart(chartOption);
      // this.renderPieChart(this.reportData);
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
  & .custom-table-pie-container {
    @include defaultFlex;
    width: 100%;
    height: 100%;
  }
}
</style>

