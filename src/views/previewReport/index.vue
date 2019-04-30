<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-15 13:34:50
 * @LastEditTime: 2019-04-30 17:18:39
 * @Description: preview 页面
 -->
<template>
  <div class="preview-report" v-loading="isLoading">
    <div class="preview-container">
      <div class="preview-report-title">{{layoutData.title}}</div>
      <div class="query-infos" v-html="PAGE_queryData"></div>
      <div
        class="layout-row"
        :style="{justifyContent: row.align, height: `${row.height}px`}"
        v-for="(row, rowIndex) in layoutData.children"
        :key="rowIndex"
        @mouseenter="row.showBtns = true"
        @mouseleave="row.showBtns = false"
      >
        <transition name="slide-fade" v-if="row.showBtns">
          <div class="btn-box add-title-btn-box">
            <el-button @click="handleAddTitle(row)" type="primary" size="mini">标题</el-button>
          </div>
        </transition>

        <transition name="slide-fade" v-if="row.showBtns">
          <div class="btn-box add-message-btn-box">
            <el-button @click="handleAddMessage(row)" type="success" size="mini">评语</el-button>
          </div>
        </transition>

        <div
          class="layout-col"
          :style="previewColStyle({width: col.initCol,height: row.height}, 100, 1, 24)"
          v-for="(col, colIndex) in row.children"
          :key="colIndex"
        >
          <default-container v-if="col.componentKey">
            <div class="col-title" :title="`custom-report-${col.componentName}`">{{col.title}}</div>
            <component
              style="flex: 1"
              :is="`custom-report-${col.componentName}`"
              :reportData="col.reportData"
            />
          </default-container>
          <default-container v-else>空组件</default-container>
        </div>
      </div>
    </div>

    <i
      v-if="!loadingExport"
      class="el-icon-download preview-report-report-ps-icon-btn"
      :style="{top: `${editBtnTop}px`}"
      title="export-pdf"
      @click="handleExport"
    />

    <i
      class="el-icon-document preview-report-report-save-icon-btn"
      title="save layout"
      :style="{top: `${editBtnTop}px`}"
      v-if="!loadingExport && isEditPath"
      @click="handleSaveLayout"
    />

    <i
      v-if="!loadingExport"
      class="el-icon-setting preview-report-query-data-icon-btn"
      :style="{top: `${editBtnTop}px`}"
      title="edit-query"
      @click="showQueryContainer = true"
    />

    <transition name="slide-fade">
      <default-select-query
        v-show="showQueryContainer"
        @click-outside="showQueryContainer = false"
        @select-query-done="handleQueryData"
      />
    </transition>
    <div v-if="!loadingExport" class="color-bar">
      <el-button
        v-for="(colorBtn, colorIndex) in colorBtns"
        :key="colorIndex"
        :type="colorBtn.type"
        :title="`switch-${colorBtn.color}-color`"
        @click="handleSwitchColor(`${colorBtn.color}Color`)"
        icon="el-icon-refresh"
        circle
      />
    </div>

    <div id="editor">
      <p>Hello World!</p>
      <p>
        Some initial
        <strong>bold</strong> text
      </p>
      <p>
        <br>
      </p>
    </div>
  </div>
</template>

<script>
import { post, get } from "@/api/service";
import { debounce } from "lodash";

import exportPDF from "@/utils/exportPDF";
import { deepClone, flatLayoutData, resolveStorage } from "@/utils";

import colStyle from "@/mixins/methods/col-style";

import defaultContainer from "@/components/custom-report/default-container";
import defaultSelectQuery from "@/components/custom-report/default-select-query";
import customReports from "./index";

import Quill from "quill";

import {
  defaultColor,
  darkColor,
  shineColor,
  infographicColor
} from "@/components/custom-report/js/chart-variable";

import {
  getcomponentinfo,
  getreportcomponentinfo,
  updatestructureinfo
} from "@/api";

const _methods = { post, get };

const colors = {
  defaultColor,
  darkColor,
  shineColor,
  infographicColor
};

const noop = function() {
  return function() {};
};

