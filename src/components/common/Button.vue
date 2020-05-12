<template>
  <el-button
    type="primary"
    :class="[type, disabled ? 'disabled' : '']"
    @click="onclick"
    ><slot></slot
  ></el-button>
</template>
<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "blue",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onClickButton: {
      type: Function,
      default: () => {},
    },
  },
  methods: {
    onclick() {
      if (this.$props.disabled) {
        return;
      }
      this.$props.onClickButton();
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
  &.disabled {
    background-color: #14937a;
    border-color: #14937a;
    color: #a9f7e7;
    &:hover {
      background-color: #14937a;
      border-color: #14937a;
      color: #a9f7e7;
    }
    &:active {
      border-color: #14937a !important;
    }
    cursor: not-allowed;
  }
  &.blue {
    background-color: #409eff;
    border-color: #409eff;
    color: #f2f2f2;
    &.disabled {
      background-color: #3284db;
      border-color: #3284db;
      color: #aed0f3;
      &:hover {
        background-color: #3284db;
        border-color: #3284db;
        color: #aed0f3;
      }
      &:active {
        border-color: #3284db !important;
      }
    }
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
    &.disabled {
      background-color: #14937a;
      border-color: #14937a;
      color: #a1f1e1;
      &:hover {
        background-color: #14937a;
        border-color: #14937a;
        color: #a1f1e1;
      }
      &:active {
        border-color: #1ccdaa !important;
      }
    }
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
    &.disabled {
      background-color: #ff4f48;
      border-color: #ff4f48;
      color: #ffd6d5;
      &:hover {
        background-color: #ff4f48;
        border-color: #ff4f48;
        color: #ffd6d5;
      }
      &:active {
        border-color: #ff4f48 !important;
      }
    }
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
    &.disabled {
      background-color: #394759;
      border-color: #394759;
      color: #c7c7c7;
      &:hover {
        background-color: #394759;
        border-color: #394759;
        color: #c7c7c7;
      }
      &:active {
        border-color: #394759 !important;
      }
    }
    &:hover {
      background-color: #394759;
      border-color: #394759;
      color: white;
    }
  }
}
</style>
