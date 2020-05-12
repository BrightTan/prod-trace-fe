<template>
  <ScrollBar>
    <Dialog
      :config="config"
      :show="show"
      :onClose="handleCloseDialog"
      :onConfirm="onConfirm"
    ></Dialog>
    <div class="manage-com-info">
      <Breadcrumb
        :config="{ data: { title: '用户信息管理', subTitle: '企业信息管理' } }"
      ></Breadcrumb>
      <el-row>
        <el-col
          class="company-container"
          :xl="{ span: 12, offset: 6 }"
          :lg="{ span: 12, offset: 6 }"
          :md="{ span: 24, offset: 0 }"
          :sm="{ span: 24, offset: 0 }"
        >
          <div class="title">企业信息</div>
          <div
            v-for="label in labels"
            :key="label.label"
            :class="
              `item ${
                typeof formData[label.label] === 'object' ? 'block-value' : ''
              }`
            "
          >
            <label>{{
              label.name +
                (typeof formData[label.label] === "object" ? "" : "：")
            }}</label>
            <div v-if="typeof formData[label.label] === 'object'" class="value">
              <div class="block">
                <div
                  class="content"
                  v-for="(item, index) in formData[label.label]"
                  :key="index"
                >
                  <div class="item" v-for="key in Object.keys(item)" :key="key">
                    <label>{{ subLabels[key] }}：</label>
                    <div class="value">{{ item[key] }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="value">
              {{ formData[label.label] }}
            </div>
          </div>
          <Button
            type="blue"
            style="margin-top: 20px"
            :onClickButton="
              () => {
                show = true;
              }
            "
            >申请修改企业信息</Button
          >
        </el-col>
      </el-row>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import Dialog from "@/components/common/dialog/Dialog.vue";
import Button from "@/components/common/Button.vue";
export default {
  name: "ManageComInfo",
  components: {
    Breadcrumb,
    ScrollBar,
    Dialog,
    Button,
  },
  data() {
    return {
      labels: [
        {
          label: "compNumber",
          name: "企业编号",
        },
        {
          label: "compName",
          name: "企业名称",
        },
        {
          label: "compAddr",
          name: "企业地址",
        },
        {
          label: "compTel",
          name: "企业电话",
        },
        {
          label: "compFields",
          name: "田块信息",
        },
        {
          label: "compProcName",
          name: "合作加工公司",
        },
      ],
      subLabels: {
        fieldId: "田块编号",
        saleAlkali: "盐碱度",
        fieldAddr: "田块位置",
        plantNum: "田块种植次数",
      },
      config: {
        title: "申请修改企业信息",
        width: "600px",
        labelWidth: "120px",
        items: [],
      },
      show: false,
      formData: {},
    };
  },
  created() {
    this.getCompanyInfo();
  },
  methods: {
    getCompanyInfo() {
      this.$Http
        .get({
          url: "/production/ei",
        })
        .then((res) => {
          this.formData = res.data;
          this.config = {
            title: "申请修改企业信息",
            width: "600px",
            labelWidth: "120px",
            items: [
              {
                type: "text",
                label: "企业编号",
                variable: "compNumber",
                default: res.data.compNumber,
                disabled: true,
              },
              {
                type: "text",
                label: "企业名称",
                variable: "compName",
                default: res.data.compName,
                check: {
                  type: "NOT_NULL",
                  message: "企业名称不能为空哦！",
                },
                option: {
                  placeholder: "请输入企业名称",
                },
              },
              {
                type: "text",
                label: "企业地址",
                variable: "compAddr",
                default: res.data.compAddr,
                check: {
                  type: "NOT_NULL",
                  message: "企业地址不能为空哦！",
                },
                option: {
                  placeholder: "请输入企业地址",
                },
              },
              {
                type: "text",
                label: "企业电话",
                variable: "compTel",
                default: res.data.compTel,
                check: {
                  type: "NOT_NULL",
                  message: "企业电话不能为空哦！",
                },
                option: {
                  placeholder: "请输入企业电话",
                },
              },
              {
                type: "computed",
                label: "田块数量",
                variable: "tianNumber",
                computed: (formData) => {
                  if (formData && formData.compFields !== undefined) {
                    return formData.compFields.length;
                  } else {
                    return 0;
                  }
                },
              },
              {
                type: "form",
                label: "企业田块",
                variable: "compFields",
                check: {
                  type: "NOT_ZERO",
                  message: "企业田块不能为空",
                },
                dialogConfig: {
                  labelWidth: "100px",
                  dialogTitle: "请填写田块信息",
                  dialogWidth: "600px",
                  key: "fieldId",
                  items: [
                    {
                      type: "text",
                      label: "田块编号",
                      variable: "fieldId",
                      default: "",
                      disabled: true,
                      option: {
                        placeholder: "系统会自动生成，不用填写",
                      },
                    },
                    {
                      type: "number",
                      label: "田块盐碱度",
                      variable: "saltAlkali",
                      default: 0,
                      option: {
                        precision: 2,
                      },
                    },
                    {
                      type: "text",
                      label: "田块位置",
                      variable: "fieldAddr",
                      default: "",
                      check: {
                        type: "NOT_NULL",
                        message: "田块位置不能为空哦！",
                      },
                      option: {
                        placeholder: "请输入田块位置",
                      },
                    },
                    {
                      type: "number",
                      label: "田块种植次数",
                      variable: "plantNum",
                      default: 0,
                      option: {
                        precision: 0,
                        min: 0,
                        max: Infinity,
                      },
                    },
                  ],
                  default: () => res.data.compFields,
                },
              },
              {
                type: "block",
                label: "合作加工公司",
                variable: "compProcInfo",
                check: {
                  type: "NOT_ZERO",
                  message: "合作加工公司不能为空",
                },
                dialogConfig: {
                  labelWidth: "100px",
                  dialogTitle: "请选择合作企业",
                  dialogWidth: "600px",
                  key: "compProcId",
                  onlyOne: true,
                  tableLabels: [
                    {
                      label: "compProcId",
                      name: "加工公司编号",
                    },
                    {
                      label: "compProcName",
                      name: "加工公司名称",
                    },
                  ],
                  labels: [
                    {
                      label: "compProcId",
                      name: "加工公司编号",
                    },
                    {
                      label: "compProcName",
                      name: "加工公司名称",
                    },
                  ],
                  default: () => [
                    {
                      compProcId: res.data.compProcId,
                      compProcName: res.data.compProcName,
                    },
                  ],
                  getTableData: (pageNumber, pageSize) => {
                    return this.$Http
                      .get({
                        url: "/production/compProcInfo",
                        data: {
                          startPage: pageNumber,
                          pageSize,
                        },
                      })
                      .then((res) => {
                        return Promise.resolve({
                          curPage: res.data.curPage,
                          totalPage: res.data.totalPage,
                          data: res.data.compProcInfo,
                        });
                      });
                  },
                },
              },
            ],
          };
        });
    },
    handleCloseDialog() {
      this.show = false;
    },
    onConfirm(formData) {
      this.$Http
        .post({
          url: "/production/updateEiReq",
          data: {
            compNumber: formData.compNumber,
            compName: formData.compName,
            compAddr: formData.compAddr,
            compTel: formData.compTel,
            compFields: formData.compFields,
            compProcId: formData.compProcInfo[0].compProcId,
          },
        })
        .then(() => {
          this.$message.success("成功提交申请");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.manage-com-info {
  padding: 20px;
  .company-container {
    border-radius: 4px;
    padding: 15px 30px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
    text-align: right;
    & > .title {
      color: white;
      text-align: center;
      font-weight: bold;
      font-size: 26px;
      margin-bottom: 30px;
    }
    .el-row {
      margin-bottom: 20px;
    }
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      text-align: left;
      color: white;
      &.block-value {
        flex-direction: column;
        align-items: center;
        padding: 10px 10px;
        border: 2px dotted white;
        border-radius: 10px;
        box-sizing: border-box;
        margin: 20px 0;
        width: 100%;
        & > label {
          text-align: center;
          margin-bottom: 10px;
        }
        & > .value {
          width: 100%;
        }
      }
      label {
        width: 40%;
        font-weight: bold;
      }
      & > .value {
        flex: 1;
        .el-select,
        .el-input-number,
        .el-date-editor {
          width: 100%;
        }
      }
    }
    .block {
      width: 100%;
      .content {
        background-color: rgba(0, 0, 0, 0.301);
        border-radius: 4px;
        padding: 10px;
        & + .content {
          margin-top: 4px;
        }
      }
      .item {
        margin: 6px 0;
        label {
          width: 50%;
        }
      }
    }
  }
}
</style>
