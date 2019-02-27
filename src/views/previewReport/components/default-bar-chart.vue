<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-02-27 14:17:53
 * @Description: 基础 bar 组件
 -->
<template>
  <div :ref="$options.name" class="default-bar-chart"/>
</template>

<script>
import chartDefault from "./mixins/chart-default";

export default {
  name: "default-bar-chart",
  mixins: [chartDefault],
  data() {
    return {
      optionName: "defaultBarOption"
    };
  }
};
</script>

<style lang="scss" scoped>
.default-bar-chart {
  width: 100%;
  height: 100%;
}
</style>
