<template>
  <ScrollBar>
    <div class="com-report">
      <Breadcrumb
        :config="{
          data: { title: '消费者反馈', subTitle: '企业举报信息处理' },
        }"
      ></Breadcrumb>
    </div>
  </ScrollBar>
</template>

<script>
import Breadcrumb from "@/components/common/Breadcrumb.vue";
import ScrollBar from "@/components/common/ScrollBar.vue";
export default {
  name: "ComReport",
  components: {
    Breadcrumb,
    ScrollBar,
  },
};
</script>
<style lang="scss" scoped>
.com-report {
  padding: 20px;
}
</style>
