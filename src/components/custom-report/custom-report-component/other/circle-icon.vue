<template>
  <div class="flex-1 flex flex-col">
    <circle-icon
      :circleWidth="130"
      :circleTitle="reportData.name"
      :percentage="reportData.score * 10"
      :circleTip="reportData.tips"
      :haveBox="mixinData.haveBox"
      :iconName="mixinData.iconName"
      :iconSize="mixinData.iconSize"
      :iconText="mixinData.iconText"
    />
  </div>
</template>

<script>
import circleIcon from "../../base/circle-icon";

export default {
  name: "custom-report-component-other-circle-icon",
  components: { circleIcon },
  props: {
    reportData: {
      type: Object,
      default() {
        return {};
      }
    },
    mixinData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
