<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-15 13:34:50
 * @LastEditTime: 2019-03-06 18:47:22
 * @Description: preview 页面
 -->
<template>
  <div class="preview-container" v-loading="isLoading">
    <div
      class="layout-row"
      :style="rowStyle(row)"
      v-for="(row, rowIndex) in layoutData.children"
      :key="rowIndex"
    >
      <div
        class="layout-col"
        :style="colStyle(col)"
        v-for="(col, colIndex) in row.children"
        :key="colIndex"
      >
        <component
          v-if="col.componentName"
          :is="`custom-report-${col.componentName}`"
          :title="col.title"
          :reportData="col.reportData"
        />
        <default-container v-else>空组件</default-container>
      </div>
    </div>
  </div>
</template>

<script>
import { post, get } from "@/api/service";
import exportPDF from "@/utils/exportPDF";
import { flatLayoutData } from "@/utils";
import _components from "./js/components";
import { getComponents, getReportData } from "@/api";

const _methods = { post, get };
const noop = function() {
  return function() {};
};

export default {
  name: "previewReport",
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
      layoutData: [],
      queryData: {}
    };
  },
  components: _components,
  methods: {
    colStyle(col) {
      return { width: `${(col.layoutCol / 24) * 100}%` };
    },
    rowStyle(row) {
      let align = this.alignType.find(aligns => aligns.value === row.align);
      return {
        justifyContent: (align && align.value) || "flex-left",
        height: `${row.height}px`
      };
    },
    resolveQueryData() {
      return {
        dept_id: "1ab0d68d-de2a-4774-95e4-e0d5d1cbbf00",
        type: 2
      };
    },
    resolveLayoutData() {}
  },
  mounted() {
    let { reportKey } = this.$route.query;
    getReportData(reportKey).then(res => {
      this.layoutData = res;
      console.log(this.layoutData);
    });
    this.queryData = this.resolveQueryData();

    let flatData = flatLayoutData(this.layoutData);

    let apiList = flatData.map(col => ({
      api: col.api,
      method: col.method,
      key: col.dataKey
    }));

    let list = flatData.reduce((pre, curr, index) => {
      let api = curr.api;
      let key = curr.dataKey;
      // 保存使用相同的接口的 index
      if (!(api in pre)) {
        pre[api] = {};
        pre[api].sameIndexs = [index];
      } else {
        pre[api].sameIndexs.push(index);
      }
      // 保存方法
      pre[api].method = curr.method ? curr.method : "get";
      // 保存 dataKey
      if (!pre[api].keys) {
        pre[api].keys = [];
      }
      pre[api].keys[index] = key;
      return pre;
    }, {});

    if ("undefined" in list) {
      delete list.undefined;
    }

    let requestList = Object.keys(list).map(api => {
      const item = list[api];
      let method = item.method ? _methods[item.method] : noop;
      return method(api);
    });

    Promise.all(requestList.map(request => request(this.queryData)))
      .then(datas => {
        Object.keys(list).forEach((api, apiIndex) => {
          let sameIndexs = list[api].sameIndexs;
          flatData.forEach((col, colIndex) => {
            if (sameIndexs.findIndex(index => index === colIndex) !== -1) {
              let key = list[api].keys[colIndex];
              let _data = key ? datas[apiIndex][key] : datas[apiIndex];
              this.$set(col, "reportData", _data);
            }
          });
        });
      })
      .finally(() => {
        this.isLoading = false;
        // setTimeout(() => {
        //   exportPDF("#app");
        // }, 2000);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "./css/variable.scss";
@import "./css/layout.scss";
</style>