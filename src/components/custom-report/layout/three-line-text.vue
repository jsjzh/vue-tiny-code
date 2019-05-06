<template>
  <div class="three-line-text-container">
    <div>{{blockTitle}}</div>
    <div>
      <span style="color: #ee7738;font-size: 1.2rem">{{count | filterCount}}</span>
      &nbsp;{{unit}}
    </div>
    <div v-html="PAGE_rate"/>
  </div>
</template>

<script>
// TODO 可以引入 parse5 用来处理 html 标签，现在暂时用字符串拼接的方法
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
    }
  },
  computed: {
    PAGE_rate() {
      let { rate } = this;
      if (rate === 0)
        return `<span style="color: gray"> — ${Math.abs(rate)} %</span>`;
      if (rate > 0)
        return `<span style="color: red"> ↑ ${Math.abs(rate)} %</span>`;
      if (rate < 0)
        return `<span style="color: green"> ↓ ${Math.abs(rate)} %</span>`;
    }
  },
  filters: {
    filterCount(value) {
      return value;
    },
    filterRate(value) {
      return value;
    }
  }
};
</script>

<style lang="scss" scoped>
.three-line-text-container {
  display: flex;
  flex-flow: column;
  & div {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>

