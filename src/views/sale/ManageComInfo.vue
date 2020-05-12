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
          label: "compPrincipal",
          name: "企业负责人",
        },
      ],
      subLabels: {},
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
          url: "/sales/ei",
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
                type: "text",
                label: "企业负责人",
                variable: "compPrincipal",
                default: res.data.compPrincipal,
                check: {
                  type: "NOT_NULL",
                  message: "企业负责人不能为空哦！",
                },
                option: {
                  placeholder: "请输入企业负责人",
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
          url: "/sales/updateEiReq",
          data: {
            compNumber: formData.compNumber,
            compName: formData.compName,
            compAddr: formData.compAddr,
            compTel: formData.compTel,
            compPrincipal: formData.compPrincipal,
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
