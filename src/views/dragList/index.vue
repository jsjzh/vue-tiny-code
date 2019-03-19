<template>
  <div class="container">
    <div v-for="box in 2" :key="box" class="box">
      <drag-group class="drag-group">
        <drag-item v-for="item in 10" :key="item" class="drag-item">
          <div>drag-item-info drag-item-info drag-item-info drag-item-info</div>
        </drag-item>
      </drag-group>
    </div>
  </div>
</template>

<script>
import dragGroup from "@/components/drag-group";
import dragItem from "@/components/drag-item";

export default {
  name: "dragList",
  components: { dragGroup, dragItem }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
.drag-group {
  width: 200px;
  height: 300px;
  border: 1px solid black;
  overflow: auto;
}
.drag-item {
  cursor: pointer;
  user-select: none;
  margin: 0.5rem;
  border: 1px solid black;
}
</style>
