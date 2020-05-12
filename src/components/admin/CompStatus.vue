<template>
  <div class="comp-status">
    <el-row :gutter="20">
      <el-col
        :xl="24"
        :lg="24"
        :md="24"
        :sm="24"
        class="block"
        v-for="compInfo in values"
        :key="compInfo.compNumber"
      >
        <div class="block-detail">
          <div class="title">
            {{
              `${compInfo.compName} （${
                compInfo.status === 1 ? "正常" : "冻结"
              }）`
            }}
          </div>
          <div class="info">
            <div class="company-container">
              <div
                v-for="label in compInfo.labels"
                :key="label.label"
                :class="
                  `item ${
                    typeof compInfo[label.label] === 'object'
                      ? 'block-value'
                      : ''
                  }`
                "
              >
                <label>{{
                  label.name +
                    (typeof compInfo[label.label] === "object" ? "" : "：")
                }}</label>
                <div
                  v-if="typeof compInfo[label.label] === 'object'"
                  class="value"
                >
                  <div class="block">
                    <div
                      class="content"
                      v-for="(item, index) in compInfo[label.label]"
                      :key="index"
                    >
                      <div
                        class="item"
                        v-for="key in Object.keys(item)"
                        :key="key"
                      >
                        <label>{{ subLabels[key] }}：</label>
                        <div class="value">{{ item[key] }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="value">
                  {{ compInfo[label.label] }}
                </div>
              </div>
            </div>
          </div>
          <div class="buttons">
            <Button
              v-if="compInfo.status === 0"
              type="green"
              style="margin-top: 20px"
              :onClickButton="
                () => {
                  onClickPass(compInfo.compNumber, compInfo.type);
                }
              "
              >解冻</Button
            >
            <Button
              v-else
              type="blue"
              style="margin-top: 20px"
              :onClickButton="
                () => {
                  onClickReject(compInfo.compNumber, compInfo.type);
                }
              "
              >冻结账户</Button
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";
export default {
  name: "CompStatus",
  components: {
    Button,
  },
  data() {
    return {
      subLabels: {
        fieldId: "田块编号",
        saleAlkali: "田块盐碱度",
        fieldAddr: "田块位置",
        plantNum: "种植次数",
        productLineNumber: "生产线编号",
        productLineName: "生产线名称",
        principal: "生产线负责人",
      },
    };
  },
  props: {
    values: {
      type: Array,
      default: () => [],
    },
    onOperation: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onClickPass(compNumber, type) {
      this.$Http
        .post({
          url: "admin/setComStatus",
          data: {
            compNumber,
            status: 1,
            category: type,
          },
        })
        .then(() => {
          this.$props.onOperation();
          this.$message.success("解冻账户成功");
        });
    },
    onClickReject(compNumber, type) {
      this.$Http
        .post({
          url: "admin/auditPass",
          data: {
            compNumber,
            status: 0,
            category: type,
          },
        })
        .then(() => {
          this.$props.onOperation();
          this.$message.success("冻结账户成功");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.comp-status {
  .block {
    & > .block-detail {
      background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
      padding: 20px;
      margin-top: 20px;
      border-radius: 4px;
      & > .title {
        color: white;
        text-align: left;
        font-size: 26px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      & > .info {
        display: flex;
        align-items: center;
      }
      & > .buttons {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .company-container {
    border-radius: 4px;
    padding: 15px 30px;
    background: rgba(0, 0, 0, 0.2);
    text-align: right;
    display: flex;
    flex-direction: column;
    flex: 1;
    & > .title {
      color: white;
      text-align: center;
      font-size: 20px;
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
  .kuohao {
    margin: 20px 20px;
    padding: 15px 0px;
    align-self: stretch;
    display: flex;
    align-items: center;
    img {
      width: 60px;
      height: 100%;
    }
  }
}
</style>
