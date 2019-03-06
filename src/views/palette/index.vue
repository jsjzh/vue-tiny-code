<template>
  <div>
    <color-picker style="margin: 0 auto"/>
  </div>
</template>

<script>
// @ is an alias to /src
import colorPicker from "@/components/color-picker";
export default {
  name: "palette",
  components: { colorPicker }
};
</script>

<style lang="scss" scoped>
</style>