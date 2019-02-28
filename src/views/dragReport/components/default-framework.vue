<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-13 14:50:02
 * @LastEditTime: 2019-02-28 17:54:57
 * @Description: 组件列表头部的展示框集
 -->
<template>
  <div>
    <div class="select-col-box">
      <div class="box-row" v-for="(row, rowIndex) in box" :key="rowIndex">
        <div
          class="col-item"
          :class="{ active: col.active }"
          :style="previewColStyle({ width: col.placeholderCol, height: col.height }, 100, 1)"
          v-for="(col, colIndex) in row.col"
          :key="colIndex"
          @click="handleClickCol(col)"
        >{{col.placeholderCol}}</div>
      </div>
    </div>
    <div class="components-container">
      <div
        class="components-row"
        v-for="(component, componentIndex) in componentDatas"
        :key="componentIndex"
      >
        <div class="components-infos-box">
          <div>组件占比：{{component.layoutCol}}</div>
          <div>组件高度：{{component.height}}</div>
        </div>
        <div class="preview-box">
          <div
            class="preview"
            draggable="true"
            :style="{height: `${component.height / 3}px`,width: `${100 * component.layoutCol / 24}%`, backgroundImage: component.previewImage ? `url(${component.previewImage})` : null}"
            @dragstart="handleDragCol($event, component)"
            @dragend="hanDragColEnd($event, component)"
          ></div>
        </div>
        <div class="components-controller-bar">
          <el-select
            size="mini"
            v-model="component.selectValue"
            @change="handleChangeSelectComponent($event, component)"
            placeholder="请选择"
          >
            <el-option
              :label="type.label"
              :value="type.value"
              v-for="(type, typeIndex) in component.types"
              :key="typeIndex"
            ></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { box, componentDatas } from "./variable";
import colStyle from "../mixins/col-style";

export default {
  name: "default-framework",
  mixins: [colStyle],
  data() {
    return { box, initComponentDatas: componentDatas, componentDatas };
  },
  methods: {
    handleDragCol(event, col) {
      this.$emit("drag-col-start", col);
    },
    hanDragColEnd(event, col) {
      this.$emit("drag-col-end", col);
    },
    handleChangeSelectComponent(event, component) {
      let previewImage = component.types.find(
        type => type.value === component.selectValue
      ).previewImage;
      if (previewImage) {
        component.previewImage = previewImage;
      }
    },
    handleClickComType(col) {
      this.componentDatas = this.initComponentDatas.filter(
        item => item.layoutCol === col.placeholderCol
      );
    },
    handleClickCol(col) {
      this.box.forEach(row => {
        row.col.forEach(col => {
          col.active = false;
        });
      });
      col.active = true;
      this.handleClickComType(col);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/variate.scss";

.select-col-box {
  @include default-flex;
  @include flex-full;
  flex-wrap: wrap;
  padding: 1rem 6rem;
  .box-row {
    @include default-flex;
    @include flex-full;
    margin: 0.5rem 0;
    .col-item {
      @include default-col-style;
      @include default-col-layout;
      @include cur-p;
      &.active {
        @include default-col-border;
        border-color: $active-color-1;
      }
    }
  }
}

.components-container {
  @include default-flex;
  width: 100%;
  flex: 1;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  flex-flow: column;
  padding: 0.5rem;
  overflow: auto;
  & .components-row {
    @include default-flex;
    @include default-col-radius;
    @include boxShadow;
    flex-flow: wrap;
    padding: 1rem;
    width: 100%;
    min-height: 200px;
    background: $defaultColor;
    margin: 1rem 0;
    & .components-infos-box {
      width: 100%;
      top: 10px;
      left: 10px;
      color: $defaultActiveColor;
    }
    & .preview-box {
      @include default-flex;
      width: 100%;
      & .preview {
        @include cur-all;
        @include default-background-img;
      }
    }
  }
  & .components-controller-bar {
    flex: 1;
  }
}
</style>

