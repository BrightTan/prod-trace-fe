<template>
  <div :class="{ breadcrumb: true, 'title-only': !config.data.subTitle }">
    <i :class="[!config.logo && 'el-icon-picture-outline-round']"></i>
    <div>{{ config.data.title }}</div>
    <div v-if="config.data.subTitle" class="sub-title">
      {{ config.data.subTitle }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    config: {
      type: Object,
      default: () => ({
        logo: "el-icon-picture-outline-round",
        data: {
          title: "",
          subTitle: "",
        },
      }),
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  height: 52px;
  & > i {
    font-size: 50px;
    color: rgba(255, 255, 255, 0.5);
  }
  &.title-only > div:nth-child(2)::after {
    display: none;
  }
  & > div {
    &:nth-child(2) {
      font-size: 32px;
      line-height: 1em;
      display: flex;
      align-items: center;
      margin-left: 10px;
      color: rgba(255, 255, 255, 0.8);
      &::after {
        display: inline-block;
        line-height: 32px;
        content: " ";
        width: 50px;
        height: 2px;
        margin: 0 -8px 0 -5px;
        background-color: white;
        transform: rotateZ(-54deg) translateY(4px);
      }
    }
    &.sub-title {
      font-size: 18px;
      margin-top: 12px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
}
</style>
