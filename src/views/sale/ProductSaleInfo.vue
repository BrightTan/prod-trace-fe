<template>
  <ScrollBar>
    <div class="product-sale-info">
      <Breadcrumb
        :config="{ data: { title: '销售信息管理', subTitle: '产品销售信息' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ProductSaleInfo",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.product-sale-info {
  padding: 20px;
}
</style>
