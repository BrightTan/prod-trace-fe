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
    <div class="product-sale-info">
      <div class="header">
        <Breadcrumb
          :config="{
            data: { title: '销售信息管理', subTitle: '产品销售信息' },
          }"
        ></Breadcrumb>
        <Button type="blue" :onClickButton="onAdd">新增销售单</Button>
      </div>
      <div class="table-container">
        <el-table :data="productionInfos.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column prop="sourceNumber" label="溯源码编号">
          </el-table-column>
          <el-table-column prop="orderNumber" label="销售单编号">
          </el-table-column>
          <el-table-column prop="companyNumber" label="销售公司编号">
          </el-table-column>
          <el-table-column prop="storageTime" label="入库时间">
          </el-table-column>
          <el-table-column prop="soldTime" label="售出时间"> </el-table-column>
          <el-table-column prop="buyer" label="购买者"> </el-table-column>
          <el-table-column prop="salesNum" label="销售数量"> </el-table-column>
          <el-table-column prop="salesmanName" label="销售员姓名">
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
  name: "ProductSaleInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
    Dialog,
  },
  data() {
    return {
      dialogConfig: {
        title: "更新销售单",
        width: "500px",
        labelWidth: "140px",
        items: [],
      },
      addDialogConfig: {
        title: "新增销售单",
        width: "500px",
        labelWidth: "140px",
        items: [],
      },
      showAddDialog: false,
      showDialog: false,
      prodInfos: [],
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
    this.onGetProdToSale();
  },
  methods: {
    onGetProdInfos(pageNumber) {
      this.$Http
        .get({
          url: "/sales/salesInfo",
          data: {
            startPage: pageNumber,
            pageSize: this.productionInfos.pageSize,
          },
        })
        .then((res) => {
          this.productionInfos.current = res.data.curPage;
          this.productionInfos.totalPage = res.data.totalPage;
          this.productionInfos.data = res.data.salesInfo;
        });
    },
    onGetProdToSale() {
      this.$Http
        .get({
          url: "/sales/productInfo",
          data: {
            startPage: 1,
            pageSize: 10000,
          },
        })
        .then((res) => {
          this.prodInfos = res.data.productInfo;
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
            label: "销售单编号",
            variable: "orderNumber",
            default: rawData.orderNumber,
            disabled: true,
          },
          {
            type: "timestamp",
            label: "入库时间",
            variable: "storageTime",
            default: rawData.storageTime,
            option: {
              placeholder: "请选择入库时间",
            },
          },
          {
            type: "timestamp",
            label: "售出时间",
            variable: "soldTime",
            default: rawData.soldTime,
            option: {
              placeholder: "请选择售出时间",
            },
          },
          {
            type: "text",
            label: "购买者",
            variable: "buyer",
            default: rawData.buyer,
            option: {
              placeholder: "请输入购买者姓名",
            },
          },
          {
            type: "number",
            label: "已售数量",
            variable: "soldProductNum",
            disabled: false,
            default: rawData.salesNum,
            option: {
              precision: 0,
              min: 0,
              max: () => {
                const thisOne = this.prodInfos.find((item) => {
                  return item.sourceNumber === rawData.sourceNumber;
                });
                if (thisOne) {
                  return thisOne.productNum;
                } else {
                  return Infinity;
                }
              },
            },
          },
          {
            type: "text",
            label: "销售员姓名",
            variable: "salesmanName",
            default: rawData.salesmanName,
            option: {
              placeholder: "请输入销售员姓名",
            },
          },
        ],
      };
      this.showDialog = true;
    },
    onAdd() {
      this.addDialogConfig = {
        title: "新增销售单",
        width: "500px",
        labelWidth: "140px",
        items: [
          {
            type: "block",
            label: "销售产品",
            variable: "saledProd",
            check: {
              type: "NOT_ZERO",
              message: "销售产品不能为空",
            },
            dialogConfig: {
              labelWidth: "100px",
              dialogTitle: "可销售的产品",
              dialogWidth: "600px",
              key: "sourceNumber",
              onlyOne: true,
              tableLabels: [
                {
                  label: "sourceNumber",
                  name: "溯源码编号",
                },
                {
                  label: "waybillNumber",
                  name: "运单编号",
                },
                {
                  label: "productName",
                  name: "产品名称",
                },
                {
                  label: "productNum",
                  name: "产品数量",
                },
              ],
              labels: [
                {
                  label: "sourceNumber",
                  name: "溯源码编号",
                },
                {
                  label: "waybillNumber",
                  name: "运单编号",
                },
                {
                  label: "productName",
                  name: "产品名称",
                },
                {
                  label: "productNum",
                  name: "产品数量",
                },
              ],
              default: () => [],
              getTableData: (pageNumber, pageSize) => {
                return this.$Http
                  .get({
                    url: "/sales/productInfo",
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
            type: "timestamp",
            label: "入库时间",
            variable: "storageTime",
            default: "",
            option: {
              placeholder: "请选择入库时间",
            },
          },
          {
            type: "timestamp",
            label: "售出时间",
            variable: "soldTime",
            default: "",
            option: {
              placeholder: "请选择售出时间",
            },
          },
          {
            type: "text",
            label: "购买者",
            variable: "buyer",
            default: "",
            option: {
              placeholder: "请输入购买者姓名",
            },
          },
          {
            type: "number",
            label: "已售数量",
            variable: "soldProductNum",
            disabled: false,
            default: 0,
            option: {
              precision: 0,
              min: 0,
              max: (formData) => {
                if (formData.saledProd && formData.saledProd.length > 0) {
                  return formData.saledProd[0].productNum;
                } else {
                  return 0;
                }
              },
            },
          },
          {
            type: "text",
            label: "销售员姓名",
            variable: "salesmanName",
            default: "",
            option: {
              placeholder: "请输入销售员姓名",
            },
          },
        ],
      };
      this.showAddDialog = true;
    },
    onDelete(rawData) {
      this.$Http
        .post({
          url: "/sales/deleteSalesInfo",
          data: {
            orderNumber: rawData.orderNumber,
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
          url: "/sales/addSalesInfo",
          data: {
            sourceNumber: formData.saledProd[0].sourceNumber,
            storageTime: formData.storageTime,
            soldTime: formData.soldTime,
            buyer: formData.buyer,
            soldProductNum: formData.soldProductNum,
            salesmanName: formData.salesmanName,
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
.product-sale-info {
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
