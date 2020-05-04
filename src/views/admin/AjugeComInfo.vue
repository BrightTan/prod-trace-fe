<template>
  <ScrollBar>
    <div class="ajuge-com-info">
      <Breadcrumb
        :config="{
          data: { title: '企业信息管理', subTitle: '企业信息更改审核' },
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
.ajuge-com-info {
  padding: 20px;
}
</style>
