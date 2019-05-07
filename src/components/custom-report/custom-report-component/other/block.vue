<template>
  <div class="block-container" style="flex-flow: column">
    <p style="flex: 1;display: flex; align-items: center">(ﾟдﾟ≡ﾟдﾟ)</p>
    <p style="flex: 1;display: flex; align-items: center">空欸~</p>
  </div>
</template>

<script>
export default {
  name: "custom-report-component-other-block",
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/index.scss";
</style>

