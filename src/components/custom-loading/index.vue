<template>
  <transition name="slide-fade">
    <div v-show="visible" class="custom-loading-wrap">
      <div class="custom-loading">loading...</div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      fullscreen: true
    };
  }
};
</script>


<style lang="scss" scoped>
.custom-loading-wrap {
  position: fixed;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .custom-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
