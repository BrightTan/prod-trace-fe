<template>
  <ScrollBar>
    <div class="product-info">
      <Breadcrumb
        :config="{ data: { title: '加工信息管理', subTitle: '产品加工信息' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ProductInfo",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.product-info {
  padding: 20px;
}
</style>
