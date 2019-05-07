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
          value: 52,
          xdata: "monday",
          arrData: [39, 41, 32, 17, 14, 58, 58]
        },
        {
          name: "union advertising",
          value: 52,
          xdata: "tuesday",
          arrData: [42, 88, 92, 35, 82, 98, 81]
        },
        {
          name: "search engine",
          value: 58,
          xdata: "wednesday",
          arrData: [38, 38, 39, 44, 27, 84, 67]
        },
        {
          name: "from video",
          value: 78,
          xdata: "thursday",
          arrData: [53, 56, 72, 76, 44, 59, 93]
        },
        {
          name: "pop up ads",
          value: 12,
          xdata: "friday",
          arrData: [64, 59, 72, 98, 67, 51, 61]
        },
        {
          name: "marketing",
          value: 66,
          xdata: "saturday",
          arrData: [98, 86, 13, 56, 79, 51, 33]
        },
        {
          name: "direct access",
          value: 40,
          xdata: "sunday",
          arrData: [53, 35, 30, 55, 61, 55, 48]
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
