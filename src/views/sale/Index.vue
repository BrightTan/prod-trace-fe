<template>
  <ScrollBar>
    <div class="sale-index">
      <Breadcrumb :config="{ data: { title: '首页数据统计' } }"></Breadcrumb>
      <el-row :gutter="30" class="cards">
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="已售订单总数"
            :number="3650"
            :customStyle="{ 'background-color': '#d9544f' }"
          ></RotateBlock>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="售卖中订单总数"
            :number="50"
            :customStyle="{ 'background-color': '#418bca' }"
          ></RotateBlock>
        </el-col>
        <el-col :xl="8" :lg="8" :md="8" :sm="24"
          ><RotateBlock
            title="已售罄产品批数"
            :number="5"
            :customStyle="{ 'background-color': '#16a085' }"
          ></RotateBlock>
        </el-col>
      </el-row>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
import RotateBlock from "@/components/common/RotateBlock.vue";
export default {
  name: "SaleIndex",
  components: {
    Breadcrumb,
    ScrollBar,
    RotateBlock,
  }
};
</script>
<style lang="scss" scoped>
.sale-index {
  padding: 20px;
  .cards {
    margin-top: 20px;
  }
}
</style>
