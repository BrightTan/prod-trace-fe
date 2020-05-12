<template>
  <div class="process-block">
    <Dialog
      :config="dialogConfig"
      :readOnly="true"
      :show="showAddDialog"
      :onClose="handleCloseDialog"
    ></Dialog>
    <el-row :gutter="20">
      <el-col
        v-for="item in config"
        :key="item.productId"
        :xl="12"
        :lg="24"
        :md="24"
        :sm="24"
      >
        <div class="block">
          <h2>{{ item.techniqueName }}</h2>
          <div class="detail">
            <div class="seed-productions">
              <div
                class="production"
                v-for="data in item.raw"
                :key="data.productBatchNumber"
              >
                <div
                  class="img"
                  :style="{
                    background: `url('${data.picUrl}') center center / cover no-repeat`,
                  }"
                ></div>
                <div class="seed-info">
                  <li>
                    <label for="">种子成品名称：</label>
                    <span>{{ data.rawProductName }}</span>
                  </li>
                  <li>
                    <label for="">初级农产品批次编号：</label>
                    <span>{{ data.productBatchNumber }}</span>
                  </li>
                  <Button
                    type="blue"
                    style="padding-top:2px;padding-bottom:2px;"
                    :onClickButton="
                      () => {
                        onCheckDetail(data.productBatchNumber);
                      }
                    "
                    >查看详情</Button
                  >
                </div>
              </div>
            </div>
            <img :src="require('@/assets/kuohao.png')" alt="" />
            <div class="in-production">
              <li>
                <label for="">加工成品名称：</label>
                <span>{{ item.productName }}</span>
              </li>
              <li>
                <label for="">溯源码编号：</label>
                <span>{{ item.sourceNumber }}</span>
              </li>
              <li>
                <label for="">产品线编号：</label>
                <span>{{ item.productLineNumber }}</span>
              </li>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";
import Dialog from "@/components/common/dialog/Dialog.vue";

export default {
  name: "ProcessBlock",
  components: {
    Button,
    Dialog,
  },
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogConfig: {
        title: "原料详情",
        width: "400px",
        labelWidth: "120px",
        items: [],
      },
      showAddDialog: false,
    };
  },
  methods: {
    handleCloseDialog() {
      this.showAddDialog = false;
    },
    onCheckDetail(productBatchNumber) {
      this.$Http
        .get({
          url: "/processing/prodProductInfo",
          data: {
            startPage: 1,
            pageSize: 1000000,
          },
        })
        .then((res) => {
          const data = res.data.prodProductInfo.find((item) => {
            return item.productBatchNumber === productBatchNumber;
          });
          this.dialogConfig = {
            title: "原料详情",
            width: "500px",
            labelWidth: "150px",
            items: [
              {
                type: "text",
                label: "初级农产品批次编号",
                variable: "productBatchNumber",
                default: data.productBatchNumber,
              },
              {
                type: "text",
                label: "溯源码编号",
                variable: "sourceNumber",
                default: data.sourceNumber,
              },
              {
                type: "text",
                label: "种子成品名称",
                variable: "seedName",
                default: data.seedName,
              },
              {
                type: "text",
                label: "收割时间",
                variable: "reapTime",
                default: data.reapTime,
              },
              {
                type: "text",
                label: "施肥次数",
                variable: "fertilizerTime",
                default: data.fertilizerTime,
              },
              {
                type: "text",
                label: "农药播撒次数",
                variable: "pesticideTime",
                default: data.pesticideTime,
              },
            ],
          };
          this.showAddDialog = true;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.process-block {
  .block {
    background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
    margin-bottom: 20px;
    border-radius: 4px;
    li {
      list-style: none;
    }
    h2 {
      color: white;
      text-align: left;
      padding: 8px 15px 0 15px;
    }
    & > .detail {
      display: flex;
      justify-content: space-between;
      padding: 15px;
      .seed-productions {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        & > .production {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          height: 120px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & + .production {
            margin-top: 10px;
          }
          & > .img {
            width: 150px;
            height: 100%;
            border-radius: 4px;
          }
          & > .seed-info {
            flex: 1;
            margin-left: 10px;
            text-align: left;
            & > li {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              font-size: 14px;
              color: white;
              span {
                font-weight: bold;
              }
            }
            .el-button {
              margin-top: 5px;
            }
          }
        }
      }
      & > img {
        width: 40px;
        margin: 10px;
      }
      & > .in-production {
        flex: 1;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-self: center;
        padding: 20px;
        justify-content: center;
        label {
          display: inline-block;
          width: 120px;
          text-align: left;
        }
      }
    }
  }
}
</style>
