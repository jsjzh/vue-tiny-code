<template>
  <div class="wave-container">
    <div class="wave-demo-btn" v-waves>wave-demo-btn</div>
    <div class="wave-demo-btn" v-waves="{color: 'red'}">wave-demo-btn</div>
    <div class="wave-demo-btn" v-waves="{color: 'blue'}">wave-demo-btn</div>
    <div class="wave-demo-btn" v-waves="{color: 'yellow'}">wave-demo-btn</div>
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
  .wave-demo-btn {
    min-width: 100px;
    min-height: 20px;
    background-color: #67c23a;
    color: white;
    border-radius: 5px;
    padding: 1rem 2.5rem;
  }
}
</style>
