<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-02 15:47:44
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-11 18:39:13
 * @Description: 拖动布局排版，更改原先的想法，首先，需要一些固定布局（12:12）（8:8:8）（6:6:6:6）等等
      然后拖动组件进行内容填充，对于该位置已经有组件的地方，可以选择取代或者交换两者位置
      关键就在于，要有一些固定的布局排版，然后填充组件，可拖拽的部件为组件；行（parent），layout 的布局不可以更改
 -->
<template>
  <div class="drag-report" v-loading="isLoading">
    <div class="drag-report-title">{{dragReportData.title.toUpperCase()}}</div>
    <div class="drag-report-container">
      <div
        class="layout-row-box"
        v-for="(row, rowIndex) in dragReportData.children"
        :key="rowIndex"
        :style="{justifyContent: row.align, height: `${row.height}px`}"
        @drop="handleDropRow($event, row)"
        @dragover="handleDragOver($event, row)"
        @mouseenter="row.showControllerBar = true"
        @mouseleave="row.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div
            draggable="true"
            v-show="row.showControllerBar"
            @dragstart="handleDragRow($event, row)"
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
          :style="previewColStyle({width: col.initCol, height: row.height}, 100, 1, 24, {backgroundImage: col.previewImage ? `url(${col.previewImage})` : null, cursor: col.previewImage ? 'all-scroll' : null})"
          :key="colIndex"
          :draggable="col.previewImage ? true : false"
          @mouseenter="col.previewImage ? col.showChildrenControllerBar = true : null"
          @mouseleave="col.showChildrenControllerBar = false"
          @dragstart="handleDragCol($event, col, false)"
          @drop="handleDropCol($event, col)"
          @dragover="handleDragOver($event, col)"
        >
          <transition name="slide-fade">
            <div class="col-controller-bar" v-show="col.showChildrenControllerBar">
              <span class="col-controller-bar-title-box" style="float: left">{{col.title}}</span>
              <span
                class="col-controller-bar-title-box remove-item"
                @click="resetCol(col)"
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
      v-show="!addRow.show"
      @click="addRow.show = true"
    />
    <i
      class="el-icon-plus drag-report-add-col-icon report-ps-icon-btn"
      title="add col"
      :style="{top: `${addContainerTop}px`}"
      v-show="!addCol.show"
      @click="addCol.show = true"
    />
    <i
      class="el-icon-d-arrow-right drag-report-preview-icon report-ps-icon-btn"
      title="preview"
      :style="{top: `${addContainerTop}px`}"
      v-show="!addCol.show"
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
          <div class="title-box" v-show="addRow.showControllerBar">
            <i class="el-icon-close" @click="addRow.show = false"/>
          </div>
        </transition>

        <default-layout-editor
          v-clickoutside="handleClickoutside(addRow)"
          @drag-row-start="handleDragNewRow"
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
          <div class="title-box" v-show="addCol.showControllerBar">
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
import { deepClone } from "@/utils";
import colStyle from "@/mixins/methods/col-style";

import clickoutside from "@/directive/clickoutside";

import defaultFramework from "@/components/default-framework";
import defaultLayoutEditor from "@/components/default-layout-editor";

import { getComponents, getReportData } from "@/api";

const colSkipArr = ["initCol"];

const getInitCol = function(options) {
  let obj = {
    title: null,
    col: 0,
    componentKey: null,
    initCol: 0,
    showChildrenControllerBar: false
  };
  return { ...obj, ...options };
};

