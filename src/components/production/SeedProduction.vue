<template>
  <div class="seed-production">
    <el-row :gutter="20">
      <el-col
        v-for="item in config"
        :key="item.productionId"
        :xl="8"
        :lg="12"
        :md="24"
        :sm="24"
      >
        <div class="seed-block">
          <div class="top">
            <div
              class="img"
              :style="{
                background: `url('${item.picUrl}') center center / cover no-repeat`,
              }"
            ></div>
            <div class="detail">
              <li>
                <div class="lable">溯源码编号</div>
                <span>{{ item.productionId }}</span>
              </li>
              <li>
                <div class="lable">种子名称</div>
                <span>{{ item.seedName }}</span>
              </li>
              <li>
                <div class="lable">施肥次数</div>
                <span>{{ item.fertilizerTime }}</span>
              </li>
              <li>
                <div class="lable">农药播撒数</div>
                <span>{{ item.pesticidePlantTime }}</span>
              </li>
            </div>
          </div>
          <div class="detail">
            <li>
              <div class="lable">所属田块</div>
              <span>{{ item.fieldName }}</span>
            </li>
            <li>
              <div class="lable">初级农产品批次编号</div>
              <span>{{ item.productionBatchNumber }}</span>
            </li>
            <li>
              <div class="lable">收割时间</div>
              <span>{{ item.reapTime }}</span>
            </li>
          </div>
          <div class="buttons">
            <Button type="blue" style="">修 改</Button>
            <Button type="red">删 除</Button>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-if="config.length === 0" class="no-data">暂 无 数 据</div>
  </div>
</template>
<script>
import Button from "@/components/common/Button.vue";
export default {
  name: "SeedProduction",
  components: {
    Button,
  },
  props: {
    config: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="scss" scoped>
.seed-production {
  padding: 20px;
  .seed-block {
    width: 100%;
    margin-bottom: 20px;
    border-radius: 4px;
    padding: 20px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.3) url(../../assets/dot_pattern.png) repeat;
    li {
      display: flex;
      list-style: none;
      background-color: rgba(0, 0, 0, 0.3);
      color: white;
      padding: 6px;
      border-radius: 4px;
      margin: 5px 0px 5px 20px;
      justify-content: space-between;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
    .top {
      display: flex;
      align-items: center;
      height: 160px;
      .img {
        width: 200px;
        height: 100%;
        border-radius: 4px;
      }
      .detail {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    & > .detail {
      margin: 12px 0;
      li + li {
        margin-top: 10px;
      }
      li {
        margin-left: 0;
      }
    }
    .buttons {
      text-align: right;
    }
  }
  .no-data {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
}
</style>
