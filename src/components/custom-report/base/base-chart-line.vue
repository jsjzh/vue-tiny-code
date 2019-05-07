<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-05-07 09:07:23
 * @Description: 基础 line 组件
 -->
<template>
  <div :ref="$options.name" class="base-chart-line"/>
</template>

<script>
import chartDefault from "../mixins/chart-default";

export default {
  name: "base-chart-line",
  mixins: [chartDefault],
  data() {
    return {
      optionName: "defaultLineOption"
    };
  }
};
</script>

<style lang="scss" scoped>
.base-chart-line {
  width: 100%;
  height: 100%;
}
</style>