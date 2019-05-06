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
      reportData: {
        countOne: 123,
        countTwo: 123,
        rate: 123,
        average: 123
      }
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
