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
import threeLineText from "../component/three-line-text";

export default {
  name: "custom-report-component-average-number-of-operations",
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
      title: "average-number-of-operations",
      unit: "次/车",
      count: null,
      rate: null
    };
  }
};
</script>
