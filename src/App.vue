<template>
  <div id="app">
    <router-link to="/">Home</router-link> |
    <router-link to="/Palette">Palette</router-link> |
    <router-link to="/palettePro">palettePro</router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  font-size: 14px !important;
}
</style>
