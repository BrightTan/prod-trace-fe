<template>
  <div class="my-dialog">
    <el-dialog
      class="upper-dialog"
      :title="config.title"
      :visible="show"
      :style="{ visibility: showUpperDialog ? 'visible' : 'hidden' }"
      :close-on-click-modal="false"
      :width="config.width"
      :close-on-press-escape="!noClose"
      :show-close="!noClose"
      :before-close="onCloseDialog"
    >
      <div class="content">
        <div class="item" v-for="item in config.items" :key="item.variable">
          <label :style="{ width: config.labelWidth || '120px' }">{{
            `${item.label}：`
          }}</label>
          <div class="value" v-if="item.type === 'text'">
            <el-input
              :disabled="readOnly || item.disabled"
              v-model="formData[item.variable]"
              :placeholder="
                !item.option || item.option.placeholder === undefined
                  ? '请输入'
                  : item.option.placeholder
              "
            ></el-input>
          </div>
          <div class="value" v-if="item.type === 'computed'">
            <el-input disabled :value="item.computed(formData)"></el-input>
          </div>
          <div class="value" v-else-if="item.type === 'number'">
            <el-input-number
              :disabled="readOnly || item.disabled"
              :precision="
                !item.option || item.option.precision === undefined
                  ? 0
                  : item.option.precision
              "
              :step="1"
              v-model="formData[item.variable]"
              :min="
                !item.option || item.option.min === undefined
                  ? 0
                  : item.option.min
              "
              :max="
                !item.option || item.option.max === undefined
                  ? Infinity
                  : typeof item.option.max === 'function'
                  ? item.option.max(formData)
                  : item.option.max
              "
            ></el-input-number>
          </div>
          <div class="value" v-else-if="item.type === 'select'">
            <el-select
              :disabled="readOnly || item.disabled"
              v-model="formData[item.variable]"
              :placeholder="
                !item.option || item.option.placeholder === undefined
                  ? '请选择'
                  : item.option.placeholder
              "
              popper-class="my-dialog-popper"
            >
              <el-option
                v-for="option in otherData[item.optionVar]"
                :key="option[item.option.key]"
                :label="option[item.option.label]"
                :value="option[item.option.key]"
              >
              </el-option>
            </el-select>
          </div>
          <div class="value" v-else-if="item.type === 'switch'">
            <el-switch
              :disabled="readOnly || item.disabled"
              v-model="formData[item.variable]"
              :active-color="
                !item.option || item.option.activeColor === undefined
                  ? '#13ce66'
                  : item.option.activeColor
              "
              :inactive-color="
                !item.option || item.option.inactiveColor === undefined
                  ? '#ff4949'
                  : item.option.inactiveColor
              "
            >
            </el-switch>
          </div>
          <div class="value" v-else-if="item.type === 'timestamp'">
            <el-date-picker
              v-model="formData[item.variable]"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              :disabled="readOnly || item.disabled"
              popper-class="timestamp-picker"
              :placeholder="
                !item.option || item.option.placeholder === undefined
                  ? '请选择时间'
                  : item.option.placeholder
              "
            >
            </el-date-picker>
          </div>
          <div class="value" v-else-if="item.type === 'block'">
            <OptionalBlock
              :ref="`optionalBlock${item.variable}`"
              :config="item.dialogConfig"
              :data="formData[item.variable]"
              :onCloseTableDialog="onCloseLowerDialog"
              :onOpenTableDialog="onOpenLowerDialog"
              :onSelectSave="
                (data) => {
                  onSelectSave(item.variable, data);
                }
              "
            ></OptionalBlock>
          </div>
          <div class="value" v-else-if="item.type === 'form'">
            <Form
              :config="item.dialogConfig"
              :data="formData[item.variable]"
              :onCloseFormDialog="onCloseLowerDialog"
              :onOpenFormDialog="onOpenLowerDialog"
              :onDeleteItem="
                (index) => {
                  onDeleteItem(item.variable, index);
                }
              "
              :onFormSave="
                (data) => {
                  onFormSave(item.variable, data);
                }
              "
            ></Form>
          </div>
        </div>
      </div>
      <span v-if="!readOnly" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSave">保 存</el-button>
        <el-button v-if="!noClose" @click="onCloseDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import OptionalBlock from "./OptionalBlock.vue";
import Form from "@/components/common/dialog/Form.vue";

const checkType = {
  NOT_NULL: "NOT_NULL",
  IS_EQUAL: "IS_EQUAL",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  NOT_ZERO: "NOT_ZERO",
};

