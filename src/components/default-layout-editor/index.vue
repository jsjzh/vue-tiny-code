<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-22 09:31:45
 * @LastEditTime: 2019-05-07 14:59:02
 * @Description: 左侧添加布局的框
 -->
<template>
  <div class="layout-editor-container">
    <div class="editor-box">
      <div class="editor-infos-box">
        <div class="infos">
          <div class="limit">limit-total: 24</div>
          <div class="real">real-total: {{PAGE_realTotal}}</div>
        </div>
        <div class="controller-btn">
          <el-radio-group v-model="inputsHeight" @change="handleChangeColHeight" size="mini">
            <el-radio-button :label="100"/>
            <el-radio-button :label="150"/>
            <el-radio-button :label="250"/>
            <el-radio-button :label="400"/>
          </el-radio-group>
          <i class="el-icon-more" @click="handleAverage" title="average-layout"/>
          <i class="el-icon-remove" @click="handleRemove" title="remove-layout"/>
          <i class="el-icon-circle-plus" @click="handleAdd" title="add-layout"/>
        </div>
      </div>
      <div class="editor-infos-box suggest">组件高度设置需参考组件基本信息，不正确的高度可能导致显示错误</div>
      <div class="editor-inputs-box">
        <div class="input-item-box" v-for="(ipt, iptIndex) in inputs" :key="iptIndex">
          <el-input
            size="mini"
            :maxlength="3"
            :minlength="1"
            :max="24"
            :min="1"
            v-model="ipt.value"
          />
        </div>
      </div>
    </div>
    <div
      class="layout-preview-box"
      draggable="true"
      @dragstart="handleDragRow($event, inputs)"
      @dragend="hanDragRowEnd($event, inputs)"
    >
      <div
        class="preview-item"
        v-for="(ipt, iptIndex) in inputs"
        :key="iptIndex"
        :style="previewColStyle({ width: ipt.value, height: ipt.height })"
      >{{ipt.value}}</div>
    </div>
    <div class="suggest-layout-box">
      <div class="suggest-layout-title">suggest-layouts</div>
      <div
        class="suggest-layout-row"
        v-for="(suggestLayout, suggestLayoutIndex) in suggestLayouts"
        :key="suggestLayoutIndex"
        draggable="true"
        @dragstart="handleDragRow($event, suggestLayout.cols)"
        @dragend="hanDragRowEnd($event, suggestLayout.cols)"
      >
        <div
          class="suggest-layout-item"
          :style="previewColStyle({ width: col.value, height: col.height })"
          v-for="(col, colIndex) in suggestLayout.cols"
          :key="colIndex"
        >{{col.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import colStyle from "@/mixins/methods/col-style";

export default {
  name: "default-layout-editor",
  mixins: [colStyle],
  data() {
    return {
      inputsHeight: 250,
      inputs: [{ height: 250, value: 24 }],
      suggestLayouts: [
        {
          cols: [
            { height: 100, value: 4.8 },
            { height: 100, value: 4.8 },
            { height: 100, value: 4.8 },
            { height: 100, value: 4.8 },
            { height: 100, value: 4.8 }
          ]
        },
        { cols: [{ height: 250, value: 16 }, { height: 250, value: 8 }] },
        { cols: [{ height: 250, value: 12 }, { height: 250, value: 12 }] },
        {
          cols: [
            { height: 250, value: 8 },
            { height: 250, value: 8 },
            { height: 250, value: 8 }
          ]
        },
        { cols: [{ height: 250, value: 24 }] }
      ]
    };
  },
  computed: {
    PAGE_realTotal() {
      return this.inputs.reduce((pre, curr) => pre + +curr.value, 0);
    }
  },
  methods: {
    handleDragRow(event, row) {
      this.$emit("drag-row-start", event, row);
    },
    hanDragRowEnd(event, row) {
      this.$emit("drag-row-end", event, row);
    },
    handleChangeColHeight(height) {
      this.inputs.forEach(input => (input.height = height));
    },
    handleAverage() {
      let averageCol = 24 / this.inputs.length;
      this.inputs.forEach(input => (input.value = averageCol));
    },
    handleRemove() {
      if (this.inputs.length === 1) {
        this.$msg("1_至少需要一列布局");
        return;
      }

      // do {
        this.inputs.splice(this.inputs.length - 1, 1);
      // } while (24 % this.inputs.length && this.inputs.length >= 1);

      // this.handleAverage();
    },
    handleAdd() {
      if (this.inputs.length === 24) {
        this.$msg("1_至多只能有二十四列布局");
        return;
      }

      // do {
        this.inputs.push({ value: 0, height: this.inputsHeight });
      // } while (24 % this.inputs.length && this.inputs.length <= 24);

      // this.handleAverage();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variable.scss";

.layout-editor-container {
  @include default-flex;
  flex-wrap: wrap;
  flex-flow: column;
  height: 100%;
  padding: 2rem 1rem;
  & .editor-box {
    @include default-flex;
    @include flex-full;
    flex-wrap: wrap;
    height: 130px;
    & .editor-infos-box {
      @include default-flex;
      @include flex-full;
      &.suggest {
        color: $success-color;
      }
      & .infos {
        margin: 0 1rem;
        & div {
          padding: 0.2rem 0;
        }
        & .limit {
          color: $danger-color;
        }
      }
      & .controller-btn {
        @include default-flex;
        @include cur-p;
        @include btn-icon;
        justify-content: space-between;
        flex: 1;
      }
    }
    & .editor-inputs-box {
      @include default-flex;
      @include flex-full;
      justify-content: space-around;
      flex-wrap: wrap;
      & .input-item-box {
        width: 50px;
      }
    }
  }
  & .layout-preview-box {
    @include default-flex;
    @include cur-all;
    @include flex-full;
    height: 150px;
    & .preview-item {
      @include default-col-style;
      @include default-col-layout;
    }
  }
  & .suggest-layout-box {
    @include default-flex;
    @include flex-full;
    flex-wrap: wrap;
    overflow: auto;
    flex: 1;
    & .suggest-layout-title {
      margin-top: 1rem;
      @include btn-icon;
    }
    & .suggest-layout-row {
      @include default-flex;
      @include cur-all;
      @include flex-full;
      margin: 1rem 0;
      & .suggest-layout-item {
        @include default-col-style;
        @include default-col-layout;
      }
    }
  }
}
</style>
