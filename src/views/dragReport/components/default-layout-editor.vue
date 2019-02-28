<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-02-22 09:31:45
 * @LastEditTime: 2019-02-28 10:26:39
 * @Description: 左侧添加布局的框
 -->
<template>
  <div class="layout-editor-container">
    <div class="editor-box">
      <div class="editor-infos-box">
        <div class="infos">
          <span class="limit">limit-total: 24</span>
          <span class="real">real-total: {{PAGE_realTotal}}</span>
        </div>
        <div class="controller-btn">
          <el-radio-group v-model="inputsHeight" @change="handleChangeColHeight" size="mini">
            <el-radio-button :label="100"/>
            <el-radio-button :label="250"/>
          </el-radio-group>
          <i class="el-icon-more" @click="handleAverage" title="average layout"/>
          <i class="el-icon-remove" @click="handleRemove" title="remove layout"/>
          <i class="el-icon-circle-plus" @click="handleAdd" title="add layout"/>
        </div>
      </div>
      <div class="editor-infos-box" style="color: #4caf50">4.8 的组件高度建议为 100，其他组件为 250，该比例显示最为正确</div>
      <div class="editor-inputs-box">
        <div class="input-item-box" v-for="(ipt, iptIndex) in inputs" :key="iptIndex">
          <el-input
            size="mini"
            :maxlength="2"
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
        :style="{width: `${100 * ipt.value / 24}%`, height: `${ipt.height / 3}px`}"
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
          :style="{width: `${100 * col.value / 24}%`, height: `${col.height / 3}px`}"
          v-for="(col, colIndex) in suggestLayout.cols"
          :key="colIndex"
        >{{col.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "default-layout-editor",
  data() {
    const suggestLayouts = [
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
    ];
    return {
      inputsHeight: 250,
      inputs: [
        { height: 250, value: 6 },
        { height: 250, value: 6 },
        { height: 250, value: 6 },
        { height: 250, value: 6 }
      ],
      suggestLayouts
    };
  },
  computed: {
    PAGE_realTotal() {
      return this.inputs.reduce((pre, curr) => pre + Number(curr.value), 0);
    }
  },
  methods: {
    handleDragRow(event, row) {
      this.$emit("drag-row-start", row);
    },
    hanDragRowEnd(event, row) {
      this.$emit("drag-row-end", row);
    },
    handleChangeColHeight() {
      this.inputs.forEach(input => (input.height = this.inputsHeight));
    },
    handleAverage() {
      let averageCol = 24 / this.inputs.length;
      console.log(averageCol);
      this.inputs.forEach(input => {
        input.value = averageCol;
      });
    },
    handleRemove() {
      this.inputs.splice(this.inputs.length - 1, 1);
      this.handleAverage();
    },
    handleAdd() {
      this.inputs.push({ value: 0, height: this.inputsHeight });
      this.handleAverage();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../css/variate.scss";

.layout-editor-container {
  @include previewRow;
  flex-flow: column;
  background-color: $defaultColor;
  padding: 2rem 1rem;
  & .editor-box {
    @include previewRow;
    height: 130px;
    width: 100%;
    & .editor-infos-box {
      @include defaultFlex;
      justify-content: space-between;
      width: 100%;
      & .infos {
        width: 50%;
        text-align: left;
        & .limit {
          color: $dangerColor;
        }
      }
      & .controller-btn {
        @include cur;
        width: 50%;
        text-align: right;
        font-size: 2rem;
      }
    }
    & .editor-inputs-box {
      @include defaultFlex;
      flex-wrap: wrap;
      width: 100%;
      & .input-item-box {
        width: 12%;
        & .input-item {
          max-width: 40px;
        }
      }
    }
  }
  & .layout-preview-box {
    @include defaultFlex;
    @include curAll;
    height: 100px;
    width: 100%;
    & .preview-item {
      @include previewItem;
    }
  }
  & .suggest-layout-box {
    @include previewRow;
    overflow: auto;
    flex: 1;
    width: 100%;
    & .suggest-layout-title {
      margin-top: 1rem;
      font-size: 2rem;
    }
    & .suggest-layout-row {
      @include defaultFlex;
      @include curAll;
      margin: 1rem 0;
      width: 100%;
      & .suggest-layout-item {
        @include previewItem;
      }
    }
  }
}
</style>
