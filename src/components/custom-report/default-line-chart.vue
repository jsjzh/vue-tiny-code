<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-02-27 15:25:50
 * @Description: 基础 line 组件
 -->
<template>
  <div :ref="$options.name" class="default-line-chart"/>
</template>

<script>
import chartDefault from "./mixins/chart-default";

export default {
  name: "default-line-chart",
  mixins: [chartDefault],
  data() {
    return {
      optionName: "defaultLineOption"
    };
  }
};
</script>

<style lang="scss" scoped>
.default-line-chart {
  width: 100%;
  height: 100%;
}
</style>