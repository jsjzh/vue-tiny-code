<template>
  <base-chart-bar class="flex-1" ref="chart" @reload="reloadChart"/>
</template>

<script>
import baseChartBar from "../../base/base-chart-bar";
import { barStackOption } from "../../js/variable";

export default {
  name: "custom-report-component-chart-bar-stack",
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
  components: { baseChartBar },
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
