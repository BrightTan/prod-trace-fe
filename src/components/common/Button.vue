<template>
  <el-button type="primary" :class="[type]" @click="onClickButton"><slot></slot></el-button>
</template>
<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "blue",
    },
    onClickButton: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.el-button {
  padding: 6px 12px;
  line-height: 1.42857143;
  background-color: #1ccdaa;
  border-color: #1ccdaa;
  color: #f2f2f2;
  &:hover {
    background-color: #14937a;
    border-color: #14937a;
    color: white;
  }
  &:active {
    border-color: white !important;
  }
  &.blue {
    background-color: #409eff;
    border-color: #409eff;
    color: #f2f2f2;
    &:hover {
      background-color: #3284db;
      border-color: #3284db;
      color: white;
    }
  }
  &.green {
    background-color: #1ccdaa;
    border-color: #1ccdaa;
    color: #f2f2f2;
    &:hover {
      background-color: #14937a;
      border-color: #14937a;
      color: white;
    }
  }
  &.red {
    background-color: #ff7b76;
    border-color: #ff7b76;
    color: #f2f2f2;
    &:hover {
      background-color: #ff4f48;
      border-color: #ff4f48;
      color: white;
    }
  }
  &.dark {
    background-color: #536781;
    border-color: #536781;
    color: #f2f2f2;
    &:hover {
      background-color: #394759;
      border-color: #394759;
      color: white;
    }
  }
}
</style>
