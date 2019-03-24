<template>
  <div class="demo-container">
    <custom-scrollbar>
      <div>
        <p v-for="item in 100" :key="item">
          <span v-for="font in 100" :key="font">{{font}}</span>
        </p>
      </div>
    </custom-scrollbar>
  </div>
</template>

<script>
import customScrollbar from "@/components/custom-scrollbar";
export default {
  name: "customScrollbarShow",
  components: { customScrollbar }
};
</script>

<style lang="scss" scoped>
.demo-container {
  width: 400px;
  height: 600px;
  margin: 5rem auto;
}
</style>
