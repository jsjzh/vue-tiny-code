<template>
  <div class="flex flex-1">
    <base-table
      style="flex: 3;margin-right: 20px"
      indexTitle="排名"
      :tableData="reportData.ranking_top_10"
      :tableOption="vehicleScoreTableOneOption"
    />
    <base-table
      style="flex: 3"
      indexTitle="排名"
      :tableData="reportData.ranking_tail_10"
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
      vehicleScoreTableTwoOption
    };
  },
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
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
      chart.setOption(vehicleScorePieOption);
      this.reportData && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;
      chart.setOption({
        series: [
          {
            data: [
              {
                name: "40 分以下",
                itemStyle: { color: scoreColor[3] },
                value: option.bad
              },
              {
                name: "40 分 - 60 分",
                itemStyle: { color: scoreColor[2] },
                value: option.normal
              },
              {
                name: "60 分 - 80 分",
                itemStyle: { color: scoreColor[1] },
                value: option.good
              },
              {
                name: "80 分 - 100 分",
                itemStyle: { color: scoreColor[0] },
                value: option.excellent
              }
            ]
          }
        ]
      });
    }
  },
  mounted() {
    this.reloadChart();
  }
};
</script>