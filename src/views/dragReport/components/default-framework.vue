<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-13 14:50:02
 * @LastEditTime: 2019-02-28 14:43:27
 * @Description: 组件列表头部的展示框集
 -->
<template>
  <div class="select-col-box">
    <div class="box-row" v-for="(row, rowIndex) in box" :key="rowIndex">
      <div
        :style="{width: `${100 * col.placeholderCol / 24}%`, height: `${col.height}px`}"
        class="col-item"
        :class="{active: col.active}"
        v-for="(col, colIndex) in row.col"
        :key="colIndex"
        @click="handleClickCol(col)"
      >{{col.placeholderCol}}</div>
    </div>
  </div>
</template>

<script>
const box = [
  {
    col: [
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 },
      { active: false, height: 30, placeholderCol: 4.8 }
    ]
  },
  {
    col: [
      { active: false, height: 50, placeholderCol: 16 },
      { active: false, height: 50, placeholderCol: 8 }
    ]
  },
  {
    col: [
      { active: false, height: 50, placeholderCol: 12 },
      { active: false, height: 50, placeholderCol: 12 }
    ]
  },
  {
    col: [
      { active: false, height: 50, placeholderCol: 8 },
      { active: false, height: 50, placeholderCol: 8 },
      { active: false, height: 50, placeholderCol: 8 }
    ]
  },
  { col: [{ active: false, height: 50, placeholderCol: 24 }] }
];

export default {
  name: "default-framework",
  data() {
    return {
      box
    };
  },
  methods: {
    handleClickCol(col) {
      this.box.forEach(row => {
        row.col.forEach(col => {
          col.active = false;
        });
      });
      col.active = true;
      this.$emit("click-col", col);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/variate.scss";

.select-col-box {
  @include default-flex;
  background-color: $defaultColor;
  flex-wrap: wrap;
  padding: 1rem 10rem;
  width: 100%;
  .box-row {
    @include default-flex;
    margin: 0.5rem 0;
    width: 100%;
    .col-item {
      @include previewItem;
      @include cur-p;
      &.active {
        @include default-col-border;
        border-color: rgb(239, 132, 75);
        border-width: 2px;
      }
    }
  }
}
</style>

