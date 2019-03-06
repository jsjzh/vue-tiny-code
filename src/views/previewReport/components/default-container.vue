<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:42:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-06 23:45:49
 * @Description: 所有组件都要引用该框架组件
 -->
<template>
  <div class="default-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "default-container"
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";
@import "./css/variable.scss";
.default-container {
  width: 100%;
  height: 100%;
}
</style>
