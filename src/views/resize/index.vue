<template>
  <div class="container">
    <!-- <span v-for="i in 100" :key="i">{{i}}</span> -->
    <!-- <div v-for="i in 100" :key="i">{{i}}</div> -->
  </div>
</template>


<script>
export default {
  name: "resize",
  methods: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: wheat;
  width: 500px;
  height: 500px;
  overflow: scroll;
}
</style>
