<template>
  <ScrollBar>
    <div class="com-manage">
      <Breadcrumb
        :config="{
          data: { title: '企业信息管理', subTitle: '企业管理' },
        }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ComManage",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.com-manage {
  padding: 20px;
}
</style>
