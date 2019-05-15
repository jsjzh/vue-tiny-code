
<template>
  <base-chart-line class="flex-1" ref="chart" @reload="reloadChart"/>
</template>

<script>
import baseChartLine from "../../base/base-chart-line";
import { drivingScoreLineOption } from "../../js/variable";

export default {
  name: "custom-report-component-chart-driving-score-line",
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
  components: { baseChartLine },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(drivingScoreLineOption);
      this.reportData.length && this.renderLineChart(this.reportData);
    },
    renderLineChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        xAxis: { data: option.map(item => item.date) },
        series: [{ data: option.map(item => item.score) }]
      });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>
