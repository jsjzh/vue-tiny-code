<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-11 14:01:16
 * @Description: custom-report-text-module
 -->
<template>
  <div class="text-module-container">
    <div class="item" style="flex: 1">
      <div>
        <span class="count">{{reportData.countOne}}</span> 次
      </div>
      <div>
        <span class="count">{{reportData.countTwo}}</span> 次
      </div>
    </div>
    <div class="item">
      <div>
        环比
        <span class="count">{{reportData.rate}}</span> %
      </div>
      <div>
        平均
        <span class="count">{{reportData.average}}</span> %
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-report-text-module",
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>

