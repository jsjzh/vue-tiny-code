<template>
  <div class="home-container">
    <el-menu v-if="activeTab!=='-1'" mode="horizontal" :default-active="activeTab" :router="true">
      <el-menu-item
        :index="pathIndex.toString()"
        v-for="(path, pathIndex) in paths"
        :key="pathIndex"
        :route="{path: path.to}"
      >{{path.title}}</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      activeTab: "-1",
      paths: [
        { to: "/", title: "首页" },
        { to: "/customReportList", title: "拖拽报表 --- 报表列表" },
        // { to: "/editComponent", title: "拖拽报表 --- 编辑组件" },
        { to: "/palette", title: "仿 Chrome 调色板" },
        { to: "/waves", title: "水波纹" },
        { to: "/dragDialog", title: "elementDialog 可拖拽" },
        { to: "/customLoading", title: "自定义 loading" },
        { to: "/customScrollbar", title: "自定义 scrollbar" }
        // { to: "/dragList", title: "重新定义拖动" }
      ]
    };
  },
  mounted() {
    const { path } = this.$route;
    let index = this.paths.findIndex(item => item.to === path);
    this.activeTab = index.toString();
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
}
</style>

