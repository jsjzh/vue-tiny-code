<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-02 15:47:44
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-02-04 12:27:12
 * @Description: 拖动布局排版，更改原先的想法，首先，需要一些固定布局（12:12）（8:8:8）（6:6:6:6）等等
      然后拖动组件进行内容填充，对于该位置已经有组件的地方，可以选择取代或者交换两者位置
      关键就在于，要有一些固定的布局排版，然后填充组件，可拖拽的部件为组件；行（parent），layout 的布局不可以更改
 -->
<template>
  <div class="group-report-container">
    <div
      class="layout-box"
      @drop="handleDrop($event, layout)"
      @dragover="handleDragOver($event, layout)"
      v-for="layout in layoutData"
      :key="layout.id"
    >
      <template v-if="layout.boxs.length">
        <div
          class="box"
          draggable="true"
          @drag="handleDrag($event, layout, box)"
          :style="{width: `${100 / layout.boxs.length}%`}"
          v-for="(box, boxIndex) in layout.boxs"
          :key="boxIndex"
        >{{box.label}}</div>
      </template>
    </div>
  </div>
</template>

<script>
import { layoutData, ztreeData } from "./js/data";

export default {
  name: "dragReport",
  data() {
    return {
      layoutData,
      dragData: {
        insertIndex: null,
        parent: null,
        box: null
      }
    };
  },
  methods: {
    handleDrop(event, targetLayout) {
      event.preventDefault();
      let index = this.dragData.parent.boxs.findIndex(
        item => item.id === this.dragData.box.id
      );
      if (index !== -1) {
        this.dragData.parent.boxs.splice(index, 1);
      }
      targetLayout.boxs.push(this.dragData.box);
    },
    handleDragLeave(event) {
      event.preventDefault();
      event.target.style.borderStyle = "solid";
    },
    handleDragOver(event, targetLayout) {
      event.preventDefault();
    },
    handleDrag(event, parent, box) {
      this.dragData.parent = parent;
      this.dragData.box = box;
    },
    setDragData(key, value) {
      this.dragData[key] = value;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/layout.scss";
</style>

<style lang="scss" scoped>
</style>


