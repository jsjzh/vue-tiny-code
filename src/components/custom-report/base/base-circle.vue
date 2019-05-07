<template>
  <svg :width="circleWidth" :height="circleWidth" :viewBox="`0 0 ${circleWidth} ${circleWidth}`">
    <g>
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
        :stroke="circleColor"
        :stroke-width="strokeWidth"
        :d="circlePath"
      ></path>
    </g>
    <g>
      <slot></slot>
    </g>
  </svg>
</template>

<script>
export default {
  name: "base-circle",
  props: {
    circleWidth: { type: Number, default: 130 },
    strokeWidth: { type: Number, default: 10 },
    circleColor: { type: String, default: "rgb(52,184,67)" },
    percentage: { type: [Number, String], default: 10 }
  },
  computed: {
    radius() {
      const { circleWidth, strokeWidth } = this;
      return (circleWidth - strokeWidth) / 2;
    },
    circlePath() {
      const { radius, circleWidth } = this;
      return `
        M ${circleWidth / 2} ${circleWidth / 2}
        m 0 -${radius}
        a ${radius} ${radius} 0 1 0 0 ${radius * 2}
        a ${radius} ${radius} 0 1 0 0 -${radius * 2}
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
