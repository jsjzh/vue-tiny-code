<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:42:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-12 11:10:18
 * @Description: 所有组件都要引用该框架组件
 -->
<template>
  <div class="w100 h100 flex default-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "default-container"
};
</script>

<style>
.default-container {
  padding: 0.6rem;
}
</style>
