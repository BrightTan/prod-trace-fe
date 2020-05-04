<template>
  <ScrollBar>
    <div class="build-qr-code">
      <Breadcrumb
        :config="{
          data: { title: '销售信息管理', subTitle: '生成最终溯源码' },
        }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "BuildQRCode",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.build-qr-code {
  padding: 20px;
}
</style>
