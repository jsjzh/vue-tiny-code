<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-02 15:47:44
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-03-04 17:50:05
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
        v-for="(row, rowIndex) in layoutData.children"
        :key="rowIndex"
        :style="{justifyContent: row.align, height: `${row.height}px`}"
        @drop="handleDropRow($event, row, rowIndex)"
        @mouseover="row.showControllerBar = true"
        @mouseleave="row.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div
            draggable="true"
            v-if="row.showControllerBar"
            @dragstart="handleDragRow($event, row, rowIndex)"
            class="row-controller-bar"
          >
            <div
              class="row-controller-bar-title-box"
              :title="row.index + 1"
            >index: {{row.index + 1}}</div>
            <div
              class="row-controller-bar-title-box"
              :title="row.height"
            >suggest-height: {{row.height}}</div>
            <div
              class="row-controller-bar-title-box"
              :title="PAGE_suggestLayout(row.children)"
            >suggest-col: {{PAGE_suggestLayout(row.children)}}</div>
            <div
              class="row-controller-bar-title-box"
              :title="PAGE_realLayout(row.children)"
            >real-col: {{PAGE_realLayout(row.children)}}</div>
            <div class="controller-bar-right-box">
              <span
                :title="align.title"
                class="align-type-item"
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
          :style="{height: `${row.height}px`, width: `${100 / (24 / col.layoutCol)}%`, backgroundImage: col.previewImage ? `url(${col.previewImage})` : null, cursor: col.previewImage ? 'all-scroll' : null}"
          :key="colIndex"
          :draggable="col.previewImage ? true : false"
          @mouseover="col.previewImage ? col.showChildrenControllerBar = true : ''"
          @mouseleave="col.showChildrenControllerBar = false"
          @dragstart="handleDragCol($event, col, true)"
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
      :style="{top: `${addContainerTop}px`}"
      v-if="!addRow.show"
      title="add row"
      @click="addRow.show = true"
    />
    <i
      class="el-icon-plus drag-report-add-col-icon report-ps-icon-btn"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addCol.show"
      title="add col"
      @click="addCol.show = true"
    />
    <i
      class="el-icon-d-arrow-right drag-report-preview-icon report-ps-icon-btn"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addCol.show"
      title="preview"
      @click="handleToPreviewPage"
    />

    <transition name="slide-fade">
      <div
        class="drag-report-add-box drag-report-add-row-box"
        :style="{top: `${addContainerTop}px`}"
        v-show="addRow.show"
        @mouseover="addRow.showControllerBar = true"
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
          @drag-row-end="handleDragNewRowEnd"
        />
      </div>
    </transition>

    <transition name="slide-fade">
      <div
        class="drag-report-add-box drag-report-add-col-box"
        :style="{top: `${addContainerTop}px`}"
        v-show="addCol.show"
        @mouseover="addCol.showControllerBar = true"
        @mouseleave="addCol.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div class="title-box" v-if="addCol.showControllerBar">
            <i class="el-icon-close" @click="addCol.show = false"/>
          </div>
        </transition>

        <default-framework
          v-clickoutside="handleClickoutside(addCol)"
          @drag-col-start="handleDragNewColStart"
          @drag-col-end="handleDragNewColEnd"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash";

import clickoutside from "@/util/clickoutside";
import { deepClone, filterByKey } from "@/util/pageUtil";

import { layoutData, alignType, dragReportData } from "./js/variable";

import defaultFramework from "./components/default-framework";
import defaultLayoutEditor from "./components/default-layout-editor";

const arr = ["initLayoutCol"];
const arr2 = ["initLayoutCol", "layoutCol"];

export default {
  name: "dragReport",
  components: { defaultFramework, defaultLayoutEditor },
  directives: { clickoutside },
  data() {
    return {
      dragReportData,
      layoutData,
      alignType,
      addContainerTop: 0,
      dragData: {
        isRow: false,
        isOldRow: false,
        isOldCol: false,
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
    handleClickoutside(container) {
      return function() {
        container.show && (container.show = false);
      };
    },
    handleDragNewColEnd() {},
    handleDragNewColStart(col) {
      this.handleDragCol(null, col);
    },
    PAGE_realLayout(children) {
      return children.map(item => item.layoutCol).join(" : ");
    },
    PAGE_suggestLayout(children) {
      return children.map(item => item.initLayoutCol).join(" : ");
    },
    resolveLayoutData() {
      let layoutData = deepClone(this.layoutData);
      layoutData.children.forEach(row => {
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
      console.log(row);
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
    handleDragNewRowEnd(row) {},
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
        let behindRow = this.layoutData.children.reduce((prev, curr) => {
          if (curr.index > rowIndex) {
            return [...prev, curr];
          } else {
            return prev;
          }
        }, []);
        behindRow.forEach(row => row.index++);
        this.layoutData.children.push({
          ...this.dragData.row,
          index: rowIndex + 1
        });
        this.sortRow();
      }
    },
    handleDragCol(event, component, isOldCol = false) {
      let obj = component;
      if (!isOldCol) {
        let componentType = component.types.find(
          type => type.value === component.selectValue
        );
        // 若有需要新增的内容，需要在这里增加
        obj = {
          componentName: componentType.componentName,
          api: componentType.api,
          method: componentType.method,
          dataKey: componentType.dataKey,
          title: componentType.label,

          layoutCol: component.layoutCol,
          previewImage: component.previewImage
        };
      }
      this.dragData.isRow = false;
      this.dragData.component = obj;
      // 代表是否是拖动的以摆好位置的组件，如果为 true 则需要删除已经排好的那个组件
      this.dragData.isOldCol = isOldCol;
      this.addCol.show = false;
    },
    sortRow() {
      this.layoutData.children = this.layoutData.children.sort(
        (a, b) => a.index - b.index
      );
    },
    resetComponent(component) {
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
      if (this.layoutData.children.length === 1) {
        this.$msg("1_至少需要一条布局");
        return;
      }
      let index = this.layoutData.children.findIndex(
        item => item.index === row.index
      );
      this.layoutData.children.splice(index, 1);
    },
    handleRemoveComponent(event, component) {
      this.resetComponent(component);
    },
    handleDropCol(event, targetLayout) {
      if (this.dragData.isRow) return;
      event.preventDefault();

      let _component = deepClone(this.dragData.component);
      let _targetLayout = deepClone(targetLayout);

      console.log(_component);

      Object.keys(_component).forEach(key => {
        let value = _component[key];
        if (arr.indexOf(key) === -1) {
          this.$set(targetLayout, key, value);
        }
      });
      // 如果拖动的是已经布局好的组件
      if (this.dragData.isOldCol) {
        // 第一种，如果拖动至空的布局内，需要将原先的那个布局内的组件删去
        this.resetComponent(this.dragData.component);
        // 第二种，如果拖动至已有组件的布局内，则需要将两嗝组件内容对调，该逻辑是先删除原有的，再重新赋值
        if (_targetLayout.previewImage) {
          Object.keys(_targetLayout).forEach(key => {
            let value = _targetLayout[key];
            if (arr.indexOf(key) === -1) {
              this.$set(this.dragData.component, key, value);
            }
          });
        }
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
    }
  },
  mounted() {
    this.$$listeners = { scroll: null };
    this.$$listeners.scroll = debounce(this.handleListenerScroll, 0);
    window.addEventListener("scroll", this.$$listeners.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$$listeners.scroll);
  }
};
</script>

<style lang="scss" scoped>
@import "./css/layout.scss";
</style>