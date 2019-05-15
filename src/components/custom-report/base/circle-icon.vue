<template>
  <div class="flex flex-1 flex-align-center flex-col" style="justify-content: space-around">
    <div style="font-weight: 600" :style="{fontSize: circleWidth / 8 + 'px'}">{{circleTitle}}</div>
    <base-circle
      :percentage="percentage"
      :circleColor="realColor"
      :circleWidth="circleWidth"
      :haveBox="haveBox"
    >
      <template v-slot:span>
        <te-icon v-if="!iconText" :style="realStyle" :iconName="iconName"/>
        <span v-if="iconText" :style="realStyle">{{iconText}}</span>
      </template>
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

    iconSize: { type: [String, Number], default: 60 },
    iconName: { type: String },
    iconText: { type: String },

    circleWidth: { type: [String, Number], default: 130 },
    circleTitle: { type: String, default: "title" },
    circleTip: { type: String, default: "no data" },
    haveBox: { type: Boolean, default: false }
  },
  computed: {
    realStyle() {
      return { fontSize: this.iconSize + "px", color: this.realColor };
    },
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
