<template>
  <ScrollBar>
    <div class="finish-sale">
      <Breadcrumb
        :config="{ data: { title: '销售信息管理', subTitle: '完成产品销售' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "FinishSale",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.finish-sale {
  padding: 20px;
}
</style>
