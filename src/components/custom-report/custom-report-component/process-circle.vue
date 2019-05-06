<template>
  <div>
    <svg
      :width="circleWidth"
      :height="circleHeight"
      :viewBox="`0 0 ${circleWidth} ${circleHeight}`"
    >
      <path :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
      <!-- <path
        :d="trackPath"
        stroke-linecap="round"
        :stroke="stroke"
        :stroke-width="relativeStrokeWidth"
        fill="none"
        :style="circlePathStyle"
      ></path>-->
    </svg>
  </div>
</template>

<script>
export default {
  name: "process-circle",
  props: {
    circleWidth: { type: Number, default: 100 },
    circleHeight: { type: Number, default: 100 },

    strokeWidth: {
      type: Number,
      default: 3
    },
    width: {
      type: Number,
      default: 126
    },
    percentage: {
      type: Number,
      default: 10
    },
    reportData: {
      type: Object
    }
  },
  computed: {
    relativeStrokeWidth() {
      return ((this.strokeWidth / this.width) * 100).toFixed(1);
    },
    trackPath() {
      const radius = parseInt(
        50 - parseFloat(this.relativeStrokeWidth) / 2,
        10
      );
      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius *
        2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
    },
    stroke() {
      let ret;
      if (this.color) {
        ret = this.color;
      } else {
        switch (this.status) {
          case "success":
            ret = "#13ce66";
            break;
          case "exception":
            ret = "#ff4949";
            break;
          default:
            ret = "#20a0ff";
        }
      }
      return ret;
    },
    perimeter() {
      const radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
      return 2 * Math.PI * radius;
    },
    circlePathStyle() {
      const perimeter = this.perimeter;
      return {
        strokeDasharray: `${perimeter}px,${perimeter}px`,
        strokeDashoffset: (1 - this.percentage / 100) * perimeter + "px",
        transition: "stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease"
      };
    }
  }
};
</script>

<style lang="sass" scoped>

</style>
