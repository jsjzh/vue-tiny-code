<template>
  <div>
    <div style="width: 200px;height: 200px" v-waves="{type: 'hit'}">test-waves</div>
    <div style="width: 200px;height: 200px" v-waves="{type: 'center'}">test-waves</div>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import clickoutside from "@/directive/clickoutside";

export default {
  name: "waves",
  data() {
    return {
      show: true
    };
  },
  directives: { waves, clickoutside },
  methods: {
    handleClickoutside() {
      console.log("handleClickoutside");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
