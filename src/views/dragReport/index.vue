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
        box: null
      }
    };
  },
  methods: {
    handleDrop(event, targetLayout) {
      event.preventDefault();
      console.log(targetLayout);
      console.log(this.dragData.box);
    },
    handleDragLeave(event) {
      event.preventDefault();
      event.target.style.borderStyle = "solid";
    },
    handleDragOver(event, targetLayout) {
      event.preventDefault();
      console.log(targetLayout);
      targetLayout.box.push(this.dragData.box);
    },
    handleDrag(event, parent, box) {
      // console.log(event);
      // console.log(parent);
      // console.log(box);
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


