<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @Date: 2019-02-02 15:47:44
 * @LastEditors: jsjzh
 * @LastEditTime: 2019-05-09 16:59:04
 * @Description: 拖动布局排版，更改原先的想法，首先，需要一些固定布局（12:12）（8:8:8）（6:6:6:6）等等，然后拖动组件进行内容填充，对于该位置已经有组件的地方，可以选择取代或者交换两者位置，关键就在于，要有一些固定的布局排版，然后填充组件，可拖拽的部件为组件；行（parent），layout 的布局不可以更改
 -->
<template>
  <div v-loading="isLoading" class="drag-report-main-container">
    <div class="drag-report-title">
      <span
        v-if="!showTitleEditer"
        @click="handleEditTitle"
      >{{dragReportData.title || 'pleace enter the report name'}}</span>
      <el-input
        v-if="showTitleEditer"
        ref="titleInput"
        style="width: 500px"
        v-model="dragReportData.title"
        @keyup.enter.native="showTitleEditer = false"
        @blur="showTitleEditer = false"
        placeholder="please enter the report name"
      />
    </div>
    <div class="drag-report-container">
      <div
        class="layout-row-box"
        v-for="(row, rowIndex) in dragReportData.children"
        :key="rowIndex"
        :style="{justifyContent: row.align, height: `${row.initHeight}px`}"
        @drop="handleDropRow($event, row)"
        @dragover="handleDragOver($event, row)"
        @mouseenter="row.showControllerBar = true"
        @mouseleave="row.showControllerBar = false"
      >
        <transition name="slide-fade">
          <div
            draggable="true"
            v-if="row.showControllerBar"
            @dragstart="handleDragRow($event, row)"
            class="row-controller-bar"
          >
            <div
              class="row-controller-bar-layout-info-box"
              :title="`index: ${row.index} init-height: ${row.initHeight} init-col: ${PAGE_layout(row.children, 'initCol')} real-col: ${PAGE_layout(row.children, 'col')}`"
            >
              <span class="row-controller-bar-layout-info">index: {{row.index}}</span>
              <span class="row-controller-bar-layout-info">init-height: {{row.initHeight}}</span>
              <span
                class="row-controller-bar-layout-info"
              >init-col: {{PAGE_layout(row.children, "initCol")}}</span>
              <span
                class="row-controller-bar-layout-info"
              >real-col: {{PAGE_layout(row.children, "col")}}</span>
            </div>

            <div class="row-controller-bar-row-title">
              <el-input v-model="row.title" size="mini" placeholder="please enter the row title"/>
            </div>
            <div class="controller-bar-right-box">
              <span
                class="align-type-item"
                :title="align.title"
                :class="{active: row.align  === align.value}"
                :key="alignIndex"
                v-for="(align, alignIndex) in alignType"
                @click="row.align = align.value"
              >{{align.label}}</span>
              <span class="align-type-item remove-item" @click="handleRemoveRow($event, row)">remove</span>
            </div>
          </div>
        </transition>

        <!-- 这里的 height 有点问题，到底是应该用 row 的 height 还是 col 的 height -->
        <div
          class="layout-col-box"
          v-for="(col, colIndex) in row.children"
          :style="previewColStyle({width: col.initCol, height: row.initHeight}, 100, 1, 24, {backgroundImage: col.previewImage ? `url(${col.previewImage})` : null, cursor: col.previewImage ? 'all-scroll' : null})"
          :key="colIndex"
          :draggable="col.previewImage ? true : false"
          @mouseenter="col.previewImage ? col.showChildrenControllerBar = true : null"
          @mouseleave="col.showChildrenControllerBar = false"
          @dragstart="handleDragCol($event, col)"
          @drop="handleDropCol($event, col)"
          @dragover="handleDragOver($event, col)"
        >
          <transition name="slide-fade">
            <div class="col-controller-bar" v-if="col.showChildrenControllerBar">
              <span class="col-controller-bar-title-box" style="float: left">{{col.title}}</span>
              <span class="col-controller-bar-title-box remove-item" @click="resetCol(col)">remove</span>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <i
      class="el-icon-plus add-row-icon ps-icon-btn"
      title="add row"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addRow.show"
      @click="addRow.show = true"
    />

    <i
      class="el-icon-plus add-col-icon ps-icon-btn"
      title="add col"
      :style="{top: `${addContainerTop}px`}"
      v-if="!addCol.show"
      @click="addCol.show = true"
    />

    <i
      class="el-icon-d-arrow-right preview-icon ps-icon-btn"
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
          <div class="title-box" v-if="addCol.showControllerBar">
            <i class="el-icon-close" @click="addCol.show = false"/>
          </div>
        </transition>

        <default-framework
          v-clickoutside="handleClickoutside(addCol)"
          @drag-col-start="handleDragNewCol"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { debounce } from "lodash";
