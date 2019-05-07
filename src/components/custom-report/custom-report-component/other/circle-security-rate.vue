<template>
  <div class="circle-security-rate-container">
    <circle-three-text
      circleTitle="security-rate"
      :percentage="reportData.countOne"
      :rate="reportData.rate"
    />
  </div>
</template>

<script>
import circleThreeText from "../../base/circle-three-text";

export default {
  name: "custom-report-component-other-circle-security-rate",
  components: { circleThreeText },
  props: {
    reportData: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.circle-security-rate-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>