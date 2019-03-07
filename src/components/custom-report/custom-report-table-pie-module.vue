<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-07 22:34:03
 * @Description: custom-report-table-pie-module
 -->
<template>
  <div style="display: flex">
    <default-table style="flex: 6" :tableData="reportData" :tableOption="tableOption"/>
    <default-pie-chart ref="chart" style="flex: 4" @reload="reloadChart"/>
  </div>
</template>

<script>
import defaultTable from "./default-table";
import defaultPieChart from "./default-pie-chart";
import { tableOption, pieOption } from "./js/variable";

export default {
  name: "custom-report-table-pie-module",
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
  components: { defaultTable, defaultPieChart },
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

<style lang="scss" scoped>
@import "./css/index.scss";
</style>

