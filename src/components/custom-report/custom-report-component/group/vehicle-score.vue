<template>
  <div style="display: flex;flex: 1">
    <base-table
      style="flex: 3;margin-right: 20px"
      indexTitle="排名"
      :tableData="topTen"
      :tableOption="vehicleScoreTableOneOption"
    />
    <base-table
      style="flex: 3"
      indexTitle="排名"
      :tableData="lastTen"
      :tableOption="vehicleScoreTableTwoOption"
    />
    <base-chart-pie ref="chart" style="flex: 2" @reload="reloadChart"/>
  </div>
</template>

<script>
import baseTable from "../../base/base-table";
import baseChartPie from "../../base/base-chart-pie";
import {
  vehicleScoreTableOneOption,
  vehicleScoreTableTwoOption,
  vehicleScorePieOption
} from "../../js/variable";
import { scoreColor } from "../../js/chart-variable";

export default {
  name: "custom-report-component-group-vehicle-score",
  data() {
    return {
      vehicleScoreTableOneOption,
      vehicleScoreTableTwoOption,
      topTen: [],
      lastTen: []
    };
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
        this.renderTable(newVal);
        this.renderChart(newVal);
      }
    }
  },
  components: { baseTable, baseChartPie },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    reloadChart() {
      let { chart } = this.$refs;
      chart.setOption(vehicleScorePieOption);
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;

      chart.setOption({
        series: [
          {
            data: [
              {
                name: "0 <= score < 40",
                itemStyle: { color: scoreColor[3] },
                value: option.filter(info => 0 <= info.score && info.score < 40)
                  .length
              },
              {
                name: "40 <= score < 60",
                itemStyle: { color: scoreColor[2] },
                value: option.filter(
                  info => 40 <= info.score && info.score < 60
                ).length
              },
              {
                name: "60 <= score < 80",
                itemStyle: { color: scoreColor[1] },
                value: option.filter(
                  info => 60 <= info.score && info.score < 80
                ).length
              },
              {
                name: "80 <= score < 100",
                itemStyle: { color: scoreColor[0] },
                value: option.filter(
                  info => 80 <= info.score && info.score < 100
                ).length
              }
            ]
          }
        ]
      });
    },
    renderTable(data) {
      this.topTen = data
        .slice()
        .sort((a, b) => -(a.score - b.score))
        .slice(0, 10);
      this.lastTen = data
        .slice()
        .sort((a, b) => a.score - b.score)
        .slice(0, 10);
    }
  },
  mounted() {
    this.renderTable(this.reportData);
    this.reloadChart();
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/index.scss";
</style>

