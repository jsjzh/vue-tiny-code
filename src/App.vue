<template>
  <div id="app">
    <div class="link-container">
      <router-link v-for="(item, index) in routes" :key="index" :to="item.path">{{item.name}}&nbsp;</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>
import { routes } from "./router";

export default {
  name: "app",
  data() {
    return { routes };
  }
};
</script>

<style lang="scss" scoped>
.link-container {
  display: flex;
  justify-content: center;
  background-color: #eee;
  /deep/ a {
    margin: 1rem 5rem;
  }
}
</style>

<style lang="scss">
@import "./app.scss";
</style>