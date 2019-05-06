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
  name: "custom-report-component-operating-frequency",
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
      title: "operating-frequency",
      unit: "次",
      count: null,
      rate: null
    };
  }
};
</script>
