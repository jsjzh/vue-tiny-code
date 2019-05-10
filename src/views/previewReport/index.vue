<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-15 13:34:50
 * @LastEditTime: 2019-05-10 16:39:38
 * @Description: preview 页面，该页面既可以用于导出前的预览也可以用于单独的页面展示。每行的底部可以增加一条评语信息用于评测当行内容。值得注意的是，该条评语信息并不会记录到数据库，因为当查询条件更改了之后评语信息也会不同。
 -->
<template>
  <div class="preview-report" v-loading="isLoading">
    <div class="preview-container">
      <div class="preview-header">
        <div class="preview-report-title">{{layoutData.title}}</div>
        <div class="query-infos">
          <div class="query-date-box">
            <span>startTime: xxxx</span>
            <span>endTime: xxxx</span>
          </div>
          <div class="query-target-box">
            <span>targetName: xxxx</span>
            <span>targetId: xxxx</span>
          </div>
        </div>
      </div>
      <div
        class="layout-row"
        v-for="(row, rowIndex) in layoutData.children"
        :key="rowIndex"
        @mouseenter="row.showEditBtn = true"
        @mouseleave="row.showEditBtn = false"
      >
        <transition name="slide-fade" v-if="row.showEditBtn">
          <div class="btn-box add-message-btn-box">
            <el-button
              type="primary"
              icon="el-icon-plus"
              title="add message"
              circle
              @click="handleAddMessage(row)"
            />
          </div>
        </transition>

        <transition name="slide-fade" v-if="row.editMessage">
          <div class="btn-box add-message-btn-box">
            <el-button
              type="success"
              icon="el-icon-check"
              title="save"
              circle
              @click="row.editMessage = false"
            />
          </div>
        </transition>

        <div class="layout-row-title" v-if="row.title">
          <div class="title-line"></div>
          <div>{{row.title}}</div>
          <div class="title-line"></div>
        </div>

        <div class="layout-row-content" :style="{justifyContent: row.align}">
          <div
            class="layout-col"
            :style="previewColStyle({width: col.initCol,height: row.initHeight}, 100, 1, 24)"
            v-for="(col, colIndex) in row.children"
            :key="colIndex"
          >
            <default-container v-if="col.componentKey">
              <component
                :title="col.componentName"
                :is="`custom-report-component-${col.componentName}`"
                :reportData="col.reportData"
              />
            </default-container>
            <default-container v-else>空组件</default-container>
          </div>
        </div>

        <div style="width: 100%">
          <el-input
            :ref="`row-message-${row.index}`"
            v-if="row.editMessage"
            v-model="row.message"
            placeholder="please enter the message"
            type="textarea"
            resize="none"
            :rows="6"
            @blur="row.editMessage = false"
            style="padding: 1rem 3rem"
          />
          <div
            style="margin: 1rem 3rem"
            class="layout-row-message"
            v-if="!row.editMessage && row.message"
          >{{row.message}}</div>
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
      <report-tool-select-query
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

    <!-- <div class="preview-paging-line"></div> -->
  </div>
</template>

<script>
import { post, get } from "@/api/service";
import { debounce } from "lodash";

import exportPDF from "@/utils/exportPDF";
import { deepClone, flatLayout, resolveStorage, noop } from "@/utils";
import { PreviewDataToLayoutData } from "@/utils/dragReport";

import colStyle from "@/mixins/methods/col-style";

import defaultContainer from "@/components/custom-report/default-container";
import reportToolSelectQuery from "@/components/custom-report/report-tool-select-query";
import customReports from "./index";

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

const colors = {
  defaultColor,
  darkColor,
  shineColor,
  infographicColor
};

const _methods = { post, get };

export default {
  name: "previewReport",
  mixins: [colStyle],
  data() {
    return {
      isLoading: true,
      isEditPath: false,
      showQueryContainer: false,
      loadingExport: true,
      editBtnTop: 30,
      layoutData: {
        title: "",
        children: []
      },
      queryData: {},
      colorBtns: [
        { color: "default", type: "primary" },
        { color: "dark", type: "success" },
        { color: "shine", type: "warning" },
        { color: "infographic", type: "danger" }
      ]
    };
  },
  components: { reportToolSelectQuery, defaultContainer, ...customReports },
  methods: {
    handleAddMessage(row) {
      row.editMessage = true;
      this.$nextTick(() => {
        let el = this.$refs[`row-message-${row.index}`][0];
        el.focus();
      });
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
    // 统一处理查询条件
    resolveQueryData() {
      let { startTime, endTime, type, targetId, text } = this.$route.query;
      return { startTime, endTime, type, targetId, text };
    },
    dealRequests() {
      this.$$noObserverData.flatLayoutData = flatLayout(this.layoutData);
      let { apiList, flatLayoutData } = this.$$noObserverData;
      for (let index = 0; index < flatLayoutData.length; index++) {
        const item = flatLayoutData[index];
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

      this.$$noObserverData.requestList = Object.keys(apiList).map(api => {
        const item = apiList[api];
        let method = item.method ? _methods[item.method] : noop;
        return method(api);
      });

      this.getRequestsData();
    },
    getRequestsData() {
      let { apiList, requestList, flatLayoutData } = this.$$noObserverData;
      this.isLoading = true;
      Promise.all(requestList.map(request => request(this.queryData)))
        .then(datas => {
          Object.keys(apiList).forEach((api, apiIndex) => {
            let sameIndexs = apiList[api].sameIndexs;
            flatLayoutData.forEach((col, colIndex) => {
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
    // 在这里查询出布局，如果 isEditPath 为 true，则代表是从编辑页面跳转过来的
    // 这个时候布局还未保存到数据库（因为保存到数据库之前要先预览布局）
    // 遂直接从 localStroage 获取，若 isEditPath 为 false 布局从数据库获取
    renderReport() {
      return new Promise((resolve, reject) => {
        let { reportUnionKey } = this.$route.query;
        this.queryData = this.resolveQueryData();
        this.isEditPath = resolveStorage("drag-report-data:isEdit");
        let promises = [getcomponentinfo()];

        if (!this.isEditPath)
          promises.push(getreportcomponentinfo({ reportUnionKey }));

        Promise.all(promises).then(ress => {
          let [componentDatas = [], layoutData = {}] = ress;
          if (this.isEditPath) layoutData = resolveStorage("drag-report-data");
          this.layoutData = PreviewDataToLayoutData(
            layoutData,
            componentDatas,
            { showEditBtn: false, editMessage: false, message: "" }
          );
          this.dealRequests();
          resolve();
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
      const charts = [];
      function getCharts(root) {
        root.$children.forEach(item => {
          if (item.$options.name.indexOf("base-chart") !== -1)
            charts.push(item);
          if (item.$children.length) getCharts(item);
        });
      }
      getCharts(this);
      let color = colors[type];
      charts.forEach(item => item.setOption({ color }));
    },
    // 该处的数据前缀都为 _ 或 $，根由 vue 的文档，以 _ 或 $ 开头的属性不会被代理
    setNoObserverData() {
      this.$$noObserverData = {
        apiList: {},
        flatLayoutData: [],
        requestList: []
      };
    }
  },
  mounted() {
    let that = this;
    this.addListener();
    this.setNoObserverData();
    this.renderReport().then(() => {
      // 为了防止在页面加载好就显示导出按钮
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