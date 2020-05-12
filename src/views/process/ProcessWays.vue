<template>
  <ScrollBar>
    <Dialog
      :config="addDialogConfig"
      :show="showAddDialog"
      :onClose="handleCloseDialog"
      :onConfirm="onAdd"
    ></Dialog>
    <div class="process-ways">
      <Breadcrumb
        :config="{ data: { title: '加工信息管理', subTitle: '加工工艺' } }"
      ></Breadcrumb>
      <div class="header">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="processWays.pageSize"
          :current-page="processWays.current"
          :page-count="processWays.totalPage"
          @current-change="onChangePage"
        >
        </el-pagination>
        <Button
          type="blue"
          :onClickButton="
            () => {
              showAddDialog = true;
            }
          "
          >新增加工工艺</Button
        >
      </div>
      <ProcessBlock :config="processWays.data"></ProcessBlock>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import ProcessBlock from "@/components/process/ProcessBlock.vue";
import Button from "@/components/common/Button.vue";
import Dialog from "@/components/common/dialog/Dialog.vue";

export default {
  name: "ProcessWays",
  components: {
    Breadcrumb,
    ScrollBar,
    ProcessBlock,
    Button,
    Dialog,
  },
  data() {
    return {
      processWays: {
        current: 1,
        pageSize: 10,
        totalPage: 1,
        data: [],
      },
      addDialogConfig: {
        title: "新增加工工艺",
        width: "600px",
        labelWidth: "120px",
        items: [
          {
            type: "text",
            label: "加工工艺名称",
            variable: "technique",
            default: "",
            check: {
              type: "NOT_NULL",
              message: "工艺名称不能为空哦！",
            },
            option: {
              placeholder: "请输入加工工艺名称",
            },
          },
          {
            type: "block",
            label: "原材料",
            variable: "raw",
            check: {
              type: "NOT_ZERO",
              message: "至少选择一项原材料！",
            },
            dialogConfig: {
              labelWidth: "100px",
              dialogTitle: "选择种子",
              dialogWidth: "900px",
              key: "productBatchNumber",
              tableLabels: [
                {
                  label: "productBatchNumber",
                  name: "初级农产品批次编号",
                },
                {
                  label: "sourceNumber",
                  name: "溯源码编号",
                },
                {
                  label: "seedName",
                  name: "种子成品名称",
                },
                {
                  label: "reapTime",
                  name: "收割时间",
                },
                {
                  label: "fertilizerTime",
                  name: "施肥次数",
                },
                {
                  label: "pesticideTime",
                  name: "农药播撒次数",
                },
              ],
              labels: [
                {
                  label: "productBatchNumber",
                  name: "初级农产品批次编号",
                },
                {
                  label: "sourceNumber",
                  name: "溯源码编号",
                },
                {
                  label: "seedName",
                  name: "种子成品名称",
                },
              ],
              default: () => [],
              getTableData: (pageNumber, pageSize) => {
                return this.$Http
                  .get({
                    url: "/processing/prodProductInfo",
                    data: {
                      startPage: pageNumber,
                      pageSize,
                    },
                  })
                  .then((res) => {
                    return Promise.resolve({
                      curPage: res.data.curPage,
                      totalPage: res.data.totalPage,
                      data: res.data.prodProductInfo,
                    });
                  });
              },
            },
          },
          {
            type: "select",
            label: "产品线",
            variable: "productLineNumber",
            optionVar: "productionLines",
            default: "",
            check: {
              type: "NOT_NULL",
              message: "请选择产品线！",
            },
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
              placeholder: "请选择生产线",
              label: "productLineName",
              key: "productLineNumber",
            },
          },
          {
            type: "text",
            label: "加工成品名称",
            variable: "productName",
            default: "",
            check: {
              type: "NOT_NULL",
              message: "加工成品名称不能为空哦！",
            },
            option: {
              placeholder: "请输入加工成品名称",
            },
          },
        ],
      },
      showAddDialog: false,
    };
  },
  created() {
    this.onGetProcessWays(1);
  },
  methods: {
    onGetProcessWays(pageNumber) {
      this.$Http
        .get({
          url: "/processing/technique",
          data: {
            startPage: pageNumber,
            pageSize: this.processWays.pageSize,
          },
        })
        .then((res) => {
          this.processWays.current = res.data.curPage;
          this.processWays.totalPage = res.data.totalPage;
          this.processWays.data = res.data.technique;
        });
    },
    onChangePage(pageNumber) {
      this.onGetProcessWays(pageNumber);
    },
    handleCloseDialog() {
      this.showAddDialog = false;
    },
    onAdd(formData) {
      this.$Http
        .post({
          url: "/processing/addTechnique",
          data: {
            technique: formData.technique,
            productName: formData.productName,
            productLineNumber: formData.productLineNumber,
            raw: formData.raw.map((item) => {
              return {
                productBatchNumber: item.productBatchNumber,
              };
            }),
          },
        })
        .then(() => {
          this.onGetProcessWays(this.processWays.current);
          this.$message.success("添加工艺成功");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.process-ways {
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    .el-pagination {
      & /deep/ button,
      & /deep/ .number,
      & /deep/ .more {
        background-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.803);
        &:hover {
          color: white !important;
          background-color: rgba(0, 0, 0, 0.2) !important;
          i {
            color: white !important;
          }
        }
      }
      & /deep/ .number.active {
        color: white !important;
        background-color: rgba(0, 0, 0, 0.2) !important;
      }
    }
  }
}
</style>
