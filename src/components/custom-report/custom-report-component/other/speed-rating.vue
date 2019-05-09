<template>
  <div class="speed-rating-container">
    <circle-icon
      circleTitle="speed-rating"
      iconText="SLI"
      :iconSize="32"
      :percentage="reportData.countOne"
      :circleWidth="130"
      :circleTip="realTip"
    />
  </div>
</template>

<script>
import circleIcon from "../../base/circle-icon";

export default {
  name: "custom-report-component-other-speed-rating",
  components: { circleIcon },
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    realTip() {
      let { countOne } = this.reportData;
      if (countOne >= 0 && countOne < 40) return "Danger, attention please";
      if (countOne >= 40 && countOne < 60) return "attention please";
      if (countOne >= 60 && countOne < 80) return "keep on";
      if (countOne >= 80 && countOne <= 100) return "keep on";
    }
  }
};
</script>

<style lang="scss" scoped>
.speed-rating-container {
  flex: 1;
  display: flex;
  flex-flow: column;
}
</style>