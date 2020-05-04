<template>
  <ScrollBar>
    <div class="transport-product-info">
      <Breadcrumb
        :config="{ data: { title: '运输信息管理', subTitle: '产品运输信息' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "TransportProductInfo",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.transport-product-info {
  padding: 20px;
}
</style>
