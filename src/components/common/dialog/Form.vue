<template>
  <div class="optional-block">
    <div class="content">
      <div class="data" v-for="(item, index) in data" :key="item[config.key]">
        <div
          class="item"
          v-for="dataItem in config.items"
          :key="dataItem.label"
        >
          <label>{{ `${dataItem.label}：` }}</label>
          <span>{{ item[dataItem.variable] }}</span>
        </div>
        <div
          class="close-button"
          @click="
            () => {
              onDeleteItem(index);
            }
          "
        >
          <img
            class="add-icon"
            :src="require('@/assets/close.svg')"
            alt="删除按钮"
          />
        </div>
      </div>
      <Button
        type="blue"
        style="width:100%;margin-top:10px"
        :onClickButton="onOpen"
      >
        <img
          class="add-icon"
          :src="require('@/assets/add.svg')"
          alt="添加按钮"
        /><span>添 加</span></Button
      >
    </div>
    <el-dialog
      :title="config.dialogTitle"
      :visible="show"
      :class="['lower-dialog', config.onlyOne ? 'onlyOne' : '']"
      :close-on-click-modal="false"
      style="visibility:visible"
      :width="config.dialogWidth"
      :before-close="onCloseDialog"
    >
      <div class="form-content">
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
        </div>
      </div>
      <span v-if="!readOnly" slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSave">保 存</el-button>
        <el-button @click="onCloseDialog">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";

const checkType = {
  NOT_NULL: "NOT_NULL",
  IS_EQUAL: "IS_EQUAL",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  NOT_ZERO: "NOT_ZERO",
};

export default {
  name: "Form",
  components: {
    Button,
  },
  props: {
    config: {
      type: Object,
      default: () => ({
        labelWidth: "100px",
        dialogTitle: "请填写表单",
        dialogWidth: "600px",
        key: "textExample",
        onlyOne: true,
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
      }),
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    onCloseFormDialog: {
      type: Function,
      default: () => {},
    },
    onOpenFormDialog: {
      type: Function,
      default: () => {},
    },
    onFormSave: {
      type: Function,
      default: () => {},
    },
    onDeleteItem: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    this.resetForm();
  },
  watch: {
    config() {
      this.resetForm();
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
      show: false,
    };
  },
  methods: {
    onOpen() {
      this.$props.onOpenFormDialog();
      this.show = true;
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
      this.$props.onFormSave(this.formData);
      this.onCloseDialog();
    },
    onCloseDialog() {
      this.resetForm();
      this.show = false;
      this.$props.onCloseFormDialog();
    },
    resetForm() {
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
.optional-block {
  .lower-dialog {
    z-index: 2000 !important;
  }
  .form-content {
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
  & > .content {
    border: 2px dotted rgb(255, 181, 71);
    border-radius: 10px;
    padding: 10px 5px;
    .add-icon {
      width: 20px;
      vertical-align: middle;
      margin-right: 10px;
      & + span {
        vertical-align: middle;
        line-height: 20px;
      }
    }
    & > .data {
      background: rgba(0, 0, 0, 0.5) url(../../../assets/dot_pattern.png) repeat;
      border-radius: 4px;
      padding: 10px;
      position: relative;
      cursor: pointer;
      & + .data {
        margin-top: 10px;
      }
      & > .item {
        color: white;
        & > label {
          font-weight: bold;
        }
      }
      &:hover {
        background: rgba(0, 0, 0, 0.7) url(../../../assets/dot_pattern.png)
          repeat;
        & > .item {
          color: rgb(153, 152, 152);
        }
        .close-button {
          display: block;
        }
      }
      .close-button {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        padding: 5px;
        border-top-right-radius: 4px;
        box-sizing: border-box;
        display: none;
        &:hover {
          background-color: red;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .footer-buttons {
    text-align: right;
  }
}
</style>
