<template>
  <base-chart-bar class="flex-1" ref="chart" @reload="reloadChart"/>
</template>

<script>
import baseChartBar from "../../base/base-chart-bar";
import { drivingScoreBarOption } from "../../js/variable";
import { scoreColor } from "../../js/chart-variable";

export default {
  name: "custom-report-component-chart-driving-score-bar",
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
      chart.setOption(drivingScoreBarOption);
      this.reportData.length && this.renderChart(this.reportData);
    },
    renderChart(option) {
      let { chart } = this.$refs;
      let obj = {};
      option.forEach(info => {
        Object.keys(info).forEach(key => {
          let item = info[key];
          if (!obj[key]) {
            obj[key] = [];
          }
          obj[key].push(item);
        });
      });
      chart.setOption({
        xAxis: { data: option.map(info => info.date) },
        series: [
          {
            name: null,
            type: "bar",
            stack: "score",
            barWidth: "101%",
            data: obj.bad,
            itemStyle: { color: scoreColor[3] }
          },
          {
            name: null,
            type: "bar",
            stack: "score",
            data: obj.normal,
            itemStyle: { color: scoreColor[2] }
          },
          {
            name: null,
            type: "bar",
            stack: "score",
            data: obj.good,
            itemStyle: { color: scoreColor[1] }
          },
          {
            name: null,
            type: "bar",
            stack: "score",
            data: obj.excellent,
            itemStyle: { color: scoreColor[0] }
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
