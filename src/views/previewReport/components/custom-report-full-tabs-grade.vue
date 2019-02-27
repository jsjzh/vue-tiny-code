<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-27 15:38:06
 * @Description: custom-report-working-time-tendency
 -->
<template>
  <default-container class="custom-container">
    <div class="custom-item custom-title">{{title}}</div>
    <div class="custom-table-line-container">
      <el-tabs style="width: 100%;height: 100%" v-model="activeName" @tab-click="handleToggleTabs">
        <el-tab-pane style="width: 100%;height: 100%" label="评分趋势" name="average">
          <default-line-chart ref="line-chart-one" @reload="handleLineReload"/>
        </el-tab-pane>
        <el-tab-pane style="width: 100%;height: 100%" label="区域评分" name="highway">
          <default-line-chart ref="line-chart-two" @reload="handleLineReload"/>
        </el-tab-pane>
        <el-tab-pane style="width: 100%;height: 100%" label="时段评分" name="time">
          <default-line-chart ref="line-chart-three" @reload="handleLineReload"/>
        </el-tab-pane>
        <el-tab-pane style="width: 100%;height: 100%" label="维度评分" name="dimension">
          <default-line-chart ref="line-chart-four" @reload="handleLineReload"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </default-container>
</template>

<script>
import defaultContainer from "./default-container";
import defaultLineChart from "./default-line-chart";
import {
  fullTabsGradeAverage,
  fullTabsGradeHighway,
  fullTabsGradeTime,
  fullTabsGradeDimension
} from "./js/variable";
import { transLineChartData } from "@/util/pageUtil";

