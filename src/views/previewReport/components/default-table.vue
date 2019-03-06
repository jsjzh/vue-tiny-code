<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-18 10:42:41
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-27 11:46:19
 * @Description: 基础 table 组件
 -->
<template>
  <el-table
    size="mini"
    style="width: 100%"
    :stripe="true"
    :data="tableData"
    :header-cell-style="headCellStyle"
    :cell-style="cellStyle"
  >
    <el-table-column v-if="haveIndex" type="index" label="序"/>
    <el-table-column
      v-for="(colConfig, colIndex) in tableOption"
      :prop="colConfig.prop"
      :label="colConfig.label"
      :key="colIndex"
    />
  </el-table>
</template>

<script>
import {
  $deepColor1,
  $deepColor2,
  $activeColor1,
  $activeColor2,
  $shallowColor1,
  $shallowColor2
} from "./js/variable";

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
  },
  methods: {
    headCellStyle({ row, column, rowIndex, columnIndex }) {
      return {
        backgroundColor: $shallowColor1,
        border: `1px solid ${$shallowColor1}`,
        padding: `0.3rem`
      };
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let backgroundColor = rowIndex % 2 !== 0 ? $shallowColor1 : null;
      return {
        backgroundColor,
        border: `1px solid ${$shallowColor1}`,
        padding: `0.3rem`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";
@import "./css/variable.scss";
</style>
