<template>
  <ScrollBar>
    <div class="product-info">
      <Breadcrumb
        :config="{
          data: { title: '企业信息管理', subTitle: '销售产品管理' },
        }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "AjugeComInfo",
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
