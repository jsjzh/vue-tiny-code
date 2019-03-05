<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-02 15:47:44
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-05 15:21:20
 * @Description: 拖动布局排版，更改原先的想法，首先，需要一些固定布局（12:12）（8:8:8）（6:6:6:6）等等
      然后拖动组件进行内容填充，对于该位置已经有组件的地方，可以选择取代或者交换两者位置
      关键就在于，要有一些固定的布局排版，然后填充组件，可拖拽的部件为组件；行（parent），layout 的布局不可以更改
 -->
<template>
  <div class="drag-report">
    <div class="drag-report-title">{{dragReportData.title.toUpperCase()}}</div>
    <div class="drag-report-container">
      <div
        class="layout-row-box"
        v-for="(row, rowIndex) in dragReportData.children"
        :key="rowIndex"
        :style="{justifyContent: row.align, height: `${row.height}px`}"
        @drop="handleDropRow($event, row, rowIndex)"
        @mouseenter="row.showControllerBar = true"
        @mouseleave="row.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div
            draggable="true"
            v-if="row.showControllerBar"
            @dragstart="handleDragRow($event, row, rowIndex)"
            class="row-controller-bar"
          >
            <div class="row-controller-bar-title-box">index: {{row.index + 1}}</div>
            <div class="row-controller-bar-title-box">suggest-height: {{row.height}}</div>
            <div
              class="row-controller-bar-title-box"
            >suggest-col: {{PAGE_layout(row.children, "initCol")}}</div>
            <div class="row-controller-bar-title-box">real-col: {{PAGE_layout(row.children, "col")}}</div>
            <div class="controller-bar-right-box">
              <span
                class="align-type-item"
                :title="align.title"
                :class="{active: row.align  === align.value}"
                v-for="(align, alignIndex) in alignType"
                :key="alignIndex"
                @click="row.align = align.value"
              >{{align.label}}</span>
              <span
                class="align-type-item remove-item"
                @click="handleRemoveRow($event, row)"
              >remove-row</span>
            </div>
          </div>
        </transition>

        <div
          class="layout-col-box"
          v-for="(col, colIndex) in row.children"
          :style="previewColStyle({width: col.col, height: row.height}, 100, 1, 24, {backgroundImage: col.previewImage ? `url(${col.previewImage})` : null, cursor: col.previewImage ? 'all-scroll' : null})"
          :key="colIndex"
          :draggable="col.previewImage ? true : false"
          @click="handleClickCol(col)"
          @mouseenter="col.previewImage ? col.showChildrenControllerBar = true : null"
          @mouseleave="col.showChildrenControllerBar = false"
          @dragstart="handleDragCol($event, col, false)"
          @drop="handleDropCol($event, col)"
          @dragover="handleDragOver($event, col)"
          @dragleave="handleDragLeave($event, col)"
        >
          <transition name="slide-fade">
            <div class="col-controller-bar" v-if="col.showChildrenControllerBar">
              <span class="col-controller-bar-title-box" style="float: left">{{col.title}}</span>
              <span
                class="col-controller-bar-title-box remove-item"
                @click="handleRemoveComponent($event, col)"
              >remove-col</span>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <i
      class="el-icon-plus drag-report-add-row-icon report-ps-icon-btn"
      title="add row"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addRow.show"
      @click="addRow.show = true"
    />
    <i
      class="el-icon-plus drag-report-add-col-icon report-ps-icon-btn"
      title="add col"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addCol.show"
      @click="addCol.show = true"
    />
    <i
      class="el-icon-d-arrow-right drag-report-preview-icon report-ps-icon-btn"
      title="preview"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addCol.show"
      @click="handleToPreviewPage"
    />

    <transition name="slide-fade">
      <div
        class="drag-report-add-box drag-report-add-row-box"
        :style="{top: `${addContainerTop}px`}"
        v-show="addRow.show"
        @mouseenter="addRow.showControllerBar = true"
        @mouseleave="addRow.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div class="title-box" v-if="addRow.showControllerBar">
            <i class="el-icon-close" @click="addRow.show = false"/>
          </div>
        </transition>

        <default-layout-editor
          v-clickoutside="handleClickoutside(addRow)"
          @drag-row-start="handleDragNewRowStart"
        />
      </div>
    </transition>

    <transition name="slide-fade">
      <div
        class="drag-report-add-box drag-report-add-col-box"
        :style="{top: `${addContainerTop}px`}"
        v-show="addCol.show"
        @mouseenter="addCol.showControllerBar = true"
        @mouseleave="addCol.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div class="title-box" v-if="addCol.showControllerBar">
            <i class="el-icon-close" @click="addCol.show = false"/>
          </div>
        </transition>

        <default-framework
          v-clickoutside="handleClickoutside(addCol)"
          @drag-col-start="handleDragCol"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash";

import clickoutside from "@/util/clickoutside";
import { deepClone, filterByKey } from "@/util/pageUtil";
import colStyle from "./mixins/col-style";

import {
  layoutData,
  alignType,
  dragReportData,
  componentDatas
} from "./js/variable";

import defaultFramework from "./components/default-framework";
import defaultLayoutEditor from "./components/default-layout-editor";

const arr = ["initLayoutCol"];
const arr2 = ["initLayoutCol", "layoutCol"];

