<template>
  <div class="circle-score-process-container">
    <div style="font-weight: 600" :style="{fontSize: circleWidth / 8 + 'px'}">{{circleTitle}}</div>
    <base-circle
      :percentage="percentage"
      :circleColor="realColor"
      :circleWidth="circleWidth"
      :haveBox="haveBox"
    >
      <text
        x="50%"
        :y="iconOffsetY + '%'"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="iconfont"
        :font-size="iconSize"
        :fill="realColor"
        v-html="iconUnicode"
      />
    </base-circle>
    <div :style="{color:realColor}">{{circleTip}}</div>
  </div>
</template>

<script>
import baseCircle from "./base-circle";

export default {
  name: "circle-three-text",
  components: { baseCircle },
  props: {
    percentage: { type: [String, Number], default: 10 },
    iconUnicode: { type: String, required: true },
    iconSize: { type: [String, Number], default: 60 },
    iconOffsetY: { type: [String, Number], default: 50 },
    circleWidth: { type: [String, Number], default: 130 },
    circleTitle: { type: String, required: true },
    circleTip: { type: String, default: "no data" },
    haveBox: { type: Boolean, default: false }
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
  justify-content: space-around;
  align-items: center;
  flex-flow: column;
}
</style>