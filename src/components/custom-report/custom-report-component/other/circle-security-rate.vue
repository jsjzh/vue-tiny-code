<template>
  <div class="w100 flex flex-center">
    <circle-three-text circleTitle="安全评分" :percentage="reportData.value" :rate="realRate"/>
  </div>
</template>

<script>
import circleThreeText from "../../base/circle-three-text";

export default {
  name: "custom-report-component-other-circle-security-rate",
  components: { circleThreeText },
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    realRate() {
      return this.reportData.trend > 0
        ? +this.reportData.rate
        : -this.reportData.rate;
    }
  }
};
</script>