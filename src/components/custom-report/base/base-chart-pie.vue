<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-05-07 09:07:42
 * @Description: 基础 pie 组件
 -->
<template>
  <div :ref="$options.name" class="base-chart-pie"/>
</template>

<script>
import chartDefault from "../mixins/chart-default";

export default {
  name: "base-chart-pie",
  mixins: [chartDefault],
  data() {
    return {
      optionName: "defaultPieOption"
    };
  }
};
</script>

<style lang="scss" scoped>
.base-chart-pie {
  width: 100%;
  height: 100%;
}
</style>