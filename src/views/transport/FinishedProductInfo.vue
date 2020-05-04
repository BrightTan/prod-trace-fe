<template>
  <ScrollBar>
    <div class="finishedProductInfo">
      <Breadcrumb
        :config="{
          data: { title: '运输信息管理', subTitle: '已完成产品信息' }
        }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "FinishedProductInfo",
  components: {
    Breadcrumb,
    ScrollBar
  }
};
</script>
<style lang="scss" scoped>
.finishedProductInfo {
  padding: 20px;
}
</style>
