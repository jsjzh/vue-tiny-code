<template>
  <div class="scroll-bar">
    <div class="scroll-wrap" ref="wrap" @scroll="handleScroll">
      <div class="bar-wrap-vertical">
        <div
          class="bar-vertical"
          :style="{height: `${sizeY}px`,transform: `translateY(${moveY}px)`}"
        ></div>
      </div>
      <div class="bar-wrap-horizontal">
        <div
          class="bar-horizontal"
          :style="{width: `${sizeX}px`,transform: `translateX(${moveX}px)`}"
        ></div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-warp",
  data() {
    return {
      moveY: 0,
      moveX: 0,
      sizeY: 15,
      sizeX: 15
    };
  },
  computed: {
    xBartranslate() {}
  },
  methods: {
    handleScroll(event) {
      const { wrap } = this.$refs;
      this.moveY = (wrap.scrollTop / wrap.scrollHeight) * wrap.clientHeight;
      this.moveX = (wrap.scrollLeft / wrap.scrollWidth) * wrap.clientWidth;
    }
  },
  mounted() {
    const { wrap } = this.$refs;
    this.sizeY = (wrap.clientHeight / wrap.scrollHeight) * wrap.clientHeight;
    this.sizeX = (wrap.clientWidth / wrap.scrollWidth) * wrap.clientWidth;
  }
};
</script>

<style lang="scss" scoped>
.scroll-bar {
  overflow: hidden;
  position: relative;
}
.scroll-wrap {
  overflow: scroll;
  max-height: 280px;
  margin-bottom: -17px;
  margin-right: -17px;
}

.bar-wrap-vertical {
  position: absolute;
  right: 0;
  width: 5px;
  height: 100%;
  background-color: red;
  .bar-vertical {
    width: 5px;
    position: absolute;
    cursor: pointer;
    background-color: blue;
  }
}

.bar-wrap-horizontal {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5px;
  background-color: red;
  .bar-horizontal {
    height: 5px;
    position: absolute;
    cursor: pointer;
    background-color: blue;
  }
}
</style>