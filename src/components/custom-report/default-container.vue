<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:42:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-07 15:51:29
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
.default-container {
  width: 100%;
  height: 100%;
  padding: 0.6rem;
  display: flex;
  flex-flow: column;
}
</style>