export default {
  name: "MyDialog",
  components: {
    OptionalBlock,
    Form,
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        title: "新增加工工艺",
        width: "30%",
        labelWidth: "120px",
        items: [
          {
            type: "text",
            label: "文本示例",
            variable: "textExample",
            default: "这是一段文本",
            disabled: false,
            check: {
              type: "NOT_NULL",
              message: "文本输入不能为空哦！",
            },
            option: {
              placeholder: "请输入文本",
            },
          },
          {
            type: "computed",
            label: "计算属性示例",
            variable: "computedExample",
            computed: (formData) => {
              if (formData && formData.textExample !== undefined) {
                return "上一个输入框的内容：" + formData.textExample;
              } else {
                return "";
              }
            },
          },
          {
            type: "number",
            label: "整数示例",
            variable: "numberExample",
            disabled: false,
            default: 0,
            option: {
              precision: 0,
              min: 0,
              max: Infinity,
            },
          },
          {
            type: "select",
            label: "下拉选择",
            disabled: false,
            variable: "selectExample",
            optionVar: "selectOption",
            default: "",
            selectOptions: () => [],
            getSelectData: () => {
              return Promise.resolve([
                {
                  id: "1",
                  value: "选项一",
                },
                {
                  id: "2",
                  value: "选项二",
                },
              ]);
            },
            option: {
              placeholder: "请选择一个",
              label: "value",
              key: "id",
            },
          },
          {
            type: "switch",
            label: "布尔值选择",
            variable: "Boolean选择",
            default: true,
            disabled: false,
            option: {
              activeColor: "red",
              inactiveColor: "black",
            },
          },
          {
            type: "timestamp",
            label: "时间戳示例：",
            variable: "timestamp",
            disabled: false,
            default: "",
            option: {
              placeholder: "请选择时间",
            },
          },
          {
            type: "block",
            label: "灵活配置块",
            variable: "blockExample",
            dialogConfig: {
              labelWidth: "100px",
              dialogTitle: "请选择",
              dialogWidth: "600px",
              key: "label1",
              // onlyOne: true,
              tableLabels: [
                {
                  label: "label1",
                  name: "示例标签1",
                },
                {
                  label: "label2",
                  name: "示例标签2",
                },
                {
                  label: "label3",
                  name: "示例标签3",
                },
              ],
              labels: [
                {
                  label: "label1",
                  name: "示例标签1",
                },
                {
                  label: "label2",
                  name: "示例标签2",
                },
              ],
              default: () => [
                {
                  label1: "1111",
                  label2: "sdfsdfsdfsdfwefwgwe",
                  label3: "sdfsdfsdfsdfwefwgwe",
                },
                {
                  label1: "111",
                  label2: "sdfsdfsdfsdfwefwgwe",
                  label3: "sdfsdfsdfsdfwefwgwe",
                },
                {
                  label1: "4444",
                  label2: "sdfsdfsdfsdfwefwgwe",
                  label3: "sdfsdfsdfsdfwefwgwe",
                },
              ],
              getTableData: () => {
                //请求参数pageNumber, pageSize
                return Promise.resolve({
                  curPage: 1,
                  totalPage: 102,
                  data: [
                    {
                      label1: "111",
                      label2: "222",
                      label3: "333",
                    },
                    {
                      label1: "1111",
                      label2: "2222",
                      label3: "3333",
                    },
                    {
                      label1: "11111111",
                      label2: "22222222",
                      label3: "33333333",
                    },
                    {
                      label1: "4444",
                      label2: "5555",
                      label3: "6666",
                    },
                    {
                      label1: "777777",
                      label2: "888888",
                      label3: "999999",
                    },
                  ],
                });
              },
            },
            option: {},
          },
          {
            type: "form",
            label: "复合表单",
            variable: "formExample",
            dialogConfig: {
              labelWidth: "100px",
              dialogTitle: "请填写表单",
              dialogWidth: "600px",
              key: "textExample",
              items: [
                {
                  type: "text",
                  label: "文本示例",
                  variable: "textExample",
                  default: "",
                  disabled: false,
                  check: {
                    type: "NOT_NULL",
                    message: "文本输入不能为空哦！",
                  },
                  option: {
                    placeholder: "请输入文本",
                  },
                },
                {
                  type: "number",
                  label: "整数示例",
                  variable: "numberExample",
                  disabled: false,
                  default: 0,
                  option: {
                    precision: 0,
                    min: 0,
                    max: Infinity,
                  },
                },
                {
                  type: "select",
                  label: "下拉选择",
                  disabled: false,
                  variable: "selectExample",
                  optionVar: "selectOption",
                  default: "",
                  selectOptions: () => [],
                  getSelectData: () => {
                    return Promise.resolve([
                      {
                        id: "1",
                        value: "选项一",
                      },
                      {
                        id: "2",
                        value: "选项二",
                      },
                    ]);
                  },
                  option: {
                    placeholder: "请选择一个",
                    label: "value",
                    key: "id",
                  },
                },
                {
                  type: "switch",
                  label: "布尔值选择",
                  variable: "BooleanExample",
                  default: true,
                  disabled: false,
                  option: {
                    activeColor: "red",
                    inactiveColor: "black",
                  },
                },
                {
                  type: "timestamp",
                  label: "时间戳示例：",
                  variable: "timestamp",
                  disabled: false,
                  default: "",
                  option: {
                    placeholder: "请选择时间",
                  },
                },
              ],
              default: () => [
                {
                  textExample: "1111",
                  numberExample: 23,
                  selectExample: "sdfdf",
                  BooleanExample: true,
                  timestamp: "2019-11-12 12:42:59",
                },
                {
                  textExample: "1111",
                  numberExample: 23,
                  selectExample: "sdfdf",
                  BooleanExample: true,
                  timestamp: "2019-11-12 12:42:59",
                },
              ],
            },
          },
        ],
      }),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    noClose: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    this.resetData();
  },
  watch: {
    config() {
      this.resetData();
    },
    show(newV) {
      if (newV === true) {
        this.$props.config.items.forEach((item) => {
          if (item.type === "select" && item.getSelectData) {
            item.getSelectData().then((data) => {
              this.otherData[item.optionVar] = data;
            });
          }
        });
      }
    },
  },
  data() {
    return {
      formData: {},
      otherData: {},
      showUpperDialog: true,
    };
  },
  methods: {
    onOpenLowerDialog() {
      this.showUpperDialog = false;
    },
    onCloseLowerDialog() {
      this.showUpperDialog = true;
    },
    onSelectSave(key, data) {
      this.formData[key] = data;
    },
    onFormSave(key, data) {
      this.formData[key] = [...this.formData[key], data];
    },
    onDeleteItem(key, index) {
      this.formData[key] = this.formData[key].filter((data, arrIndex) => {
        return arrIndex !== index;
      });
    },
    resetData() {
      const formData = {};
      let optionVarValue = undefined;
      let optionVar = undefined;
      this.$props.config.items.forEach((item) => {
        if (item.dialogConfig) {
          formData[item.variable] = item.dialogConfig.default();
          const blockRef = this.$refs[`optionalBlock${item.variable}`];
          blockRef &&
            blockRef[0] &&
            blockRef[0].toSyncData(item.dialogConfig.default());
        } else if (item.default instanceof Function) {
          formData[item.variable] = item.default();
        } else if (item.computed instanceof Function) {
          //动态计算值不单独保存
        } else {
          formData[item.variable] = item.default;
        }
        if (item.selectOptions) {
          optionVarValue = item.selectOptions();
          optionVar = item.optionVar;
        }
      });
      this.formData = Object.assign({}, this.formData, formData);
      optionVar && this.$set(this.otherData, optionVar, optionVarValue);
    },
    onCloseDialog() {
      this.resetData();
      this.onClose();
    },
    onSave() {
      let checkProblem = false;
      this.$props.config.items.find((item) => {
        if (item.check) {
          !this.checkInputs(
            item.check.type,
            [this.formData[item.variable]],
            item.check.message
          ) && (checkProblem = true);
          return checkProblem;
        }
        return false;
      });
      if (checkProblem) {
        return;
      }
      this.$props.onConfirm(this.formData);
      this.onCloseDialog();
    },
    checkInputs(checkRuled, data, message) {
      let res = true;
      switch (checkRuled) {
        case checkType.NOT_NULL:
          data[0] === "" && (res = false);
          break;
        case checkType.IS_EQUAL:
          data[0] !== data[1] && (res = false);
          break;
        case checkType.NOT_ZERO:
          data[0].length === 0 && (res = false);
          break;
        case checkType.EMAIL:
          !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.exec(data[0]) &&
            (res = false);
          break;
        case checkType.PHONE:
          !/^1[3456789]\d{9}$/.exec(data[0]) && (res = false);
          break;
      }
      !res && this.$message.error(message);
      return res;
    },
  },
};
</script>
<style lang="scss" scoped>
.my-dialog {
  .upper-dialog {
    z-index: 3010 !important;
    & /deep/ .el-dialog {
      margin-top: 10vh !important;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 0 10px;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      & > .value {
        flex: 1;
        .el-select,
        .el-input-number,
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss" global>
.my-dialog-popper,
.timestamp-picker {
  z-index: 3100 !important;
}
.el-message {
  z-index: 4000 !important;
}
</style>
