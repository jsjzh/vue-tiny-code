<template>
  <three-line-text
    style="flex: 1"
    :block-title="title"
    :count="reportData.countOne"
    :rate="reportData.rate"
    :unit="unit"
  />
</template>

<script>
import threeLineText from "../../base/three-line-text";

export default {
  name: "custom-report-component-text-average-time",
  components: { threeLineText },
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      title: "average-time",
      unit: "h/车",
      count: null,
      rate: null
    };
  }
};
</script>
