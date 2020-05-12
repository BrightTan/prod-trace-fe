<template>
  <div class="comp-modify-block">
    <el-row :gutter="20">
      <el-col
        :xl="24"
        :lg="24"
        :md="24"
        :sm="24"
        class="block"
        v-for="compInfo in values"
        :key="compInfo.oldData.compNumber"
      >
        <div class="block-detail">
          <div class="title">
            {{ compInfo.oldData.compName + "的企业资料修改申请" }}
          </div>
          <div class="info">
            <div class="company-container">
              <div class="title">旧资料</div>
              <div
                v-for="label in compInfo.labels"
                :key="label.label"
                :class="
                  `item ${
                    typeof compInfo.oldData[label.label] === 'object'
                      ? 'block-value'
                      : ''
                  }`
                "
              >
                <label>{{
                  label.name +
                    (typeof compInfo.oldData[label.label] === "object"
                      ? ""
                      : "：")
                }}</label>
                <div
                  v-if="typeof compInfo.oldData[label.label] === 'object'"
                  class="value"
                >
                  <div class="block">
                    <div
                      class="content"
                      v-for="(item, index) in compInfo.oldData[label.label]"
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
                  {{ compInfo.oldData[label.label] }}
                </div>
              </div>
            </div>
            <div class="kuohao">
              <img :src="require('@/assets/kuohao.png')" alt="" />
            </div>
            <div class="company-container">
              <div class="title">新资料</div>
              <div
                v-for="label in compInfo.labels"
                :key="label.label"
                :class="
                  `item ${
                    typeof compInfo.newData[label.label] === 'object'
                      ? 'block-value'
                      : ''
                  }`
                "
              >
                <label>{{
                  label.name +
                    (typeof compInfo.newData[label.label] === "object"
                      ? ""
                      : "：")
                }}</label>
                <div
                  v-if="typeof compInfo.newData[label.label] === 'object'"
                  class="value"
                >
                  <div class="block">
                    <div
                      class="content"
                      v-for="(item, index) in compInfo.newData[label.label]"
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
                  {{ compInfo.newData[label.label] }}
                </div>
              </div>
            </div>
          </div>
          <div class="buttons">
            <Button
              type="blue"
              style="margin-top: 20px"
              :onClickButton="
                () => {
                  onClickPass(compInfo.oldData.compNumber, compInfo.type);
                }
              "
              >审核通过</Button
            >
            <Button
              type="dark"
              style="margin-top: 20px"
              :onClickButton="
                () => {
                  onClickReject(compInfo.oldData.compNumber, compInfo.type);
                }
              "
              >驳回</Button
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
  name: "CompInfoModify",
  components: {
    Button,
  },
  data() {
    return {
      subLabels: {
        fieldId: "田块编号",
        saltAlkali: "田块盐碱度",
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
          url: "admin/auditPass",
          data: {
            compNumber,
            passCode: 1,
            category: type,
          },
        })
        .then(() => {
          this.$props.onOperation();
          this.$message.success("通过审核成功");
        });
    },
    onClickReject(compNumber, type) {
      this.$Http
        .post({
          url: "admin/auditPass",
          data: {
            compNumber,
            passCode: -1,
            category: type,
          },
        })
        .then(() => {
          this.$props.onOperation();
          this.$message.success("驳回成功");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.comp-modify-block {
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
