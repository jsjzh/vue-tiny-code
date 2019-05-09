<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-04-25 18:09:30
 * @LastEditTime: 2019-04-29 16:41:17
 * @Description: 自定义报表列表页，该页面数据都是由 mockjs 接管，若需要接入自己的项目，则需要更改接口等相关配置。另外， mockjs 的数据只对当前打开的 tab 页面生效，若有一些操作是打开新的 tab 页面则只能获取到初始的 mock 数据。
 * @TODO: 拟想一个方法，可以靠传入参数来实现整个页面的功能，比如接口的选择，然后发送数据前的回调，不过好像不太现实，有空可以试试。
 -->

<template>
  <div v-loading="isLoading" class="custom-report-list-main-container">
    <div class="report-list-container">
      <div class="controller-bar">
        <i class="el-icon-plus default-icon" title="add" @click="handleAddReport"/>
        <div>
          <el-input
            style="width: 400px"
            v-model="newReportName"
            placeholder="please enter the new report name"
          />
        </div>
      </div>
      <div class="report-list">
        <div
          class="report-item"
          v-for="(report, reportIndex) in reportDatas"
          :key="reportIndex"
          @mouseenter="report.showShade = true"
          @mouseleave="report.showShade = false"
        >
          <div class="report-type">type: {{report.type}}</div>
          <div class="report-info">{{report.title}}</div>
          <transition name="slide-fade">
            <div v-show="report.showShade" class="shade">
              <div class="shade-edit-view">
                <i
                  @click="handleClickEdit(report.reportUnionKey)"
                  title="edit"
                  class="el-icon-edit-outline default-icon"
                />
                <i
                  @click="handleClickPreview(report.reportUnionKey)"
                  title="preview"
                  class="el-icon-view default-icon"
                />
              </div>
              <div class="shade-del">
                <i
                  @click="handleClickDel(report.reportUnionKey)"
                  title="delete"
                  class="el-icon-delete default-icon"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deepClone, openNewTab, setStorage } from "@/utils";

import {
  getreportstructurelist,
  operatestructureinfo,
  delstructureinfo
} from "@/api";

function createReport(params) {
  return {
    title: "the new report",
    children: [
      {
        align: "flex-start",
        height: 250,
        index: 1,
        children: [{ col: 24, componentKey: null, initCol: 24, title: null }]
      }
    ],
    ...params
  };
}

export default {
  name: "customReportList",
  data() {
    return {
      isLoading: false,
      reportDatas: [],
      newReportName: ""
    };
  },
  methods: {
    handleAddReport() {
      if (!this.newReportName) {
        this.$msg("1_please enter the new report name");
        return;
      }
      this.isLoading = true;
      operatestructureinfo(createReport({ title: this.newReportName })).then(
        res => {
          let { reportUnionKey } = res;
          this.$msg("0_add new report success").then(() => {
            setTimeout(() => {
              this.handleClickEdit(reportUnionKey);
            }, 1000);
          });
          this.getReportList();
        }
      );
    },

    handleClickDel(reportUnionKey) {
      this.isLoading = true;
      delstructureinfo({ reportUnionKey }).then(res => {
        this.$msg("0_delete success").then(() => {
          this.getReportList();
        });
      });
    },

    handleClickEdit(reportUnionKey) {
      let { href } = this.$router.resolve({
        path: "/dragReport",
        query: { reportUnionKey }
      });
      openNewTab(href);
    },

    handleClickPreview(reportUnionKey) {
      setStorage("drag-report-data:isEdit", false);
      let { href } = this.$router.resolve({
        path: "/previewReport",
        query: { reportUnionKey }
      });
      openNewTab(href);
    },

    getReportList() {
      getreportstructurelist()
        .then(res => {
          this.reportDatas = res.map(item => ({
            ...item,
            showShade: false
          }));
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },

  mounted() {
    this.getReportList();
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
body,
html {
  height: 100%;
}
</style>

