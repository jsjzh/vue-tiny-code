<template>
  <div @mousedown="handleMouseDown">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "drag-item",
  methods: {
    handleMouseDown(event) {
      let target = event.target;
      debugger
      let cloneNode = target.cloneNode();
      console.log(cloneNode);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
