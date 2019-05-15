<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-25 17:44:13
 * @LastEditTime: 2019-05-14 11:46:15
 * @Description: 基础 line 组件
 -->
<template>
  <div :ref="$options.name" class="w100 h100"/>
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
