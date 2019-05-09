<template>
  <div class="turn-signal-control-score-container">
    <circle-icon
      circleTitle="turn-signal-control-score"
      iconName="iconzhuanxiangdeng"
      :iconSize="55"
      :iconOffsetY="50"
      :percentage="reportData.countOne"
      :circleWidth="130"
      :circleTip="realTip"
    />
  </div>
</template>

<script>
import circleIcon from "../../base/circle-icon";

export default {
  name: "custom-report-component-other-turn-signal-control-score",
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
.turn-signal-control-score-container {
  flex: 1;
  display: flex;
  flex-flow: column;
}
</style>