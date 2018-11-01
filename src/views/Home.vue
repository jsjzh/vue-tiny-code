<template>
  <div>
    <div style="width: 100px;height: 100px;background: red" v-clickoutside="handleHide">123</div>
  </div>
</template>

<script>
// @ is an alias to /src
// import Clickoutside from "@/util/clickoutside";
import Clickoutside from "@/util/self_clickoutside";

export default {
  name: "home",
  directives: { Clickoutside },
  methods: {
    handleHide() {
      console.log("handleHide");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
