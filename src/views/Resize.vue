<template>
  <div ref="demo">
    <div style="width: 100px;float: left">123</div>
  </div>
</template>


<script>
import { addResizeListener, removeResizeListener } from "@/util/resize";

export default {
  name: "resize",
  methods: {
    demo() {
      console.log("resize");
    }
  },
  mounted() {
    let { demo } = this.$refs;
    addResizeListener(demo, this.demo);

    setTimeout(() => {
      removeResizeListener(demo, this.demo);
    }, 5000);
  }
};
</script>

<style lang="scss" scoped>
</style>
