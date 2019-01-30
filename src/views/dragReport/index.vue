<template>
  <div class="group-report-container">
    <div v-for="item in data" :key="item.name + Math.random()">
      <span>{{item.name}}</span>
      <group-box v-if="item.items.length" :items="item.items">
        <component :is="'group-box'" :items="item.items"></component>
      </group-box>
    </div>
  </div>
</template>

<script>
import { data, ztreeData } from "./js/data";
import groupBox from "./components/group-box";

// console.log(data);
// console.log(ztreeData);

export default {
  name: "dragReport",
  components: { groupBox },
  data() {
    return {
      data,
      dragData: { item: null }
    };
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      let nodes = document.querySelectorAll(".box");
      nodes.forEach(item => {
        item.style.borderStyle = "solid";
      });
      // let id = event.dataTransfer.getData("_id");
      let node = document.getElementById(this.dragData.item).cloneNode(true);
      event.target.appendChild(node);
    },
    handleDragLeave(event) {
      event.preventDefault();
      event.target.style.borderStyle = "solid";
    },
    handleDragOver(event) {
      event.preventDefault();
      event.target.style.borderStyle = "dotted";
    },
    handleDrag(event) {
      let id = event.target.id;
      this.dragData.item = id;
      // event.dataTransfer.setData("_id", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./css/layout.scss";
</style>

<style lang="scss" scoped>
.box {
  height: 100px;
  border: 2px solid black;
}
</style>


