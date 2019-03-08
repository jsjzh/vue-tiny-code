<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:43:52
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-08 14:33:56
 * @Description: custom-report-block-module
 -->
<template>
  <div class="block-container">(ﾟдﾟ≡ﾟдﾟ)</div>
</template>

<script>
export default {
  name: "custom-report-block-module",
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

