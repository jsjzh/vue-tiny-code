<template>
  <div class="accelerate-the-score-container">
    <circle-icon
      circleTitle="accelerate-the-score"
      iconName="iconjiasu"
      :iconSize="40"
      :iconOffsetY="53"
      :percentage="reportData.countOne"
      :circleWidth="130"
      :circleTip="realTip"
    />
  </div>
</template>

<script>
import circleIcon from "../../base/circle-icon";

export default {
  name: "custom-report-component-other-accelerate-the-score",
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
      return "on data";
    }
  }
};
</script>

<style lang="scss" scoped>
.accelerate-the-score-container {
  flex: 1;
  display: flex;
  flex-flow: column;
}
</style>