<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { demo } from "@/api";

export default {
  name: "app",
  mounted() {
    demo(123).then(res => {
      console.log(res);
    });
  }
};
</script>