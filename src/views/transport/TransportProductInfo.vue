<template>
  <ScrollBar>
    <Dialog
      :config="dialogConfig"
      :show="showDialog"
      :onClose="onCloseUpdateDialog"
      :onConfirm="onConfirmUpdate"
    ></Dialog>
    <Dialog
      :config="addDialogConfig"
      :show="showAddDialog"
      :onClose="onCloseAddDialog"
      :onConfirm="onConfirmAdd"
    ></Dialog>
    <div class="transport-product-info">
      <div class="header">
        <Breadcrumb
          :config="{
            data: { title: '运输信息管理', subTitle: '产品运输信息' },
          }"
        ></Breadcrumb>
        <Button type="blue" :onClickButton="onAdd">新增运输信息</Button>
      </div>
      <div class="table-container">
        <el-table :data="productionInfos.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column prop="sourceNumber" label="溯源码编号">
          </el-table-column>
          <el-table-column prop="waybillNumber" label="运单编号">
          </el-table-column>
          <el-table-column prop="processCompany" label="产品加工企业">
          </el-table-column>
          <el-table-column prop="transportWay" label="运输方式">
          </el-table-column>
          <el-table-column prop="waybillTo" label="运单去向"> </el-table-column>
          <el-table-column prop="transportHead" label="运输负责人">
          </el-table-column>
          <el-table-column prop="transportTime" label="运输时长">
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="column">
              <Button
                type="blue"
                style="padding-top: 2px;padding-bottom:2px"
                :onClickButton="
                  () => {
                    onUpdate(column.row);
                  }
                "
                >更新</Button
              >
              <Button
                type="red"
                style="padding-top: 2px;padding-bottom:2px"
                :onClickButton="
                  () => {
                    onDelete(column.row);
                  }
                "
                >删除</Button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="productionInfos.pageSize"
          :current-page="productionInfos.current"
          :page-count="productionInfos.totalPage"
          @current-change="onChangePage"
        >
        </el-pagination>
      </div>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import Button from "@/components/common/Button.vue";
import Dialog from "@/components/common/dialog/Dialog.vue";

