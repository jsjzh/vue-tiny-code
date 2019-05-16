<template>
  <div class="container">
    <div class="component-container">
      <div class="filter-container">
        <div
          v-for="(filterItem, filterIndex) in filterOptions"
          :key="filterIndex"
          class="filter-item"
        >
          <el-radio-group
            size="mini"
            v-model="filterItem.value"
            @change="handleFilterComponent(filterIndex, filterItem.value)"
          >
            <el-radio
              border
              v-for="(radioValue, radioValueIndex) in filterItem.values"
              :key="radioValueIndex"
              :label="radioValue"
            />
          </el-radio-group>
        </div>
      </div>
      <div class="component-list-container">
        <div
          class="item-box"
          @click="handleClickComponent(component)"
          v-for="(component, componentIndex) in filterComponents"
          :key="componentIndex"
        >
          <div class="item-infos">
            <div>col：{{component.col}}</div>
            <div>height：{{component.height}}</div>
          </div>
          <div
            class="component-item"
            :style="previewColStyle({ width: component.col, height: component.height },{backgroundImage: component.previewImage ? `url(${component.previewImage})` : null})"
          />
        </div>
      </div>
    </div>
    <div class="edit-component-container">
      <div class="preview-container">
        <div
          class="preview-item"
          :style="previewColStyle({ width: editComponentInfo.col, height: editComponentInfo.height, baseHeight: 1 }, {backgroundImage: editComponentInfo.previewImage ? `url(${editComponentInfo.previewImage})` : null, width: `${editComponentInfo.col *50}px`})"
        />
      </div>
      <div class="edit-container">
        <div class="controller-bar">
          <el-button
            style="float: left;margin-left: 2rem"
            type="success"
            @click="handleAddComponent"
          >add</el-button>
          <el-button
            style="float: left;margin-left: 2rem"
            type="warning"
            v-show="canEdit"
            @click="handleClearComponent"
          >clear</el-button>
          <el-button type="danger" @click="handleDelComponent" v-show="editComponentInfo.id">del</el-button>
          <el-button type="primary" v-show="canEdit" @click="handleSaveComponent">save</el-button>
        </div>
        <div class="edit-form-container">
          <div class="item-col" v-for="(form, formIndex) in editForms" :key="formIndex">
            <div class="form-box">
              <el-tooltip effect="dark" :content="form.tip" placement="top-start">
                <i class="el-icon-question tip"/>
              </el-tooltip>
              <div class="title">{{form.title}}：</div>
              <el-input
                :disabled="!canEdit"
                v-if="form.type === 'input'"
                :maxlength="form.maxlength"
                :minlength="form.minlength"
                :max="form.max"
                :min="form.min"
                :placeholder="form.title"
                v-model="editComponentInfo[form.key]"
              />
              <el-radio-group
                :disabled="!canEdit"
                v-if="form.type === 'radio'"
                v-model="editComponentInfo[form.key]"
              >
                <el-radio-button
                  v-for="(radioValue, radioValueIndex) in form.radioValues"
                  :key="radioValueIndex"
                  :label="radioValue"
                />
              </el-radio-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import colStyle from "@/mixins/methods/col-style";
import { deepClone } from "@/utils";
import { getcomponentinfo } from "@/api";

export default {
  name: "editComponent",
  mixins: [colStyle],
  data() {
    return {
      components: [],
      filterComponents: [],
      filterOptions: {
        col: {
          value: null,
          values: []
        },
        height: {
          value: null,
          values: []
        }
      },
      canEdit: false,
      editComponentInfo: {},
      editForms: [
        {
          key: "previewImage",
          type: "input",
          tip: "组件的预览图，建议使用 url",
          title: "预览图"
        },
        {
          key: "label",
          type: "input",
          tip: "组件默认标题，在排版组件的时候若用户未设定名称就会用这个标题",
          title: "默认标题"
        },
        {
          key: "componentKey",
          type: "input",
          tip: "组件标识，不能重复，建议为数字，若重复了希望后台给一个错误信息",
          title: "组件标识"
        },
        {
          key: "componentName",
          type: "input",
          tip:
            "组件名称，前端开发完一个组件之后，假设是 custom-report-demo，那这里就填 demo 即可",
          title: "组件名称"
        },
        { key: "api", type: "input", tip: "组件数据对应的接口", title: "接口" },
        {
          key: "method",
          type: "radio",
          radioValues: ["get", "post"],
          tip: "接口的方法名",
          title: "方法"
        },
        {
          key: "dataKey",
          type: "input",
          tip:
            "若接口返回的数据是 { data: names: {} }，你想要获取 names，这里就填写 names，若为空则会将数据全部传入组件内。（强烈建议定义了之后就不要修改）",
          title: "数据标识"
        },
        {
          key: "col",
          type: "input",
          maxlength: 3,
          minlength: 1,
          max: 24,
          min: 1,
          tip: "组件所占的宽度，[1, 24]",
          title: "占位"
        },
        {
          key: "height",
          type: "radio",
          radioValues: [100, 250, 400],
          tip: "组件所占的高度",
          title: "高度"
        }
      ]
    };
  },
  methods: {
    handleFilterComponent(type, value) {
      let {
        col: { value: colValue },
        height: { value: heightValue }
      } = this.filterOptions;

      colValue &&
        (this.filterComponents = this.components.filter(
          item => item.col === colValue
        ));

      heightValue &&
        (this.filterComponents = this.filterComponents.filter(
          item => item.height === heightValue
        ));
    },
    handleClickComponent(component) {
      this.editComponentInfo = deepClone(component);
      this.canEdit = true;
    },
    handleAddComponent() {
      this.canEdit = true;
      this.editComponentInfo = {};
    },
    handleClearComponent() {
      this.editComponentInfo = {};
    },
    handleDelComponent() {},
    handleSaveComponent() {}
  },
  mounted() {
    getcomponentinfo().then(res => {
      this.components = res;
      this.filterComponents = res;
      this.filterOptions.col.values = Array.from(
        new Set(this.filterComponents.map(item => item.col))
      );
      this.filterOptions.height.values = Array.from(
        new Set(this.filterComponents.map(item => item.height))
      );
    });
  }
};
</script>

<style lang="scss" scoped>
@import "./layout.scss";
</style>

