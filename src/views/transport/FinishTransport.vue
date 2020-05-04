<template>
  <ScrollBar>
    <div class="finish-transport">
      <Breadcrumb
        :config="{ data: { title: '运输信息管理', subTitle: '完成运输工作' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "FinishTransport",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.finish-transport {
  padding: 20px;
}
</style>
