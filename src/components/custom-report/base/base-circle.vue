<template>
  <div class="ps-r" :style="{width: `${circleWidth}px`, height: `${circleWidth}px`}">
    <svg :width="circleWidth" :height="circleWidth" :viewBox="`0 0 ${circleWidth} ${circleWidth}`">
      <g>
        <path
          stroke-linecap="round"
          fill="none"
          stroke="#e5e9f2"
          :stroke-width="circleWidth / 20"
          :d="circlePath"
        ></path>
        <path
          stroke-linecap="round"
          fill="none"
          :style="perimeterPathStyle"
          :stroke="circleColor"
          :stroke-width="circleWidth / 20"
          :d="circlePath"
        ></path>
      </g>
      <slot name="svg"></slot>
    </svg>
    <div v-if="haveBox" class="ps-a ps-center">
      <te-icon :style="{fontSize: circleWidth * 1.05 + 'px'}" iconName="iconweibiaoti-"/>
    </div>
    <div class="ps-a ps-center">
      <slot name="span"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "base-circle",
  props: {
    circleWidth: { type: Number, default: 130 },
    circleColor: { type: String, default: "rgb(52,184,67)" },
    percentage: { type: [Number, String], default: 10 },
    haveBox: { type: Boolean, default: false }
  },
  computed: {
    radius() {
      const { circleWidth } = this;
      if (this.haveBox) return (circleWidth - circleWidth / 20) / 2 - 15;
      return (circleWidth - circleWidth / 20) / 2;
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
