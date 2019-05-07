<template>
  <div class="turn-signal-control-score-container">
    <circle-icon circleTitle="security-rate" :percentage="reportData.countOne"/>
  </div>
</template>

<script>
import circleIcon from "../../base/circle-icon";

export default {
  name: "custom-report-component-other-circle-security-rate",
  components: { circleIcon },
  props: {
    reportData: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.turn-signal-control-score-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>