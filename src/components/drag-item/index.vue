<template>
  <div @mousedown="handleMouseDown">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "drag-item",
  data() {
    return {
      dom: {
        cloneNode: null
      }
    };
  },
  methods: {
    handleMouseup(e) {
      console.log("handleMouseup", e);
      document.removeEventListener("mousemove", this.handleMousemove);
      document.removeEventListener("mouseup", this.handleMouseup);
    },
    handleMousemove(e) {
      console.log("handleMousemove", e);
    },
    handleMouseDown(event) {
      let target = event.target;
      this.dom.cloneNode = target.cloneNode(true);
      document.addEventListener("mousemove", this.handleMousemove);
      document.addEventListener("mouseup", this.handleMouseup);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
