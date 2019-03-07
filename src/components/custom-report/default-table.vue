<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:42:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-07 17:44:13
 * @Description: 基础 table 组件
 -->
<template>
  <el-table size="mini" style="width: 100%" height="100%" :stripe="true" :data="tableData">
    <el-table-column v-if="haveIndex" type="index" label="序号"/>
    <el-table-column
      v-for="(colConfig, colIndex) in tableOption"
      :prop="colConfig.prop"
      :label="colConfig.label"
      :key="colIndex"
    />
  </el-table>
</template>

<script>
export default {
  name: "default-table",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    tableOption: {
      type: Array,
      default() {
        return [];
      }
    },
    haveIndex: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
