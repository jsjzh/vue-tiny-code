<template>
  <div v-custom-loading.fullscreen="isLoading">
    <button @click="handleShowLoading">v-custom-loading</button>
    <button @click="handleServiceLoading">service-loading</button>
  </div>
</template>

<script>
export default {
  name: "customLoadingShow",
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    handleShowLoading() {
      this.isLoading = true;
      let timer = setTimeout(() => {
        this.isLoading = false;
        clearTimeout(timer);
      }, 1000);
    },
    handleServiceLoading() {
      let loading = this.$customLoading({
        target: "body"
      });
      let timer = setTimeout(() => {
        loading.close();
        clearTimeout(timer);
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
