<template>
  <three-line-text
    style="flex: 1"
    :unit="mixinData.unit"
    :block-title="reportData.name"
    :count="reportData.value"
    :rate="reportData.rate"
    :trend="reportData.trend"
  />
</template>

<script>
import threeLineText from "../../base/three-line-text";

export default {
  name: "custom-report-component-text-three-line-text",
  components: { threeLineText },
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    },
    mixinData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
