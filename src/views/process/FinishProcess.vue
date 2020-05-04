<template>
  <ScrollBar>
    <div class="finish-process">
      <Breadcrumb
        :config="{ data: { title: '加工信息管理', subTitle: '完成产品加工' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "FinishProcess",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.finish-process {
  padding: 20px;
}
</style>
