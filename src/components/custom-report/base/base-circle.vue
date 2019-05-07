<template>
  <svg :width="circleWidth" :height="circleWidth" :viewBox="`0 0 ${circleWidth} ${circleWidth}`">
    <path
      stroke-linecap="round"
      fill="none"
      stroke="#e5e9f2"
      :stroke-width="strokeWidth"
      :d="circlePath"
    ></path>
    <path
      stroke-linecap="round"
      fill="none"
      :style="perimeterPathStyle"
      :stroke="realColor"
      :stroke-width="strokeWidth"
      :d="circlePath"
    ></path>
  </svg>
</template>

<script>
export default {
  name: "base-circle",
  props: {
    circleWidth: { type: Number, default: 100 },
    strokeWidth: { type: Number, default: 3 },
    percentage: { type: Number, default: 10 },
    circleColor: { type: String, default: null }
  },
  computed: {
    realColor() {
      let { circleColor, percentage } = this;
      if (circleColor) return circleColor;
      if (percentage >= 0 && percentage < 40) return "rgb(255,87,87)";
      if (percentage >= 40 && percentage < 60) return "rgb(252,196,25)";
      if (percentage >= 60 && percentage < 80) return "rgb(51,133,253)";
      if (percentage >= 80 && percentage <= 100) return "rgb(52,184,67)";
    },
    radius() {
      const { circleWidth, strokeWidth } = this;
      return (circleWidth - strokeWidth) / 2;
    },
    circlePath() {
      const { radius, circleWidth } = this;
      return `
        M ${circleWidth / 2} ${circleWidth / 2}
        m 0 -${radius}
        a ${radius} ${radius} 0 1 1 0 ${radius * 2}
        a ${radius} ${radius} 0 1 1 0 -${radius * 2}
      `;
    },
    perimeter() {
      const { radius } = this;
      return 2 * Math.PI * radius;
    },
    perimeterPathStyle() {
      const { perimeter, percentage } = this;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - percentage / 100) * perimeter + "px",
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
    }
  }
};
</script>
