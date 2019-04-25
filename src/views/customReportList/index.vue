<template>
  <div v-loading="isLoading" class="main-container">
    <div class="report-list-container">
      <div class="query-infos" v-html="PAGE_queryData"></div>
      <div class="controller-bar">
        <i class="el-icon-plus" title="add" @click="handleAddReport"/>
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
          <div class="report-info">{{report.title.toUpperCase()}}</div>
          <transition name="slide-fade">
            <div v-show="report.showShade" class="shade">
              <div class="shade-edit-view">
                <i
                  @click="handleClickEdit(report.reportUnionKey)"
                  title="edit"
                  class="el-icon-edit-outline"
                />
                <i
                  @click="handleClickPriview(report.reportUnionKey)"
                  title="priview"
                  class="el-icon-view"
                />
              </div>
              <div class="shade-del">
                <i
                  @click="handleClickDel(report.reportUnionKey)"
                  title="delete"
                  class="el-icon-delete"
                />
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <i
      class="el-icon-setting report-list-query-data-icon-btn"
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
  </div>
</template>

<script>
import { deepClone } from "@/utils";
import clickoutside from "@/directive/clickoutside";

import {
  // getreportstructurelist,
  // operatestructureinfo,
  // delstructureinfo
} from "@/api";

import defaultSelectQuery from "@/components/custom-report/default-select-query";

function getZtreeSetting(clickFn, options = {}) {
  return {
    check: { enable: false, chkStyle: "radio" },
    data: { key: { children: "children", name: "name" } },
    view: { showIcon: true },
    callback: { onClick: clickFn },
    ...options
  };
}
export default {
  name: "customReportList",
  directives: { clickoutside },
  components: { defaultSelectQuery },

  data() {
    return {
      isLoading: false,
      reportDatas: [],
      newReportName: "",
      queryData: {
        startTime: undefined,
        endTime: undefined,
        type: undefined,
        targetId: undefined,
        text: undefined
      },
      showQueryContainer: false
    };
  },
  computed: {
    PAGE_queryData() {
      let str = "";
      let queryData = deepClone(this.queryData);
      Object.keys(queryData).forEach(key => {
        if (key === "startTime" || key === "endTime") {
          queryData[key] = moment(queryData[key]).format("YYYY-MM-DD HH:mm:ss");
        }

        let value =
          queryData[key] !== undefined
            ? queryData[key]
            : `<span style="color: #f44336">${queryData[key]}</span>`;
        str += ` ${key} : ${value} `;
      });
      return str;
    }
  },
  methods: {
    handleQueryData(queryData) {
      this.showQueryContainer = false;
      queryData = deepClone(queryData);
      Object.keys(queryData).forEach(key => {
        this.$set(this.queryData, key, queryData[key]);
      });
    },

    handleAddReport() {
      if (!this.newReportName) {
        this.$msg("1_请先输入新报表名称");
        return;
      }
      operatestructureinfo({
        title: this.newReportName,
        reportKey: "new-report",
        structureUnitList: [
          {
            align: "flex-start",
            height: 250,
            index: 1,
            children: [
              { col: 24, componentKey: null, initCol: 24, title: null }
            ]
          }
        ]
      }).then(res => {
        if (res.status === 200) {
          this.$msg("0_新增成功，将打开编辑页").then(() => {
            setTimeout(() => {
              this.handleClickEdit(res.data);
            }, 1000);
          });
          getreportstructurelist().then(res => {
            res.data ? res.data : [];
            this.reportDatas = res.data.map(item => ({
              ...item,
              showShade: false
            }));
          });
        }
      });
    },

    handleClickDel(reportUnionKey) {
      delstructureinfo({ reportUnionKey, indexList: [] }).then(res => {
        if (res.status === 200) {
          this.$msg("0_删除成功").then(() => {
            getreportstructurelist().then(res => {
              res.data ? res.data : [];
              this.reportDatas = res.data.map(item => ({
                ...item,
                showShade: false
              }));
            });
          });
        }
      });
    },

    handleClickEdit(reportUnionKey) {
      let routeUrl = this.$router.resolve({
        path: "/ai/dragReport",
        query: { reportUnionKey, ...this.queryData }
      });
      window.open(routeUrl.href, "_blank");
    },

    handleClickPriview(reportUnionKey) {
      window.localStorage.setItem("drag-report-data:isEdit", "false");
      let routeUrl = this.$router.resolve({
        path: "/ai/previewReport",
        query: { ...this.queryData, reportUnionKey }
      });
      window.open(routeUrl.href, "_blank");
    },

    initPage() {
      document.body.removeAttribute("class");
    }
  },

  mounted() {
    this.initPage();

    // let promises = [getreportstructurelist()];
    // Promise.all(promises)
    //   .then(ress => {
    //     ress[0].data ? ress[0].data : [];
    //     this.reportDatas = ress[0].data.map(item => ({
    //       ...item,
    //       showShade: false
    //     }));
    //   })
    //   .finally(() => {
    //     this.isLoading = false;
    //   });
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>

