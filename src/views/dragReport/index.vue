<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-02 15:47:44
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-04 16:57:50
 * @Description: 拖动布局排版，更改原先的想法，首先，需要一些固定布局（12:12）（8:8:8）（6:6:6:6）等等
      然后拖动组件进行内容填充，对于该位置已经有组件的地方，可以选择取代或者交换两者位置
      关键就在于，要有一些固定的布局排版，然后填充组件，可拖拽的部件为组件；行（parent），layout 的布局不可以更改
 -->
<template>
  <div>
    <div class="group-report-container">
      <div class="layout-row-box" v-for="(row, rowIndex) in layoutData.children" :key="rowIndex">
        <div
          class="layout-col-box"
          style="height: 100%"
          :style="{width: `${100 / row.children.length}%` }"
          v-for="(col, colIndex) in row.children"
          :key="colIndex"
          @drop="handleDrop($event, col)"
          @dragover="handleDragOver($event, col)"
          @dragleave="handleDragLeave($event, col)"
        >{{col.label}}</div>
      </div>
    </div>
    <div class="components-container">
      <div
        class="components-box"
        v-for="(component, index) in componentsData"
        draggable="true"
        @drag="handleDrag($event, component)"
        :key="index"
      >{{component.label}}</div>
    </div>
  </div>
</template>

<script>
import { layoutData, ztreeData, componentsData } from "./js/data";

export default {
  name: "dragReport",
  data() {
    return {
      layoutData,
      componentsData,
      dragData: {
        component: null
      }
    };
  },
  methods: {
    handleDrop(event, targetLayout) {
      event.preventDefault();
      targetLayout = this.dragData.component;
    },
    handleDragLeave(event, targetLayout) {
      event.preventDefault();
      // console.log(event);
    },
    handleDragOver(event, targetLayout) {
      event.preventDefault();
      // console.log(event);
    },
    handleDrag(event, component) {
      this.dragData.component = component;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/layout.scss";
</style>


