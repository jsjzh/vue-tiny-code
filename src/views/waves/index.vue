<template>
  <div class="wave-container">
    <el-button v-waves>wave-demo-btn</el-button>
    <el-button v-waves="{color: 'red'}">wave-demo-btn</el-button>
    <el-button v-waves="{color: 'blue'}">wave-demo-btn</el-button>
    <el-button v-waves="{color: 'yellow'}">wave-demo-btn</el-button>
  </div>
</template>

<script>
import waves from "@/directive/waves";

export default {
  name: "waves",
  data() {
    return {
      show: true
    };
  },
  directives: { waves }
};
</script>

<style lang="scss" scoped>
.wave-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
  & > div {
    margin: 0 2rem;
  }
}
</style>
