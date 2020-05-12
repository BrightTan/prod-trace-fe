<template>
  <ScrollBar>
    <Dialog
      :config="dialogConfig"
      :show="showDialog"
      :onClose="onCloseUpdateDialog"
      :onConfirm="onConfirmUpdate"
    ></Dialog>
    <div class="product-info">
      <Breadcrumb
        :config="{ data: { title: '加工信息管理', subTitle: '产品加工信息' } }"
      ></Breadcrumb>
      <div class="table-container">
        <el-table :data="productionInfos.data" style="width: 100%">
          <el-table-column type="index" width="100" label="#">
          </el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="sourceNumber" label="溯源码编号">
          </el-table-column>
          <el-table-column prop="cprodName" label="生产公司"> </el-table-column>
          <el-table-column prop="productLineNumber" label="产品线编号">
          </el-table-column>
          <el-table-column prop="technique" label="加工工艺名称">
          </el-table-column>
          <el-table-column prop="processedTime" label="加工完成时间">
          </el-table-column>
          <el-table-column prop="checkOutNumber" label="检验合格编号">
          </el-table-column>
          <el-table-column prop="productNum" label="加工数量">
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
  name: "ProductInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    Button,
    Dialog,
  },
  data() {
    return {
      dialogConfig: {
        title: "更新加工信息",
        width: "500px",
        labelWidth: "140px",
        items: [],
      },
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
          url: "/processing/processInfo",
          data: {
            startPage: pageNumber,
            pageSize: this.productionInfos.pageSize,
          },
        })
        .then((res) => {
          this.productionInfos.current = res.data.curPage;
          this.productionInfos.totalPage = res.data.totalPage;
          this.productionInfos.data = res.data.processInfo;
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
            label: "溯源码编号",
            variable: "sourceNumber",
            default: rawData.sourceNumber,
            disabled: true,
          },
          {
            type: "text",
            label: "加工工艺名称",
            variable: "technique",
            default: rawData.technique,
            check: {
              type: "NOT_NULL",
              message: "加工工艺名称不能为空哦！",
            },
            option: {
              placeholder: "请输入加工工艺名称",
            },
          },
          {
            type: "select",
            label: "产品线",
            variable: "productLineNumber",
            optionVar: "productLineOption",
            default: rawData.productLineNumber,
            selectOptions: () => [],
            getSelectData: () => {
              return this.$Http
                .get({
                  url: "/processing/productLineInfo",
                })
                .then((res) => {
                  return Promise.resolve(res.data.productLineInfo);
                });
            },
            option: {
              placeholder: "请选择加工线",
              label: "productLineName",
              key: "productLineNumber",
            },
          },
          {
            type: "timestamp",
            label: "加工完成时间",
            variable: "processedTime",
            default: rawData.processedTime,
          },
          {
            type: "text",
            label: "检验合格编号",
            variable: "checkOutNumber",
            default: rawData.checkOutNumber,
            option: {
              placeholder: "请输入检验合格编号",
            },
          },
          {
            type: "number",
            label: "产品加工数量",
            variable: "productNum",
            default: rawData.productNum,
            option: {
              precision: 0,
              min: 0,
              max: Infinity,
            },
          },
        ],
      };
      this.showDialog = true;
    },
    onDelete(rawData) {
      this.$Http
        .post({
          url: "/processing/deleteProcessInfo",
          data: {
            sourceNumber: rawData.sourceNumber,
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
    onConfirmUpdate(formData) {
      this.$Http
        .post({
          url: "/processing/updateProcessInfo",
          data: {
            ...formData,
          },
        })
        .then(() => {
          this.$message.success("更新成功");
          this.onGetProdInfos(this.productionInfos.current);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.product-info {
  padding: 20px;
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