export default {
  name: "dragReport",
  components: { defaultFramework, defaultLayoutEditor },
  directives: { clickoutside },
  mixins: [colStyle],
  data() {
    return {
      isLoading: true,
      dragReportData: {
        title: "",
        children: []
      },
      componentDatas: [],
      alignType: [
        { title: "左对齐", label: "left", value: "flex-start" },
        { title: "居中对齐", label: "center", value: "center" },
        { title: "右对齐", label: "right", value: "flex-end" },
        { title: "两侧留白", label: "around", value: "space-around" },
        { title: "两侧对齐", label: "between", value: "space-between" }
      ],
      dragData: {
        isRow: false,
        isNewRow: false,
        isNewCol: false,
        col: null,
        row: null,
        rowIndex: null
      },
      addContainerTop: 0,
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
    // edit row functions
    handleDragNewRow(event, row) {
      this.dragData.isRow = true;
      this.dragData.isNewRow = true;
      this.dragData.row = {
        align: "flex-start",
        height: row[0].height,
        showControllerBar: false,
        children: row.map(col =>
          getInitCol({
            initCol: col.value
          })
        ),
        index: null
      };
    },
    handleDragRow(event, row) {
      this.dragData.isRow = true;
      this.dragData.isNewRow = false;
      this.dragData.row = row;
    },
    handleDropRow(event, row) {
      if (!this.dragData.isRow) return;
      if (!this.dragData.isNewRow) {
        let dragIndex = this.dragData.row.index;
        let oldIndex = row.index;
        this.dragData.row.index = oldIndex;
        row.index = dragIndex;
        this.sortRow();
      } else {
        let { dragReportData } = this;
        let behindRows = dragReportData.children.reduce((prev, curr) => {
          if (curr.index > row.index) {
            return [...prev, curr];
          } else {
            return prev;
          }
        }, []);
        behindRows.forEach(row => row.index++);
        dragReportData.children.push({
          ...this.dragData.row,
          index: row.index + 1
        });
        this.sortRow();
      }
    },
    sortRow() {
      let { dragReportData } = this;
      dragReportData.children = dragReportData.children.sort(
        (a, b) => a.index - b.index
      );
    },
    handleRemoveRow(event, row) {
      let { dragReportData } = this;
      if (dragReportData.children.length === 1) {
        this.$msg("1_至少需要一条布局");
        return;
      }
      let index = dragReportData.children.findIndex(
        item => item.index === row.index
      );
      dragReportData.children.splice(index, 1);
    },
    // edit col functions
    // 另外，突然觉得自己是不是想的复杂了，如果把 col 和 row 一样，用 index 做排序
    handleDragOver(event) {
      // 默认情况下，对于 drop 的元素，要使用 dragover 移除默认事件，event.preventDefault()
      event.preventDefault();
    },
    handleDragCol(event, component, isNewCol = true) {
      /**
       * isNewCol 区分是否是拖动的新的组件
       */
      if (!component.previewImage) return;
      this.dragData.isRow = false;
      this.dragData.col = component;
      this.dragData.isNewCol = isNewCol;
      this.addCol.show = false;
    },
    handleDropCol(event, target) {
      // 如果拖动的是 row，忽略
      if (this.dragData.isRow) return;
      let oldFrom = deepClone(this.dragData.col);
      let oldTarget = deepClone(target);

      this.setCol(this.dragData.col, target);
      if (!this.dragData.isNewCol) {
        // 若拖动的组件不是新组件
        if (oldTarget.previewImage) {
          // 若放置的位置不是空的，则将两者交换
          this.setCol(oldFrom, target);
          this.setCol(oldTarget, this.dragData.col);
        } else {
          // 若放置的位置是空的，则将 from 重置并赋值 target
          this.setCol(this.dragData.col, target);
          this.resetCol(this.dragData.col);
        }
      } else {
        this.addCol.show = true;
      }
    },
    delCol(component) {
      for (const key in component) {
        if (component.hasOwnProperty(key)) {
          if (colSkipArr.indexOf(key) === -1) {
            this.$delete(component, key);
          }
        }
      }
    },
    setCol(from, target) {
      for (const key in from) {
        if (from.hasOwnProperty(key)) {
          if (colSkipArr.indexOf(key) === -1) {
            this.$set(target, key, from[key]);
          }
        }
      }
    },
    resetCol(col) {
      let init = getInitCol({
        initCol: col.initCol
      });
      this.delCol(col);
      this.setCol(init, col);
    },
    // other function
    handleClickoutside(container) {
      return function() {
        container.show && (container.show = false);
      };
    },
    PAGE_layout(cols, key) {
      return cols.map(item => (item[key] ? item[key] : 0)).join(" : ");
    },
    resolvePreviewData() {
      return {
        title: this.dragReportData.title,
        reportKey: this.dragReportData.reportKey,
        children: this.dragReportData.children.map(row => {
          return {
            align: row.align,
            height: row.height,
            index: row.index,
            children: row.children.map(col => ({
              col: col.col,
              componentKey: col.componentKey,
              initCol: col.initCol,
              title: col.title
            }))
          };
        })
      };
    },
    handleToPreviewPage() {
      let previewData = this.resolvePreviewData();
      console.log(JSON.stringify(previewData));
      let routeUrl = this.$router.resolve({
        path: "/previewReport",
        query: { reportKey: previewData.reportKey }
      });
      window.open(routeUrl.href, "_blank");
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
              let curr =
                this.componentDatas.find(
                  component => component.componentKey === col.componentKey
                ) || {};
              this.$set(row.children, colIndex, {
                ...col,
                ...curr,
                ...mixinCol
              });
            });
        });
      this.dragReportData = dragReportData;
    },
    addListener() {
      this.$$listeners = { scroll: null };
      this.$$listeners.scroll = debounce(this.handleListenerScroll, 10);
      window.addEventListener("scroll", this.$$listeners.scroll);
    }
  },
  mounted() {
    this.addListener();
    let promises = [getComponents(), getReportData("first-report")];
    Promise.all(promises)
      .then(ress => {
        this.componentDatas = ress[0];
        this.resolveReportData(ress[1]);
      })
      .finally(() => (this.isLoading = false));
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$$listeners.scroll);
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>