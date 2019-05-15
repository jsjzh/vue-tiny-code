<template>
  <div class="flex flex-1">
    <base-table class="flex-1" :tableData="reportData" :tableOption="tableOption"/>
  </div>
</template>

<script>
import baseTable from "../../base/base-table";
import { tableOption } from "../../js/variable";

export default {
  name: "custom-report-component-table-block",
  data() {
    return { tableOption };
  },
  props: {
    reportData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: { baseTable }
};
</script>
