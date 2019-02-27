<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-27 11:16:44
 * @Description: custom-report-four-dot-eight-default
 -->
<template>
  <default-container class="custom-container">
    <div class="demo-item demo-title">{{title}}</div>
    <div class="demo-item demo-count">
      <div>
        <span class="count">{{reportData.drive_score}}&nbsp;</span>分
      </div>
      <div>
        <span class="count">{{reportData.drive_score_ind}}&nbsp;</span>分
      </div>
    </div>
    <div class="demo-item demo-rate">
      <div>
        环比
        <span class="rate">
          {{reportData.drive_score_mom}}%
          <i :class="ind_trend"></i>
        </span>
      </div>
      <div>
        环比
        <span class="rate">
          {{reportData.drive_score_ind_mom}}%
          <i :class="ind_trend"></i>
        </span>
      </div>
    </div>
  </default-container>
</template>

<script>
import defaultContainer from "./default-container";
export default {
  name: "custom-report-four-dot-eight-default",
  props: {
    title: {
      type: String,
      default: "未命名"
    },
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: { defaultContainer },
  computed: {
    ind_trend() {
      return {
        "icon iconfont icon-arrow-right-top norotate":
          this.reportData.drive_score_ind_trend == 1,
        "el-icon-minus": this.reportData.drive_score_ind_trend == 0,
        "icon iconfont icon-arrow-right-top rotate":
          this.reportData.drive_score_ind_trend == -1
      };
    },
    trend() {
      return {
        "icon iconfont icon-arrow-right-top norotate":
          this.reportData.drive_score_ind_trend == 1,
        "el-icon-minus": this.reportData.drive_score_ind_trend == 0,
        "icon iconfont icon-arrow-right-top rotate":
          this.reportData.drive_score_ind_trend == -1
      };
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/default-variable.scss";
@import "./css/variable.scss";
.custom-container {
  @include componentContainer;
  & .demo-item {
    @include flexFullRow;
  }
  & .demo-title {
    @include title-4_8;
  }
  & .demo-count {
    @include defaultFlex;
    flex: 1;
    & div {
      flex: 1;
    }
    .count {
      @include count-4_8;
    }
  }
  & .demo-rate {
    @include defaultFlex;
    font-size: 1.2rem;
    & div {
      flex: 1;
    }
    .rate {
      color: black;
    }
  }
}
</style>