export default {
  name: "TransportProductInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
    Dialog,
  },
  data() {
    return {
      dialogConfig: {
        title: "更新运输信息",
        width: "500px",
        labelWidth: "140px",
        items: [],
      },
      addDialogConfig: {
        title: "添加运输信息",
        width: "500px",
        labelWidth: "140px",
        items: [],
      },
      showAddDialog: false,
      showDialog: false,
      productionInfos: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
    };
  },
  created() {
    this.onGetProdInfos(1);
  },
  methods: {
    onGetProdInfos(pageNumber) {
      this.$Http
        .get({
          url: "/transport/transportInfo",
          data: {
            startPage: pageNumber,
            pageSize: this.productionInfos.pageSize,
          },
        })
        .then((res) => {
          this.productionInfos.current = res.data.curPage;
          this.productionInfos.totalPage = res.data.totalPage;
          this.productionInfos.data = res.data.transportInfo;
        });
    },
    onChangePage(pageNumber) {
      this.onGetProdInfos(pageNumber);
    },
    onUpdate(rawData) {
      this.dialogConfig = {
        title: "更新加工信息",
        width: "500px",
        labelWidth: "140px",
        items: [
          {
            type: "text",
            label: "运单编号",
            variable: "waybillNumber",
            default: rawData.waybillNumber,
            disabled: true,
            option: {
              placeholder: "请输入运单编号",
            },
          },
          {
            type: "text",
            label: "运输方式",
            variable: "transportWay",
            default: rawData.transportWay,
            check: {
              type: "NOT_NULL",
              message: "运输方式不能为空哦！",
            },
            option: {
              placeholder: "请输入运输方式",
            },
          },
          {
            type: "text",
            label: "运单去向",
            variable: "waybillTo",
            default: rawData.waybillTo,
            check: {
              type: "NOT_NULL",
              message: "运单去向不能为空哦！",
            },
            option: {
              placeholder: "请输入运单去向",
            },
          },
          {
            type: "text",
            label: "运输负责人",
            variable: "transportHead",
            default: rawData.transportHead,
            check: {
              type: "NOT_NULL",
              message: "运输负责人不能为空哦！",
            },
            option: {
              placeholder: "请输入运输负责人",
            },
          },
          {
            type: "text",
            label: "运输时长",
            variable: "transportTime",
            default: rawData.transportTime,
            option: {
              placeholder: "请输入运输时长",
            },
          },
        ],
      };
      this.showDialog = true;
    },
    onAdd() {
      this.addDialogConfig = {
        title: "添加运输信息",
        width: "500px",
        labelWidth: "140px",
        items: [
          {
            type: "block",
            label: "运输产品",
            variable: "transportProd",
            check: {
              type: "NOT_ZERO",
              message: "运输产品不能为空",
            },
            dialogConfig: {
              labelWidth: "100px",
              dialogTitle: "完成加工的产品信息",
              dialogWidth: "600px",
              key: "sourceNumber",
              onlyOne: true,
              tableLabels: [
                {
                  label: "sourceNumber",
                  name: "溯源码编号",
                },
                {
                  label: "productName",
                  name: "产品名称",
                },
              ],
              labels: [
                {
                  label: "sourceNumber",
                  name: "溯源码编号",
                },
                {
                  label: "productName",
                  name: "产品名称",
                },
              ],
              default: () => [],
              getTableData: (pageNumber, pageSize) => {
                return this.$Http
                  .get({
                    url: "/transport/productInfo",
                    data: {
                      startPage: pageNumber,
                      pageSize,
                    },
                  })
                  .then((res) => {
                    return Promise.resolve({
                      curPage: res.data.curPage,
                      totalPage: res.data.totalPage,
                      data: res.data.productInfo,
                    });
                  });
              },
            },
          },
          {
            type: "text",
            label: "运输方式名称",
            variable: "transportWay",
            default: "",
            option: {
              placeholder: "请输入运输方式名称",
            },
          },
          {
            type: "text",
            label: "运单去向",
            variable: "waybillTo",
            default: "",
            option: {
              placeholder: "请输入运单去向",
            },
          },
          {
            type: "text",
            label: "运输负责人",
            variable: "transportHead",
            default: "",
            option: {
              placeholder: "请输入运输方式名称",
            },
          },
          {
            type: "text",
            label: "运输时长",
            variable: "transportTime",
            default: "",
            option: {
              placeholder: "请输入运输时长",
            },
          },
        ],
      };
      this.showAddDialog = true;
    },
    onDelete(rawData) {
      this.$Http
        .post({
          url: "/transport/deleteTransportInfo",
          data: {
            waybillNumber: rawData.waybillNumber,
          },
        })
        .then(() => {
          this.$message.success("删除成功");
          this.onGetProdInfos(this.productionInfos.current);
        });
    },
    onCloseUpdateDialog() {
      this.showDialog = false;
    },
    onCloseAddDialog() {
      this.showAddDialog = false;
    },
    onConfirmUpdate(formData) {
      this.$Http
        .post({
          url: "/transport/updateTransportInfo",
          data: {
            ...formData,
          },
        })
        .then(() => {
          this.$message.success("更新成功");
          this.onGetProdInfos(this.productionInfos.current);
        });
    },
    onConfirmAdd(formData) {
      this.$Http
        .post({
          url: "/transport/addTransportInfo",
          data: {
            sourceNumber: formData.transportProd[0].sourceNumber,
            transportWay: formData.transportWay,
            waybillTo: formData.waybillTo,
            transportHead: formData.transportHead,
            transportTime: formData.transportTime,
          },
        })
        .then(() => {
          this.$message.success("添加成功");
          this.onGetProdInfos(1);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.transport-product-info {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table-container {
    margin: 20px 0;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
    .el-table {
      background: transparent;
      &::before {
        background-color: transparent;
      }
      & /deep/ tr {
        background-color: transparent !important;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.6);
      }
      & /deep/ th {
        background-color: transparent !important;
        color: white;
      }
      & /deep/ tbody tr.el-table__row {
        &:hover td {
          background-color: rgba(0, 0, 0, 0.2) !important;
          color: white;
        }
      }
    }
    .el-pagination {
      padding: 20px 0;
      & /deep/ button,
      & /deep/ .number,
      & /deep/ .more {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.603);
        &:hover {
          color: white;
          background-color: rgba(0, 0, 0, 0.2);
          i {
            color: white;
          }
        }
      }
      & /deep/ .number.active {
        color: white;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
