<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-15 13:34:50
 * @LastEditTime: 2019-03-11 16:40:09
 * @Description: preview 页面
 -->
<template>
  <div class="preview-report" v-loading="isLoading">
    <div class="preview-report-title">{{layoutData.title.toUpperCase()}}</div>

    <div class="preview-container">
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
      v-if="!isLoading"
      class="el-icon-document report-ps-icon-btn"
      title="export-pdf"
      @click="handleExport"
    />
  </div>
</template>

<script>
import { post, get } from "@/api/service";

import exportPDF from "@/utils/exportPDF";
import { flatLayoutData } from "@/utils";

import colStyle from "@/mixins/methods/col-style";

import defaultContainer from "@/components/custom-report/default-container";
import customReports from "./index";

import { getComponents, getReportData } from "@/api";

const _methods = { post, get };

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
      isLoading: true,
      componentDatas: [],
      layoutData: {
        title: "",
        children: []
      },
      queryData: {}
    };
  },
  components: { defaultContainer, ...customReports },
  methods: {
    handleExport() {
      exportPDF("#app", this.layoutData.title);
    },
    resolveQueryData() {
      return { serarchKey: "test" };
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
    }
  },
  mounted() {
    let { reportKey } = this.$route.query;

    let promises = [getComponents(), getReportData(reportKey)];

    Promise.all(promises).then(ress => {
      this.componentDatas = ress[0];
      this.layoutData = this.resolveReportData(ress[1]);
      this.queryData = this.resolveQueryData();

      let flatData = flatLayoutData(this.layoutData);

      let apiList = {};
      for (let index = 0; index < flatData.length; index++) {
        const item = flatData[index];
        const api = item.api;
        const method = item.method;
        const key = item.dataKey;
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
        apiList[api].keys[index] = key;
        apiList[api].method = method;
      }

      let requestList = Object.keys(apiList).map(api => {
        const item = apiList[api];
        let method = item.method ? _methods[item.method] : noop;
        return method(api);
      });

      Promise.all(requestList.map(request => request(this.queryData)))
        .then(datas => {
          console.log(datas);
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
        .finally(() => (this.isLoading = false));
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>