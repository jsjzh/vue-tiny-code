<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-02-27 14:18:00
 * @Description: 基础 pie 组件
 -->
<template>
  <div :ref="$options.name" class="default-pie-chart"/>
</template>

<script>
import chartDefault from "./mixins/chart-default";

export default {
  name: "default-pie-chart",
  mixins: [chartDefault],
  data() {
    return {
      optionName: "defaultPieOption"
    };
  }
};
</script>

<style lang="scss" scoped>
.default-pie-chart {
  width: 100%;
  height: 100%;
}
</style>