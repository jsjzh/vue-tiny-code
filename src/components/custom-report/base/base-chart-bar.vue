<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-05-07 09:27:35
 * @Description: 基础 bar 组件
 -->
<template>
  <div :ref="$options.name" class="base-chart-bar"/>
</template>

<script>
import chartDefault from "../mixins/chart-default";

export default {
  name: "base-chart-bar",
  mixins: [chartDefault],
  data() {
    return {
      optionName: "defaultBarOption"
    };
  }
};
</script>

<style lang="scss" scoped>
.base-chart-bar {
  width: 100%;
  height: 100%;
}
</style>
