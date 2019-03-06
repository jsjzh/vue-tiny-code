<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-27 14:46:40
 * @Description: custom-report-working-time-tendency
 -->
<template>
  <div class="custom-container">
    <div class="custom-item custom-title">{{title}}</div>
    <div class="custom-table-line-container">
      <default-line-chart ref="line-chart" style="flex: 1" @reload="handleLineReload"/>
    </div>
  </div>
</template>

<script>
import defaultContainer from "./default-container";
import defaultLineChart from "./default-line-chart";
import { workingTimetimeTendencyLineChartOption as chartOption } from "./js/variable";
import { transLineChartData } from "@/utils";

export default {
  name: "custom-report-working-time-tendency",
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
      // 暂时不需要，该组件没有对应接口，使用假数据
      handler(newVal, oldVal) {
        console.log(newVal);
        // 父组件数据更新触发 echart 更新
        this.renderLineChart(newVal);
      }
    }
  },
  components: { defaultContainer, defaultLineChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    // 正常使用不会触发这个
    // 暂时不需要，该组件没有对应接口，使用假数据
    handleLineReload(instance) {
      let lineChart = this.$refs["line-chart"];
      lineChart.renderChart(chartOption);
      this.renderLineChart(this.reportData);
    },
    renderLineChart(option) {
      let lineChart = this.$refs["line-chart"];
      let { name, value } = transLineChartData(
        {
          valueKey: "work_count",
          nameKey: "date",
          toValueKey: "value",
          toNameKey: "name"
        },
        option
      );
      lineChart.renderChart({
        xAxis: { data: name },
        series: [{ data: value }]
      });
    }
  },
  mounted() {
    let lineChart = this.$refs["line-chart"];
    lineChart.renderChart(chartOption);
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
  & .custom-table-line-container {
    @include default-flex;
    width: 100%;
    height: 100%;
  }
}
</style>

