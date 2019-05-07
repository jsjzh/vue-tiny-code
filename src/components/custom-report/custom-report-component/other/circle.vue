<template>
  <div>
    <base-circle :percentage="percentage" :circleWidth="200" :strokeWidth="10"/>
  </div>
</template>

<script>
import baseCircle from "../../base/base-circle";

export default {
  name: "custom-report-component-other-circle",
  components: { baseCircle },
  props: {
    reportData: {
      type: Object
    }
  },
  data() {
    return {
      percentage: 100
    };
  },
  mounted() {
    setInterval(() => {
      this.percentage = Math.random() * 100;
    }, 1000);
  }
};
</script>

<style lang="sass" scoped>
</style>