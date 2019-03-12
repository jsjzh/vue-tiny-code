<template>
  <div class="home-container">
    <el-menu mode="horizontal" :router="true">
      <el-menu-item index="1" :route="{path: '/'}">首页</el-menu-item>
      <el-menu-item index="2" :route="{path: '/dragReport'}">仿 Chrome 调色板</el-menu-item>
      <el-menu-item index="3" :route="{path: '/palette'}">Vue 拖拽报表</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss" scoped>
</style>

