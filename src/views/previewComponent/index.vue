<template>
  <div class="preview-component-container">
    <div
      class="component-box"
      :style="{width: `${componentWidth}px`,height: `${componentHeight}px`}"
    >
      <default-container>
        <component
          :is="`custom-report-component-${$route.query.componentName}`"
          :reportData="reportData"
        />
      </default-container>
    </div>
  </div>
</template>

<script>
import { getcomponentinfo } from "@/api";

import defaultContainer from "@/components/custom-report/default-container";
import customReports from "../previewReport/index";

export default {
  name: "previewComponent",
  data() {
    return {
      componentWidth: null,
      componentHeight: null,
      reportData: [
        {
          name: "email marketing",
          value: 72,
          xdata: "monday",
          arrData: [76, 28, 92, 90, 43, 46, 29]
        },
        {
          name: "union advertising",
          value: 21,
          xdata: "tuesday",
          arrData: [27, 50, 71, 82, 74, 34, 79]
        },
        {
          name: "search engine",
          value: 37,
          xdata: "wednesday",
          arrData: [69, 87, 92, 54, 32, 31, 82]
        },
        {
          name: "from video",
          value: 44,
          xdata: "thursday",
          arrData: [63, 53, 92, 21, 60, 10, 61]
        },
        {
          name: "pop up ads",
          value: 44,
          xdata: "friday",
          arrData: [51, 100, 32, 87, 23, 29, 13]
        },
        {
          name: "marketing",
          value: 53,
          xdata: "saturday",
          arrData: [100, 36, 78, 55, 57, 18, 18]
        },
        {
          name: "direct access",
          value: 21,
          xdata: "sunday",
          arrData: [76, 45, 68, 66, 88, 36, 29]
        }
      ]
    };
  },
  components: { defaultContainer, ...customReports },
  mounted() {
    let { componentName } = this.$route.query;
    let baseWidth = 1000;

    getcomponentinfo().then(res => {
      let component = res.find(
        component => component.componentName === componentName
      );
      this.componentWidth = (baseWidth / 24) * component.col;
      this.componentHeight = component.height;
    });
  }
};
</script>

<style lang="scss" scoped>
.preview-component-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & .component-box {
    border: 1px dotted black;
    border-radius: 5px;
  }
}
</style>
