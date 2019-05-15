<template>
  <div class="flex-1 flex flex-center">
    <base-circle :percentage="percentage" :circleColor="realColor" :circleWidth="130">
      <template v-slot:svg>
        <text
          x="50%"
          y="35%"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="130 / 5"
          :fill="realColor"
        >{{percentage}}</text>
        <text
          x="50%"
          y="56%"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="130 / 8"
        >{{circleTitle}}</text>
        <text
          x="50%"
          y="75%"
          text-anchor="middle"
          dominant-baseline="middle"
          :font-size="130 / 10"
          :fill="realRateColor"
        >{{realRate}}</text>
      </template>
    </base-circle>
  </div>
</template>

<script>
import baseCircle from "./base-circle";

export default {
  name: "circle-three-text",
  components: { baseCircle },
  props: {
    percentage: { type: [String, Number], default: 10 },
    circleTitle: { type: String, default: "title" },
    rate: { type: [String, Number], default: 10 }
  },
  computed: {
    realColor() {
      let { percentage } = this;
      if (percentage >= 0 && percentage < 40) return "rgb(255, 87, 87)";
      if (percentage >= 40 && percentage < 60) return "rgb(252, 196, 25)";
      if (percentage >= 60 && percentage < 80) return "rgb(51, 133, 253)";
      if (percentage >= 80 && percentage <= 100) return "rgb(52, 184, 67)";
    },
    realRate() {
      let { rate } = this;
      if (rate === 0) return ` — ${Math.abs(rate)} %`;
      if (rate > 0) return ` ↑ ${Math.abs(rate)} %`;
      if (rate < 0) return ` ↓ ${Math.abs(rate)} %`;
    },
    realRateColor() {
      let { rate } = this;
      if (rate === 0) return "gray";
      if (rate > 0) return "red";
      if (rate < 0) return "green";
    }
  }
};
</script>
