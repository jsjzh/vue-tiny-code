<template>
  <div id="app">
    <palette-pro></palette-pro>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/Palette">Palette</router-link> |
    <router-link to="/Resize">Resize</router-link> |
    <router-link to="/palettePro">palettePro</router-link>
    <router-view /> -->
  </div>
</template>


<script>
import palettePro from "@/components/palettePro/palettePro"

export default {
  name: "app",
  components: {palettePro}
}
</script>


<style lang="scss">
body,
html {
  font-size: 14px !important;
}
</style>
