<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-06 20:53:41
 * @Description: custom-report-component-block-module
 -->
<template>
  <div class="block-container" style="flex-flow: column">
    <p style="flex: 1;display: flex; align-items: center">(ﾟдﾟ≡ﾟдﾟ)</p>
    <p style="flex: 1;display: flex; align-items: center">空欸~</p>
  </div>
</template>

<script>
export default {
  name: "custom-report-component-block-module",
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

