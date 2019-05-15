<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:42:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-14 11:28:02
 * @Description: 基础 table 组件
 -->
<template>
  <el-table size="mini" style="width: 100%" height="100%" :stripe="true" :data="tableData">
    <el-table-column
      header-align="center"
      align="center"
      v-if="haveIndex"
      type="index"
      :label="indexTitle"
    />
    <el-table-column
      v-for="(colConfig, colIndex) in tableOption"
      header-align="center"
      align="center"
      :prop="colConfig.prop"
      :label="colConfig.label"
      :key="colIndex"
    />
  </el-table>
</template>

<script>
export default {
  name: "base-table",
  props: {
    indexTitle: { type: String, default: "序号" },
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
    haveIndex: { type: Boolean, default: true }
  }
};
</script>
