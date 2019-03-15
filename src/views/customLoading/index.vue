<template>
  <div v-custom-loading="isLoading">
    <button @click="handleShowLoading">toggle</button>
  </div>
</template>

<script>
import customLoading from "@/directive/customLoading";

export default {
  name: "customLoadingShow",
  directives: { customLoading },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    handleShowLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
