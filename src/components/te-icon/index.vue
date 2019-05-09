<template>
  <span :class="`iconfont ${iconName}`"/>
</template>

<script>
export default {
  name: "te-icon",
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
};
</script>

