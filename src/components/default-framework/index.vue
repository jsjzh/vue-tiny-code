<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-13 14:50:02
 * @LastEditTime: 2019-03-06 15:00:49
 * @Description: 组件列表头部的展示框集
 -->
<template>
  <div class="default-framework-container">
    <div class="select-col-box">
      <div class="box-row" v-for="(row, rowIndex) in box" :key="rowIndex">
        <div
          class="col-item"
          :class="{ active: col.active }"
          :style="previewColStyle({ width: col.placeholderCol, height: col.height }, 100, 1)"
          v-for="(col, colIndex) in row.col"
          :key="colIndex"
          @click="handleClickBoxCol(col)"
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
          <div>height: {{component.height}}</div>
          <div>col: {{component.col}}</div>
        </div>
        <div class="preview-box">
          <div
            class="preview"
            draggable="true"
            :style="previewColStyle({ width: component.col, height: component.height }, 100, 3, 24,{backgroundImage: component.previewImage ? `url(${component.previewImage})` : null})"
            @dragstart="handleDragCol($event, component)"
            @dragend="hanDragColEnd($event, component)"
          />
        </div>
        <div class="components-controller-bar">
          <el-input size="mini" :placeholder="component.label" v-model="component.title"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { box, componentDatas } from "@/mock/variable";
import colStyle from "@/mixins/methods/col-style";
import { mixinData } from "@/utils";

export default {
  name: "default-framework",
  mixins: [colStyle],
  data() {
    return { box, initComponentDatas: [], componentDatas: [] };
  },
  methods: {
    handleDragCol(event, col) {
      col.title = col.title || col.label;
      this.$emit("drag-col-start", event, col);
    },
    hanDragColEnd(event, col) {
      this.$emit("drag-col-end", event, col);
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
        item => item.col === col.placeholderCol
      );
    },
    handleClickBoxCol(col) {
      this.box.forEach(row => {
        row.col.forEach(col => {
          col.active = false;
        });
      });
      col.active = true;
      this.handleClickComType(col);
    }
  },
  mounted() {
    let data = { title: "" };
    this.componentDatas = componentDatas.map(component =>
      mixinData(component, data)
    );
    this.initComponentDatas = componentDatas.map(component =>
      mixinData(component, data)
    );
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variable.scss';

.default-framework-container {
  @include default-flex;
  flex-wrap: wrap;
  flex-flow: column;
  height: 100%;
  padding: 2rem 1rem;

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
          color: $active-color-1;
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
      margin: 1rem 0;
      & .components-infos-box {
        width: 100%;
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
}
</style>

