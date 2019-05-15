<template>
  <div class="flex flex-1">
    <base-chart-bar ref="bar-chart" style="flex: 5" @reload="reloadChart"/>
    <base-chart-pie ref="pie-chart" style="flex: 5" @reload="reloadChart"/>
  </div>
</template>

<script>
import baseChartBar from "../../base/base-chart-bar";
import baseChartPie from "../../base/base-chart-pie";

import { barFirstOption, pieSecondOption } from "../../js/variable";

export default {
  name: "custom-report-component-chart-bar-pie",
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
  components: { baseChartBar, baseChartPie },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      Object.keys(this.$refs).forEach(chart => {
        switch (chart) {
          case "bar-chart":
            this.$refs[chart].setOption(barFirstOption);
            break;
          case "pie-chart":
            this.$refs[chart].setOption(pieSecondOption);
            break;
        }
      });
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      Object.keys(this.$refs).forEach(chart => {
        switch (chart) {
          case "bar-chart":
            this.$refs[chart].setOption({
              xAxis: {
                data: option.map(item => item.name)
              },
              series: {
                data: option.map(item => item.value)
              }
            });
            break;
          case "pie-chart":
            this.$refs[chart].setOption({
              series: {
                data: option.map(item => ({
                  name: item.name,
                  value: item.value
                }))
              }
            });
            break;
        }
      });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>