<template>
  <div>
    <div v-if="!chunkIsHide" style="width: 100px;height: 100px;background: red" v-clickoutside="handleHide"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Clickoutside from "@/util/clickoutside";

export default {
  name: "home",
  data() {
    return {
      chunkIsHide: false
    };
  },
  directives: { Clickoutside },
  methods: {
    handleHide() {
      console.log("handleHide");
      this.chunkIsHide = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
