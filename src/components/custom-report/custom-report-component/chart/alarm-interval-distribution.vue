<template>
  <base-chart-line ref="chart" @reload="reloadChart"/>
</template>

<script>
import baseChartLine from "../../base/base-chart-line";
import { alarmIntervalDistributionLineOption } from "../../js/variable";

export default {
  name: "custom-report-component-chart-alarm-interval-distribution",
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
        this.renderCharts(newVal);
      }
    }
  },
  components: { baseChartLine },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(alarmIntervalDistributionLineOption);
      this.reportData.length && this.renderCharts(this.reportData);
    },
    renderCharts(option) {
      let { chart } = this.$refs;
      chart.setOption({
        xAxis: { data: option.map(info => info.hour) },
        series: [
          { data: option.map(info => info.vehicle_count) },
          { data: option.map(info => info.operation_count) }
        ]
      });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>
