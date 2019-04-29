<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-15 13:34:50
 * @LastEditTime: 2019-04-29 16:18:07
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
      >
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
        type="primary"
        title="switch-default-color"
        @click="handleSwitchColor('defaultColor')"
        icon="el-icon-refresh"
        circle
      />
      <el-button
        type="success"
        title="switch-dark-color"
        @click="handleSwitchColor('darkColor')"
        icon="el-icon-refresh"
        circle
      />
      <el-button
        type="warning"
        title="switch-shine-color"
        @click="handleSwitchColor('shineColor')"
        icon="el-icon-refresh"
        circle
      />
      <el-button
        type="danger"
        title="switch-infographic-color"
        @click="handleSwitchColor('infographicColor')"
        icon="el-icon-refresh"
        circle
      />
    </div>
  </div>
</template>

<script>
import { post, get } from "@/api/service";
import { debounce } from "lodash";

import exportPDF from "@/utils/exportPDF";
import { deepClone, flatLayoutData } from "@/utils";

import colStyle from "@/mixins/methods/col-style";

import defaultContainer from "@/components/custom-report/default-container";
import defaultSelectQuery from "@/components/custom-report/default-select-query";
import customReports from "./index";

import {
  defaultColor,
  darkColor,
  shineColor,
  infographicColor
} from "@/components/custom-report/js/chart-variable";

import { getcomponentinfo, getreportcomponentinfo } from "@/api";

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
      alignType: [
        { title: "居中对齐", label: "center", value: "center" },
        { title: "左对齐", label: "left", value: "flex-start" },
        { title: "右对齐", label: "right", value: "flex-end" },
        { title: "两侧留白", label: "around", value: "space-around" },
        { title: "两侧对齐", label: "between", value: "space-between" }
      ],
      isEditPath: false,
      editBtnTop: 0,
      isLoading: true,
      showQueryContainer: false,
      loadingExport: true,
      componentDatas: [],
      layoutData: {
        title: "",
        children: []
      },
      queryData: {},
      apiList: {},
      flatData: [],
      requestList: [],
      pageCharts: []
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
    handleSaveLayout() {
      let previewData = JSON.parse(
        window.localStorage.getItem("drag-report-data")
      );
      let { reportUnionKey } = this.$route.query;
      previewData.structureUnitList = previewData.children;
      let data = { ...previewData, reportUnionKey };
      updatestructureinfo(data).then(res => {
        if (res.status === 200) {
          this.$msg("0_保存成功");
          this.isEditPath = false;
        }
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
      let { reportUnionKey } = this.$route.query;
      this.queryData = this.resolveQueryData();

      let promises = [
        getcomponentinfo(),
        getreportcomponentinfo({ reportUnionKey })
      ];

      this.isEditPath =
        window.localStorage.getItem("drag-report-data:isEdit") === "true";

      Promise.all(promises).then(ress => {
        this.componentDatas = ress[0].data || [];
        let layoutData = ress[1].data || {};
        if (this.isEditPath) {
          layoutData = JSON.parse(
            window.localStorage.getItem("drag-report-data")
          );
        }
        this.layoutData = this.resolveReportData(layoutData);
        this.dealRequests();
      });
    },
    addListener() {
      this.$$listeners = { scroll: null };
      this.$$listeners.scroll = debounce(this.handleListenerScroll, 10);
      document
        .querySelector("#app")
        .addEventListener("scroll", this.$$listeners.scroll);
    },
    handleListenerScroll(e) {
      this.editBtnTop = document.querySelector("#app").scrollTop;
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
    let that = this;
    this.renderReport();
    this.addListener();
    setTimeout(() => {
      this.getChartComponents();
      this.loadingExport = false;
    }, 1000);
    window.onbeforeunload = function() {
      if (that.isEditPath) return "编辑的页面布局尚未保存，确定离开？";
    };
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