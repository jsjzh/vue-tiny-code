<!--
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-28 13:39:58
 * @LastEditTime: 2019-05-15 15:37:26
 * @Description: 公用搜索条件页面
 -->
<template>
  <div class="query-container" v-loading="isLoading" @click="handleClickZtreeContainer">
    <!-- <div class="select-time-container">
      <div>
        <span>start_time&nbsp;&nbsp;&nbsp;</span>
        <el-date-picker
          value-format="timestamp"
          v-model="queryData.start_time"
          type="datetime"
          placeholder="start_time"
        />
      </div>

      <div>
        <span>end_time&nbsp;&nbsp;&nbsp;</span>
        <el-date-picker
          value-format="timestamp"
          v-model="queryData.end_time"
          type="datetime"
          placeholder="end_time"
        />
      </div>
    </div>-->

    <!-- <div class="select-ztree-container">
      <div class="switch-ztree-container">
        <el-button type="primary" @click="handleShowDepartment">select motorcade</el-button>
        <el-button type="primary" @click="handleShowDepartmentAndVehicle">select vehicle</el-button>
        <el-button type="primary" @click="handleShowDriver">select driver</el-button>
      </div>

      <div class="ztree-container">
        <div v-show="departmentShow" class="ztree-item">
          <ztree :setting="departmentSetting" :tree-id="departmentId" ref="ztreeDepartmentRef"/>
        </div>
        <div v-show="departmentAndVehicleShow" class="ztree-item">
          <ztree
            :setting="departmentAndVehicleSetting"
            :tree-id="departmentAndVehicleId"
            ref="ztreeDepartmentAndVehicleRef"
          />
        </div>

        <div v-show="driverShow" class="ztree-item">
          <ztree :setting="driverSetting" :tree-id="driverId" ref="ztreeDriverRef"/>
        </div>
      </div>
    </div>-->

    <div class="search-query-container">
      <div>
        <el-button type="primary" @click="handleChangeQueryData">search</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   // 车队
//   GetTreeDepartment,
//   // 车辆
//   GetTreeDepartmentAndVehicle,
//   // 驾驶员
//   GetTreeDriver
// } from "@/axios/api";

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
  name: "report-tool-select-query",
  data() {
    let { name: pageName } = this.$options;
    return {
      /* ************* ztree树设置 ************* */
      isLoading: false,
      queryData: {},
      departmentSetting: getZtreeSetting(this.handleClickZtreeNode),
      departmentAndVehicleSetting: getZtreeSetting(this.handleClickZtreeNode),
      driverSetting: getZtreeSetting(this.handleClickZtreeNode, {
        data: { key: { children: "children", name: "text" } }
      }),
      departmentId: `${pageName}-department-ztree`,
      departmentAndVehicleId: `${pageName}-departmentAndVehicle-ztree`,
      driverId: `${pageName}-driver-ztree`,
      departmentShow: true,
      departmentAndVehicleShow: false,
      driverShow: false,
      departmentZtreeObj: null,
      departmentAndVehicleZtreeObj: null,
      driverZtreeObj: null
      /* ************* ztree树设置 ************* */
    };
  },
  methods: {
    handleClickZtreeContainer(e) {
      if (e.target.className === "ztree-container") {
        this.$emit("click-outside");
      }
    },

    handleChangeQueryData() {
      this.$emit("select-query-done", this.queryData);
    },

    handleShowDepartment() {
      this.departmentShow = true;
      this.departmentAndVehicleShow = false;
      this.driverShow = false;
    },

    handleShowDepartmentAndVehicle() {
      this.departmentShow = false;
      this.departmentAndVehicleShow = true;
      this.driverShow = false;
    },

    handleShowDriver() {
      this.departmentShow = false;
      this.departmentAndVehicleShow = false;
      this.driverShow = true;
    },

    handleClickZtreeNode(jqEvent, id, node) {
      let { type, id: target_id, name, text } = node;
      this.queryData.type = type;
      this.queryData.target_id = target_id;
      this.queryData.text = name || text;
    },

    renderZtrees() {
      let {
        ztreeDepartmentRef,
        ztreeDepartmentAndVehicleRef,
        ztreeDriverRef
      } = this.$refs;

      this.isLoading = true;

      let ztreePromises = [
        GetTreeDepartment(),
        GetTreeDepartmentAndVehicle(),
        GetTreeDriver()
      ];

      Promise.all(ztreePromises)
        .then(ress => {
          ztreeDepartmentRef
            .init(ress[0])
            .then(ztree => (this.departmentZtreeObj = ztree));
          ztreeDepartmentAndVehicleRef
            .init(ress[1])
            .then(ztree => (this.departmentAndVehicleZtreeObj = ztree));
          ztreeDriverRef
            .init(ress[2])
            .then(ztree => (this.driverZtreeObj = ztree));
        })
        .finally(() => (this.isLoading = false));
    }
  },
  mounted() {
    // this.renderZtrees();
  }
};
</script>

<style lang="scss" scoped>
.query-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-content: center;
  .select-time-container {
    height: 100%;
    width: 20%;
    > div {
      margin: 2rem;
    }
  }
  .select-ztree-container {
    height: 100%;
    width: 80%;
    .switch-ztree-container {
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .ztree-container {
      width: 100%;
      height: 100%;
      position: relative;
      .ztree-item {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -65%);
        background-color: #737373;
        border-radius: 5px;
        width: 300px;
        height: 400px;
        /deep/ .ztree li span {
          color: white;
        }
        /deep/ .white-style .ml_tree_header .ml_tree_input {
          color: white;
        }
        /deep/ .ztree_Atra .ztree li a.curSelectedNode span:last-child {
          color: #409eff;
        }
      }
    }
  }
  .search-query-container {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }
}
</style>