export default {
  name: "custom-report-full-tabs-grade",
  data() {
    return {
      activeName: "average"
    };
  },
  props: {
    title: {
      type: String,
      default: "未命名组件"
    },
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    chartData() {
      return this.reportData.score_day_trend || [];
    }
  },
  watch: {
    chartData: {
      // 暂时不需要，该组件没有对应接口，使用假数据
      handler(newVal, oldVal) {
        console.log(newVal);
        // 父组件数据更新触发 echart 更新
        this.renderLineChart(newVal);
      }
    }
  },
  components: { defaultContainer, defaultLineChart },
  methods: {
    // 开发模式下，热加载组件触发 echart 更新
    // 正常使用不会触发这个
    // 暂时不需要，该组件没有对应接口，使用假数据
    handleToggleTabs() {
      let lineChartOne = this.$refs["line-chart-one"];
      let lineChartTwo = this.$refs["line-chart-two"];
      let lineChartThree = this.$refs["line-chart-three"];
      let lineChartFour = this.$refs["line-chart-four"];
      lineChartOne.handleResize();
      lineChartTwo.handleResize();
      lineChartThree.handleResize();
      lineChartFour.handleResize();
    },
    handleLineReload(instance) {
      let lineChartOne = this.$refs["line-chart-one"];
      let lineChartTwo = this.$refs["line-chart-two"];
      let lineChartThree = this.$refs["line-chart-three"];
      let lineChartFour = this.$refs["line-chart-four"];
      lineChartOne.renderChart(fullTabsGradeAverage);
      lineChartTwo.renderChart(fullTabsGradeHighway);
      lineChartThree.renderChart(fullTabsGradeTime);
      lineChartFour.renderChart(fullTabsGradeDimension);
      this.renderLineChart(this.chartData);
    },
    renderLineChart(option) {
      let lineChartOne = this.$refs["line-chart-one"];
      let lineChartTwo = this.$refs["line-chart-two"];
      let lineChartThree = this.$refs["line-chart-three"];
      let lineChartFour = this.$refs["line-chart-four"];
      // score_ind
      // dept_score

      // montorway_score
      // city_score

      // night_score
      // day_score

      // fcw_score
      // ldw_score
      // sli_score
      // hmw_score
      let { date, score_ind } = transLineChartData(
        {
          valueKey: "score_ind",
          nameKey: "date",
          toValueKey: "score_ind",
          toNameKey: "date"
        },
        option
      );
      let { dept_score } = transLineChartData(
        {
          valueKey: "dept_score",
          nameKey: "date",
          toValueKey: "dept_score",
          toNameKey: "date"
        },
        option
      );

      let { montorway_score } = transLineChartData(
        {
          valueKey: "montorway_score",
          nameKey: "date",
          toValueKey: "montorway_score",
          toNameKey: "date"
        },
        option
      );

      let { city_score } = transLineChartData(
        {
          valueKey: "city_score",
          nameKey: "date",
          toValueKey: "city_score",
          toNameKey: "date"
        },
        option
      );

      let { night_score } = transLineChartData(
        {
          valueKey: "night_score",
          nameKey: "date",
          toValueKey: "night_score",
          toNameKey: "date"
        },
        option
      );

      let { day_score } = transLineChartData(
        {
          valueKey: "day_score",
          nameKey: "date",
          toValueKey: "day_score",
          toNameKey: "date"
        },
        option
      );

      let { fcw_score } = transLineChartData(
        {
          valueKey: "fcw_score",
          nameKey: "date",
          toValueKey: "fcw_score",
          toNameKey: "date"
        },
        option
      );

      let { ldw_score } = transLineChartData(
        {
          valueKey: "ldw_score",
          nameKey: "date",
          toValueKey: "ldw_score",
          toNameKey: "date"
        },
        option
      );

      let { sli_score } = transLineChartData(
        {
          valueKey: "sli_score",
          nameKey: "date",
          toValueKey: "sli_score",
          toNameKey: "date"
        },
        option
      );

      let { hmw_score } = transLineChartData(
        {
          valueKey: "hmw_score",
          nameKey: "date",
          toValueKey: "hmw_score",
          toNameKey: "date"
        },
        option
      );

      lineChartOne.renderChart(
        {
          xAxis: { data: date },
          series: [
            { type: "line", data: score_ind },
            { type: "line", data: dept_score }
          ]
        },
        option
      );
      lineChartTwo.renderChart(
        {
          xAxis: { data: date },
          series: [
            { type: "line", data: montorway_score },
            { type: "line", data: city_score }
          ]
        },
        option
      );
      lineChartThree.renderChart(
        {
          xAxis: { data: date },
          series: [
            { type: "line", data: night_score },
            { type: "line", data: day_score }
          ]
        },
        option
      );
      lineChartFour.renderChart(
        {
          xAxis: { data: date },
          series: [
            { type: "line", data: fcw_score },
            { type: "line", data: ldw_score },
            { type: "line", data: sli_score },
            { type: "line", data: hmw_score }
          ]
        },
        option
      );
    }
  },
  mounted() {
    let lineChartOne = this.$refs["line-chart-one"];
    let lineChartTwo = this.$refs["line-chart-two"];
    let lineChartThree = this.$refs["line-chart-three"];
    let lineChartFour = this.$refs["line-chart-four"];
    lineChartOne.renderChart(fullTabsGradeAverage);
    lineChartTwo.renderChart(fullTabsGradeHighway);
    lineChartThree.renderChart(fullTabsGradeTime);
    lineChartFour.renderChart(fullTabsGradeDimension);
    this.renderLineChart(this.chartData);
    lineChartOne.handleResize();
    lineChartTwo.handleResize();
    lineChartThree.handleResize();
    lineChartFour.handleResize();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/default-variable.scss";
@import "./css/variable.scss";
.custom-container {
  @include componentContainer;
  & .custom-item {
    @include flexFullRow;
  }
  & .custom-title {
    @include title-4_8;
  }
  & .custom-table-line-container {
    @include defaultFlex;
    width: 100%;
    height: 100%;
  }
  /deep/ .el-tabs {
    display: flex;
    flex-flow: column;
    .el-tabs__header {
      @include flexFullRow;
      margin: 0;
    }
    .el-tabs__content {
      @include defaultFlex;
      @include flexFullRow;
      flex: 1;
    }
  }
}
</style>

