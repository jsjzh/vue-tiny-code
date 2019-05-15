<template>
  <base-chart-line class="flex-1" ref="chart" @reload="reloadChart"/>
</template>

<script>
import baseChartLine from "../../base/base-chart-line";
import { lineAreaOptions } from "../../js/variable";

export default {
  name: "custom-report-component-chart-line-area",
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
  components: { baseChartLine },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(lineAreaOptions);
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        xAxis: { data: option.map(item => item.xdata) },
        series: option.map(item => ({
          type: "line",
          name: item.name,
          areaStyle: {},
          data: item.arrData
        }))
      });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>