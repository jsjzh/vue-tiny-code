<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-14 11:53:20
 * @Description: custom-report-component-text
 -->
<template>
  <div class="flex flex-1 flex-center flex-wrap flex-col text-module-container">
    <div class="w100 flex flex-center flex-1 item">
      <div class="flex-1">
        <span class="count">{{reportData.countOne}}</span> 次
      </div>
      <div class="flex-1">
        <span class="count">{{reportData.countTwo}}</span> 次
      </div>
    </div>
    <div class="w100 flex flex-center flex-1 item">
      <div class="flex-1">
        环比
        <span class="count">{{reportData.rate}}</span> %
      </div>
      <div class="flex-1">
        平均
        <span class="count">{{reportData.average}}</span> %
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-report-component-text-text",
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
.text-module-container {
  .item {
    > div {
      font-size: 0.5rem;
      .count {
        color: rgb(238, 119, 56);
        font-size: 1.3rem;
      }
    }
  }
}
</style>