import {
  deepClone,
  openNewTab,
  setStorage,
  diffIndex,
  mixinObjs
} from "@/utils";
import {
  getInitRow,
  getInitCol,
  resetIndex,
  alignType,
  layoutDataToPreviewData,
  PreviewDataToLayoutData
} from "@/utils/dragReport";
import colStyle from "@/mixins/methods/col-style";

import clickoutside from "@/directive/clickoutside";

import defaultFramework from "@/components/default-framework";
import defaultLayoutEditor from "@/components/default-layout-editor";

import { getcomponentinfo, getreportcomponentinfo } from "@/api";

const colSkipArr = ["initCol"];

export default {
  name: "dragReport",
  components: { defaultFramework, defaultLayoutEditor },
  directives: { clickoutside },
  mixins: [colStyle],
  data() {
    return {
      isLoading: true,
      showTitleEditer: false,
      dragReportData: {
        title: "",
        children: []
      },
      // 拖动 row 和 col 的内容存储地
      dragData: {
        // 拖动的如果是 row
        isRow: false,
        // 拖动的是新的 row
        isNewRow: false,
        // 拖动的是新的 col
        isNewCol: false,
        // col 信息
        col: null,
        // row 信息
        row: null
      },
      alignType,
      addContainerTop: 30,
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
    // 拖动新的 row
    handleDragNewRow(event, row) {
      this.dragData.isRow = true;
      this.dragData.isNewRow = true;
      this.dragData.row = getInitRow(row);
    },
    // 拖动已存在的 row 重排时
    handleDragRow(event, row) {
      this.dragData.isRow = true;
      this.dragData.isNewRow = false;
      this.dragData.row = row;
    },
    // 对 dropRow 的函数处理
    handleDropRow(event, drapRow) {
      if (!this.dragData.isRow) return;
      const { row: dragRow } = this.dragData;
      const { children: rows } = this.dragReportData;
      // 用来限制高度
      // let sum = rows.reduce((pre, curr) => (pre += curr.height), 0);
      if (!this.dragData.isNewRow) {
        // 如果拖拽的不是新的 row
        // 则交换两个 row 的 index，并对 rows 进行 sort
        [dragRow.index, drapRow.index] = [drapRow.index, dragRow.index];
        this.sortRows();
      } else {
        // 如果拖拽的是新的 row
        // 用来限制高度
        // if (sum + dragRow.initHeight > 2300) this.$msg("1_高度超出一页纸");
        // 找出 drapRow 后面的所有 rows，并把他们的 index + 1
        // 为的是拖拽放置的时候能放置在被 drap 的 row 后面
        rows.forEach(row => (row.index > drapRow.index ? row.index++ : null));
        rows.push(mixinObjs(dragRow, { index: drapRow.index + 1 }));
        this.sortRows();
      }
    },
    // 重排 rows，并会对 index 重新赋值
    sortRows() {
      const { children: rows } = this.dragReportData;
      rows.sort(diffIndex);
      rows.forEach(resetIndex);
    },
    // 删除某 row
    handleRemoveRow(event, row) {
      const { children: rows } = this.dragReportData;
      if (rows.length === 1) {
        this.$msg("1_至少需要一条布局");
        return;
      }
      rows.splice(row.index - 1, 1);
    },
    // edit col functions
    handleDragOver(event) {
      // 默认情况下，对于 drop 的元素，要使用 dragover 移除默认事件，event.preventDefault()
      event.preventDefault();
    },
    // 拖动一个新的 col
    handleDragNewCol(event, col) {
      this.dragData.isRow = false;
      this.dragData.isNewCol = true;
      this.dragData.col = col;
    },
    // 拖动一个已存在布局中的 col
    handleDragCol(event, col) {
      this.dragData.isRow = false;
      this.dragData.isNewCol = false;
      this.dragData.col = col;
    },
    // 放置一个 col
    handleDropCol(event, col) {
      // 如果拖动的是 row，不用管
      if (this.dragData.isRow) return;
      const { col: dragCol } = this.dragData;
      let cacheDragCol = deepClone(dragCol);
      let cacheCol = deepClone(col);
      if (!this.dragData.isNewCol) {
        // 若拖动的 col 不是新 col
        // 有两种情况要考虑，一个是放置的位置没有 col
        // 一个是放置的位置有 col
        // TODO 最好不是用 previewImage 来判断，想办法用其他办法来判断
        if (col.previewImage) {
          // 若放置的位置不是空的，则将两者交换
          this.setCol(cacheDragCol, col);
          this.setCol(cacheCol, dragCol);
        } else {
          // 若放置的位置是空的，则将 col 赋值并重置 from
          this.setCol(dragCol, col);
          this.resetCol(dragCol);
        }
      } else {
        // 若拖动的 col 是新的 col
        // 则只需要将 col 赋值即可
        this.setCol(cacheDragCol, col);
        this.addCol.show = true;
      }
    },
    delCol(col) {
      for (const key in col) {
        if (col.hasOwnProperty(key)) {
          if (colSkipArr.indexOf(key) === -1) {
            this.$delete(col, key);
          }
        }
      }
    },
    setCol(from, to) {
      for (const key in from) {
        if (from.hasOwnProperty(key)) {
          if (colSkipArr.indexOf(key) === -1) {
            this.$set(to, key, from[key]);
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
    PAGE_layout(cols, key) {
      return cols.map(item => (item[key] ? item[key] : 0)).join(":");
    },
    handleEditTitle() {
      this.showTitleEditer = true;
      this.$nextTick(() => {
        let { titleInput } = this.$refs;
        titleInput.focus();
      });
    },
    handleClickoutside(container) {
      return function() {
        container.show && (container.show = false);
      };
    },
    handleToPreviewPage() {
      let previewData = layoutDataToPreviewData(this.dragReportData);
      setStorage("drag-report-data", JSON.stringify(previewData));
      setStorage("drag-report-data:isEdit", true);
      this.$msg("0_现将打开预览页面").then(() => {
        setTimeout(() => {
          let { href } = this.$router.resolve({
            path: "/previewReport",
            query: this.$route.query
          });
          openNewTab(href);
        }, 2000);
      });
    },
    handleListenerScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      this.addContainerTop = scrollTop + 30;
    },
    addListener() {
      this.$$listeners = { scroll: null };
      this.$$listeners.scroll = debounce(this.handleListenerScroll, 10);
      window.addEventListener("scroll", this.$$listeners.scroll);
    }
  },
  mounted() {
    this.isLoading = true;
    this.addListener();
    let { reportUnionKey } = this.$route.query;

    let promises = [
      getcomponentinfo(),
      getreportcomponentinfo({ reportUnionKey })
    ];

    Promise.all(promises)
      .then(ress => {
        let [componentDatas = [], reportData = {}] = ress;
        this.dragReportData = PreviewDataToLayoutData(
          reportData,
          componentDatas,
          { showControllerBar: false },
          { showChildrenControllerBar: false }
        );
      })
      .finally(() => {
        this.isLoading = false;
      });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$$listeners.scroll);
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>