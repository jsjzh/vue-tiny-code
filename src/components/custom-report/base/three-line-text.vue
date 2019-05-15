<template>
  <div class="flex flex-col three-line-text-container">
    <div class="flex-1 flex flex-align-center flex-just-start">{{blockTitle}}</div>
    <div class="flex-1 flex flex-align-center flex-just-start">
      <span style="color: #ee7738;font-size: 2rem">{{count}}</span>
      &nbsp;{{unit}}
    </div>
    <div class="flex-1 flex flex-align-center flex-just-start" v-html="PAGE_rate"/>
  </div>
</template>

<script>
export default {
  name: "three-line-text",
  props: {
    blockTitle: {
      type: String,
      default: "please set the title"
    },
    count: {
      type: [String, Number],
      default: "please set the count"
    },
    rate: {
      type: [String, Number],
      default: "please set the rate"
    },
    unit: {
      type: String,
      default: "please set the unit"
    },
    trend: {
      type: Number,
      default: 1
    }
  },
  computed: {
    PAGE_rate() {
      let { rate } = this;
      if (this.trend < 0) rate = -rate;
      if (rate > 0)
        return `<span style="color: red"> ↑ ${Math.abs(+rate)} %</span>`;
      else if (rate < 0)
        return `<span style="color: green"> ↓ ${Math.abs(+rate)} %</span>`;
      else return `<span style="color: gray"> — ${0} %</span>`;
    }
  }
};
</script>

