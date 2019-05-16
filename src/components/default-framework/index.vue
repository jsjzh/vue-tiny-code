<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-13 14:50:02
 * @LastEditTime: 2019-05-16 17:10:03
 * @Description: 自定义表格的组件选择组件
 -->
<template>
  <div class="w100 h100 default-framework-container">
    <div class="w100 search-container">
      <el-form ref="form" size="mini" :model="queryData" label-width="80px">
        <el-form-item label="组件规格:">
          <el-col :span="11">
            <el-select
              v-model="queryData.height"
              @change="handleChangeHeight"
              size="mini"
              clearable
              placeholder="组件高度"
            >
              <el-option
                v-for="(item, itemIndex) in options.heightOptions"
                :key="itemIndex"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col class="text-c" :span="2">+</el-col>
          <el-col :span="11">
            <el-select
              v-model="queryData.col"
              size="mini"
              no-data-text="请先选择左侧的组件高度"
              clearable
              placeholder="组件宽度"
            >
              <el-option
                v-for="(item, itemIndex) in options.colOptions"
                :key="itemIndex"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-form-item>

        <el-form-item label="组件名称:">
          <el-input
            clearable
            v-model="queryData.label"
            @keyup.enter.native="handleClickSearchComponent"
          />
        </el-form-item>
        <!-- <el-form-item label="组件类型:">
          <el-select v-model="queryData.type" size="mini" clearable placeholder="组件类型">
            <el-option v-for="item in options.typeOptions" :key="item" :value="item"/>
          </el-select>
        </el-form-item>-->
        <el-form-item class="text-r">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="handleClickSearchComponent"
          >搜索组件</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="components-container">
      <div
        class="components-row"
        v-for="(component, componentIndex) in componentDatas"
        :key="componentIndex"
      >
        <div class="components-infos-box">
          <div>{{component.label}}</div>
          <div>height: {{component.height}} col: {{component.col}}</div>
        </div>
        <div class="preview-box">
          <div
            class="preview"
            draggable="true"
            :style="previewColStyle({ width: component.col, height: component.height },{backgroundImage: component.previewImage ? `url(${component.previewImage})` : null})"
            @dragstart="handleDragCol($event, component)"
            @dragend="hanDragColEnd($event, component)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colStyle from "@/mixins/methods/col-style";
import {
  mapPropAndSortAndDup,
  filterPropEquals,
  isIndexOf
} from "@/utils/ramdaUtil";
import * as R from "ramda";

import { getcomponentinfo } from "@/api";

export default {
  name: "default-framework",
  mixins: [colStyle],
  data() {
    return {
      initComponentDatas: [],
      componentDatas: [],
      queryData: {
        label: null,
        height: null,
        col: null,
        type: null
      },
      options: {
        heightOptions: [],
        colOptions: [],
        typeOptions: []
      }
    };
  },
  methods: {
    handleDragCol(event, col) {
      col.title = col.label;
      this.$emit("drag-col-start", event, col);
    },
    hanDragColEnd(event, col) {
      this.$emit("drag-col-end", event, col);
    },
    handleChangeHeight(height) {
      let { options, queryData } = this;
      queryData.col = null;
      options.colOptions = R.compose(
        mapPropAndSortAndDup("col"),
        filterPropEquals("height", height)
      )(this.initComponentDatas);
    },
    handleClickSearchComponent() {
      let { queryData } = this;
      this.componentDatas = Object.keys(queryData).reduce(
        (pre, curr) =>
          queryData[curr]
            ? pre.filter(component =>
                isIndexOf(curr, ["label"])
                  ? isIndexOf(queryData[curr], component[curr])
                  : R.equals(component[curr], queryData[curr])
              )
            : pre,
        this.initComponentDatas
      );
    }
  },
  mounted() {
    getcomponentinfo().then(res => {
      let { options } = this;
      this.componentDatas = res;
      this.initComponentDatas = res;
      options.heightOptions = mapPropAndSortAndDup("height", res);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";

.default-framework-container {
  @include default-flex;
  flex-wrap: wrap;
  flex-flow: column;
  height: 100%;
  padding: 1rem;
  padding-top: 2rem;
  .components-container {
    @include default-flex;
    width: 100%;
    flex: 1;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    flex-flow: column;
    padding: 0.5rem;
    overflow: auto;
    & .components-row {
      @include default-flex;
      @include default-col-radius;
      @include boxShadow;
      align-items: flex-start;
      flex-flow: wrap;
      padding: 0 1rem;
      width: 100%;
      min-height: 200px;
      margin: 1rem 0;
      background-color: #f5f5f5;
      & .components-infos-box {
        width: 100%;
      }
      & .preview-box {
        @include default-flex;
        width: 100%;
        & .preview {
          @include cur-all;
          @include default-background-img;
        }
      }
    }
  }
}
</style>

