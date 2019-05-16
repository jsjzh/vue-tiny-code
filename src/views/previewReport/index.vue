<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-15 13:34:50
 * @LastEditTime: 2019-05-16 17:09:56
 * @Description: preview 页面，该页面既可以用于导出前的预览也可以用于单独的页面展示。每行的底部可以增加一条评语信息用于评测当行内容。值得注意的是，该条评语信息并不会记录到数据库，因为当查询条件更改了之后评语信息也会不同。
 -->
<template>
  <div class="ps-r preview-report" v-loading="isLoading">
    <div class="mr-center preview-container" v-if="showPreviewContainer">
      <div class="preview-header">
        <div class="text-c preview-report-title">{{layoutData.title}}</div>
        <div class="flex flex-center query-infos">
          <div class="flex flex-center query-box">
            <span>startTime: xxxx</span>
            <span>endTime: xxxx</span>
          </div>
          <div class="flex flex-center query-box">
            <span>targetName: xxxx</span>
            <span>targetId: xxxx</span>
          </div>
        </div>
      </div>
      <div
        class="ps-r flex flex-center border-r5 flex-wrap layout-row"
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

        <div class="flex flex-center w100 text-c layout-row-title" v-if="row.title">
          <div class="title-line"/>
          <div>{{row.title}}</div>
          <div class="title-line"/>
        </div>

        <div class="flex flex-center w100" :style="rowStyle(row)">
          <div
            class="ps-r flex flex-center"
            :style="previewColStyle({width: col.initCol,height: row.initHeight, baseHeight: 1})"
            v-for="(col, colIndex) in row.children"
            :key="colIndex"
          >
            <default-container v-if="col.componentKey">
              <component
                :title="col.componentName"
                :is="`custom-report-component-${col.componentName}`"
                :reportData="col.reportData"
                :mixinData="col.mixinData"
              />
            </default-container>
            <default-container v-else>
              <default-container>空组件</default-container>
            </default-container>
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
      class="cur-p ps-a t0 ps-icon el-icon-download export-icon"
      :style="floatBox"
      title="export-pdf"
      @click="handleExport"
    />

    <i
      v-if="!loadingExport && isEditPath"
      class="cur-p ps-a t0 ps-icon el-icon-document save-icon"
      :style="floatBox"
      title="save layout"
      @click="handleSaveLayout"
    />

    <i
      v-if="!loadingExport"
      class="cur-p ps-a t0 ps-icon el-icon-setting query-icon"
      :style="floatBox"
      title="edit-query"
      @click="showQueryContainer = true"
    />

    <transition name="slide-fade">
      <report-tool-select-query v-show="showQueryContainer" @select-query-done="handleQueryData"/>
    </transition>

    <div v-if="!loadingExport" :style="floatBox" class="ps-a t0 color-bar">
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

    <!-- <div class="preview-paging-line"/> -->
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
  components: { reportToolSelectQuery, defaultContainer, ...customReports },
  data() {
    return {
      isLoading: true,
      isEditPath: false,
      showPreviewContainer: false,
      showQueryContainer: true,
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
  computed: {
    floatBox() {
      return { top: `${this.editBtnTop}px` };
    }
  },
  methods: {
    rowStyle(row) {
      return { justifyContent: row.align, height: `${row.initHeight}px` };
    },
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
      let data = { ...previewData, reportUnionKey };
      updatestructureinfo(data).then(res => {
        if (res.code === 200) {
          this.$msg("0_保存成功");
          this.isEditPath = false;
        } else {
          this.$msg("1_保存错误");
        }
      });
    },
    handleQueryData(queryData) {
      this.showQueryContainer = false;
      this.queryData = {
        target_id: queryData.target_id,
        end_time: queryData.end_time,
        start_time: queryData.start_time
      };
      if (!this.$$noObserverData.isFirstLoad) {
        this.getRequestsData();
      } else {
        this.renderReport().then(() => {
          // 为了防止在页面加载好就显示导出按钮
          this.loadingExport = false;
          window.onbeforeunload = function() {
            if (that.isEditPath) return "编辑的页面布局尚未保存，确定离开？";
          };
        });
      }
    },
    handleExport() {
      this.loadingExport = true;
      exportPDF(".preview-report", this.layoutData.title);
      setTimeout(() => {
        this.loadingExport = false;
      }, 3000);
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
                let _data = key
                  .split(".")
                  .reduce(
                    (pre, curr) => (pre[curr] ? pre[curr] : pre),
                    datas[apiIndex]
                  );
                this.$set(col, "reportData", _data);
                // 混入部分简单的可以自定义的参数
                col.mixinData = col.mixinData || {};
                this.$set(col, "mixinData", col.mixinData);
              }
            });
          });
        })
        .finally(() => {
          setTimeout(() => {
            this.isLoading = false;
            this.$$noObserverData.isFirstLoad = false;
            this.showPreviewContainer = true;
          }, 1000);
        });
    },
    renderReport() {
      return new Promise((resolve, reject) => {
        let { reportUnionKey } = this.$route.query;
        this.isEditPath = resolveStorage("drag-report-data:isEdit");
        let promises = [getcomponentinfo()];
        // 在这里查询出布局，如果 isEditPath 为 true，则代表是从编辑页面跳转过来的
        // 这个时候布局还未保存到数据库（因为保存到数据库之前要先预览布局）
        // 遂直接从 localStroage 获取，若 isEditPath 为 false 布局从数据库获取
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
      charts.forEach(item => item.setOption({ color: colors[type] }));
    },
    // 该处的数据前缀都为 _ 或 $，根由 vue 的文档，以 _ 或 $ 开头的属性不会被代理
    setNoObserverData() {
      this.$$noObserverData = {
        isFirstLoad: true,
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
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.$$listeners.scroll);
    Object.keys(this.$$noObserverData).forEach(key => {
      this.$$noObserverData[key] = null;
    });
    this.$$noObserverData = null;
    window.onbeforeunload = null;
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>