<template>
  <ScrollBar>
    <div class="admin-announce">
      <Breadcrumb
        :config="{ data: { title: '企业信息管理', subTitle: '公告管理' } }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "AdminAnnounce",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.admin-announce {
  padding: 20px;
}
</style>
