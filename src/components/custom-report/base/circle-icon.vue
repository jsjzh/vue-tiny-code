<template>
  <div class="circle-score-process-container">
    <base-circle
      :percentage="percentage"
      :circleColor="realColor"
      :circleWidth="130"
      :strokeWidth="10"
    >
      <text
        x="50%"
        y="35%"
        text-anchor="middle"
        dominant-baseline="middle"
        :font-size="130 / 5"
        :fill="realColor"
      >{{percentage}}</text>
    </base-circle>
  </div>
</template>

<script>
import baseCircle from "./base-circle";

export default {
  name: "circle-three-text",
  components: { baseCircle },
  props: {
    percentage: { type: [String, Number], default: 10 }
  },
  computed: {
    realColor() {
      let { percentage } = this;
      if (percentage >= 0 && percentage < 40) return "rgb(255, 87, 87)";
      if (percentage >= 40 && percentage < 60) return "rgb(252, 196, 25)";
      if (percentage >= 60 && percentage < 80) return "rgb(51, 133, 253)";
      if (percentage >= 80 && percentage <= 100) return "rgb(52, 184, 67)";
    }
  }
};
</script>

<style lang="scss" scoped>
.circle-score-process-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>