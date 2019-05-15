<template>
  <div class="flex flex-1">
    <base-table style="flex: 6" :tableData="reportData" :tableOption="tableOption"/>
    <base-chart-pie ref="chart" style="flex: 4" @reload="reloadChart"/>
  </div>
</template>

<script>
import baseTable from "../../base/base-table";
import baseChartPie from "../../base/base-chart-pie";
import { tableOption, pieOption } from "../../js/variable";

export default {
  name: "custom-report-component-group-table-pie",
  data() {
    return { tableOption };
  },
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
  components: { baseTable, baseChartPie },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(pieOption);
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;
      chart.setOption({ series: [{ data: option }] });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>
