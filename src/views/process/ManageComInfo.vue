<template>
  <ScrollBar>
    <div class="manage-com-info">
      <Breadcrumb
        :config="{ data: { title: '用户信息管理', subTitle: '企业信息管理' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ManageComInfo",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.manage-com-info {
  padding: 20px;
}
</style>