export default {
  name: "previewReport",
  mixins: [colStyle],
  data() {
    return {
      isLoading: true,
      isEditPath: false,
      editBtnTop: 30,
      showQueryContainer: false,
      loadingExport: true,
      componentDatas: [],
      layoutData: {},
      queryData: {},
      apiList: {},
      flatData: [],
      requestList: [],
      pageCharts: [],
      colorBtns: [
        { color: "default", type: "primary" },
        { color: "dark", type: "success" },
        { color: "shine", type: "warning" },
        { color: "infographic", type: "danger" }
      ]
    };
  },
  components: { defaultSelectQuery, defaultContainer, ...customReports },
  computed: {
    PAGE_queryData() {
      let str = "";
      let { startTime, endTime, type, targetId, text } = this.queryData;
      text && (str += `<div style="float: right">search target：${text}</div>`);
      startTime && (str += `<div>start time：${startTime}</div>`);
      endTime && (str += `<div>end time：${endTime}</div>`);
      return str;
    }
  },
  methods: {
    handleAddTitle(row) {
      console.log(row);
    },
    handleAddMessage(row) {
      console.log(row);
    },
    handleSaveLayout() {
      let { reportUnionKey } = this.$route.query;
      let previewData = resolveStorage("drag-report-data");
      previewData.children = previewData.children;
      let data = { ...previewData, reportUnionKey };
      updatestructureinfo(data).then(res => {
        this.$msg("0_保存成功");
        this.isEditPath = false;
      });
    },
    handleQueryData(queryData) {
      this.showQueryContainer = false;
      queryData = deepClone(queryData);
      Object.keys(queryData).forEach(key => {
        this.$set(this.queryData, key, queryData[key]);
      });
      this.getRequestsData();
    },

    handleExport() {
      this.loadingExport = true;
      exportPDF(".preview-report", this.layoutData.title);
      setTimeout(() => {
        this.loadingExport = false;
      }, 3000);
    },

    resolveQueryData() {
      let { startTime, endTime, type, targetId, text } = this.$route.query;
      return {
        startTime,
        endTime,
        type,
        targetId,
        text
      };
    },

    resolveReportData(reportData) {
      reportData.children &&
        reportData.children.forEach(row => {
          row.showBtns = false;
          row.children &&
            row.children.forEach((col, colIndex) => {
              let curr =
                this.componentDatas.find(
                  component => component.componentKey === col.componentKey
                ) || {};
              this.$set(row.children, colIndex, {
                ...col,
                ...curr
              });
            });
        });
      return reportData;
    },

    dealRequests() {
      this.flatData = flatLayoutData(this.layoutData);
      let { flatData, apiList } = this;
      for (let index = 0; index < flatData.length; index++) {
        const item = flatData[index];
        const api = item.api;
        if (!api) continue;
        if (api in apiList) {
          apiList[api].sameIndexs.push(index);
        } else {
          apiList[api] = {};
          apiList[api].sameIndexs = [index];
        }
        if (!apiList[api].keys) {
          apiList[api].keys = [];
        }
        apiList[api].keys[index] = item.dataKey;
        apiList[api].method = item.method;
      }

      this.requestList = Object.keys(apiList).map(api => {
        const item = apiList[api];
        let method = item.method ? _methods[item.method] : noop;
        return method(api);
      });

      this.getRequestsData();
    },

    getRequestsData() {
      let { flatData, apiList } = this;
      this.isLoading = true;
      Promise.all(this.requestList.map(request => request(this.queryData)))
        .then(datas => {
          Object.keys(apiList).forEach((api, apiIndex) => {
            let sameIndexs = apiList[api].sameIndexs;
            flatData.forEach((col, colIndex) => {
              if (sameIndexs.findIndex(index => index === colIndex) !== -1) {
                let key = apiList[api].keys[colIndex];
                let _data = key ? datas[apiIndex][key] : datas[apiIndex];
                this.$set(col, "reportData", _data);
              }
            });
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000);
        });
    },

    renderReport() {
      return new Promise((resolve, reject) => {
        let { reportUnionKey } = this.$route.query;
        this.queryData = this.resolveQueryData();

        let promises = [
          getcomponentinfo(),
          getreportcomponentinfo({ reportUnionKey })
        ];

        this.isEditPath = resolveStorage("drag-report-data:isEdit");

        Promise.all(promises).then(ress => {
          let [componentDatas = [], layoutData = {}] = ress;
          this.componentDatas = componentDatas;
          if (this.isEditPath) layoutData = resolveStorage("drag-report-data");
          this.layoutData = this.resolveReportData(layoutData);
          this.dealRequests();
          resolve(1);
        });
      });
    },
    addListener() {
      this.$$listeners = { scroll: null };
      this.$$listeners.scroll = debounce(this.handleListenerScroll, 10);
      window.addEventListener("scroll", this.$$listeners.scroll);
    },
    handleListenerScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      this.editBtnTop = scrollTop + 30;
    },
    handleSwitchColor(type) {
      let color = colors[type];
      this.pageCharts.forEach(item => item.setOption({ color }));
    },
    getChartComponents() {
      let { pageCharts } = this;
      function getCharts(root) {
        root.$children.forEach(item => {
          if (item.$options.name.indexOf("chart") !== -1) pageCharts.push(item);
          if (item.$children.length) getCharts(item);
        });
      }
      getCharts(this);
    }
  },
  mounted() {
    var quill = new Quill("#editor", {
      theme: "snow"
    });
    let that = this;
    this.addListener();
    this.renderReport().then(() => {
      this.getChartComponents();
      this.loadingExport = false;
      // window.onbeforeunload = function() {
      //   if (that.isEditPath) return "编辑的页面布局尚未保存，确定离开？";
      // };
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$$listeners.scroll);
    window.onbeforeunload = null;
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>