export default {
  name: "dragReport",
  components: { defaultFramework, defaultLayoutEditor },
  directives: { clickoutside },
  mixins: [colStyle],
  data() {
    return {
      dragReportData: {
        title: "",
        children: []
      },
      layoutData,
      alignType,
      addContainerTop: 0,
      dragData: {
        isRow: false,
        isOldRow: false,
        isNewCol: false,
        component: null,
        row: null,
        rowIndex: null
      },
      addRow: {
        show: false,
        showControllerBar: false
      },
      addCol: {
        show: false,
        showControllerBar: false
      }
    };
  },
  methods: {
    handleClickCol(col) {
      console.log("col :", col);
    },
    handleClickoutside(container) {
      return function() {
        container.show && (container.show = false);
      };
    },
    PAGE_layout(cols, key) {
      return cols.map(item => item[key]).join(" : ");
    },
    resolveLayoutData() {
      let layoutData = deepClone(this.layoutData);
      dragReportData.children.forEach(row => {
        delete row.showControllerBar;
        row.children.forEach(col => {
          delete col.initLayoutCol;
          delete col.previewImage;
          delete col.showChildrenControllerBar;
        });
      });
      return layoutData;
    },
    handleToPreviewPage() {
      let layoutData = this.resolveLayoutData();
      window.localStorage.setItem(
        "dragReport-layoutData",
        JSON.stringify(layoutData)
      );
      let routeUrl = this.$router.resolve({ path: "/previewReport" });
      window.open(routeUrl.href, "_blank");
    },
    handleShowAddContainer(target) {
      target.show = true;
    },
    handleDragNewRowStart(row) {
      this.dragData.isRow = true;
      this.dragData.isOldRow = false;
      let children = row.map(col => ({
        showChildrenControllerBar: false,
        layoutCol: col.value,
        initLayoutCol: col.value
      }));
      let obj = {
        align: "left",
        height: row[0].height,
        showControllerBar: false,
        children
      };
      this.dragData.row = obj;
    },
    handleDragRow(event, row, rowIndex) {
      this.dragData.isRow = true;
      this.dragData.isOldRow = true;
      this.dragData.row = row;
      this.dragData.rowIndex = rowIndex;
    },
    handleDropRow(event, row, rowIndex) {
      if (!this.dragData.isRow) return;
      if (this.dragData.isOldRow) {
        // TODO 似乎索引会有出错的时候，不过好像不影响使用，先放着，以后改
        this.dragData.row.index = rowIndex;
        row.index = this.dragData.rowIndex;
        this.sortRow();
      } else {
        let behindRow = this.dragReportData.children.reduce((prev, curr) => {
          if (curr.index > rowIndex) {
            return [...prev, curr];
          } else {
            return prev;
          }
        }, []);
        behindRow.forEach(row => row.index++);
        this.dragReportData.children.push({
          ...this.dragData.row,
          index: rowIndex + 1
        });
        this.sortRow();
      }
    },
    handleDragCol(event, component, isNewCol = true) {
      /**
       * isNewCol 区分是否是拖动的新的组件
       */
      this.dragData.isRow = false;
      this.dragData.component = deepClone(component);
      this.dragData.isNewCol = isNewCol;
      this.addCol.show = false;
    },
    sortRow() {
      this.dragReportData.children = this.dragReportData.children.sort(
        (a, b) => a.index - b.index
      );
    },
    delCol(component) {
      const arr = ["initLayoutCol"];
      Object.keys(component).forEach(key => {
        if (key === "layoutCol") {
          component["layoutCol"] = component["initLayoutCol"];
        } else if (arr.indexOf(key) === -1) {
          this.$delete(component, key);
        }
      });
    },
    handleRemoveRow(event, row) {
      if (this.dragReportData.children.length === 1) {
        this.$msg("1_至少需要一条布局");
        return;
      }
      let index = this.dragReportData.children.findIndex(
        item => item.index === row.index
      );
      this.dragReportData.children.splice(index, 1);
    },
    handleRemoveComponent(event, component) {
      this.delCol(component);
    },
    setCol(from, target) {
      for (const key in from) {
        if (from.hasOwnProperty(key)) {
          this.$set(target, key, from[key]);
        }
      }
    },
    handleDropCol(event, target) {
      // 如果拖动的是 row，忽略
      if (this.dragData.isRow) return;
      // 赋值 col
      let _component = deepClone(this.dragData.component);
      let _target = deepClone(target);
      this.setCol(_component, target);
      // 如果拖动的不是新的 Col
      if (!this.dragData.isNewCol) {
        // 如果拖动的不是新的组件
        // 第一种，如果拖动至已有组件的布局内，则需要将两嗝组件内容对调，该逻辑是先删除原有的，再重新赋值
        // if (target.componentName) {
        //   this.setCol(_target, this.dragData.component);
        // }
        // 第二种，如果拖动至空的布局内，只要将原先的那个删去即可
        this.delCol(this.dragData.component);
      }
    },
    handleDragLeave(event, targetLayout) {
      event.preventDefault();
    },
    handleDragOver(event, targetLayout) {
      event.preventDefault();
    },
    handleListenerScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      this.addContainerTop = scrollTop;
    },
    resolveReportData(dragReportData) {
      // 为保证存到数据库的数据尽量小，需要对数据做一些优化
      dragReportData.children &&
        dragReportData.children.forEach(row => {
          row.showControllerBar = false;
          row.children &&
            row.children.forEach((col, colIndex) => {
              let mixinCol = { showChildrenControllerBar: false };
              let curr = componentDatas.find(
                component => component.componentKey === col.componentKey
              );
              curr &&
                (row.children[colIndex] = { ...curr, ...col, ...mixinCol });
            });
        });
      console.log(dragReportData);
      this.dragReportData = dragReportData;
    },
    addListener() {
      this.$$listeners = { scroll: null };
      this.$$listeners.scroll = debounce(this.handleListenerScroll, 0);
      window.addEventListener("scroll", this.$$listeners.scroll);
    }
  },
  mounted() {
    this.addListener();
    this.resolveReportData(dragReportData);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$$listeners.scroll);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/layout.scss";
</style>