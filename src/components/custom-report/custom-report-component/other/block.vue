<template>
  <div class="flex flex-center flex-col">
    <p class="flex-1 flex flex-align-center">(ﾟдﾟ≡ﾟдﾟ)</p>
    <p class="flex-1 flex flex-align-center">空欸~</p>
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
