<template>
  <happy-scroll :size="size" :color="color" resize>
    <div ref="resize-window-change">
      <slot></slot>
    </div>
  </happy-scroll>
</template>
<script>
function debounceResize(func, wait) {
  let add = false;
  let timer = null;
  return function(...params) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      timer = setTimeout(() => {
        func.call(this, ...params, add);
        clearTimeout(timer);
        timer = null;
        add = !add;
      }, wait);
      return;
    }
    timer = setTimeout(() => {
      func.call(this, ...params, add);
      clearTimeout(timer);
      timer = null;
      add = !add;
    }, wait);
  };
}

export default {
  name: "ScrollBar",
  props: {
    color: {
      type: String,
      default: "white"
    },
    size: {
      type: Number,
      default: 8
    },
    listenToWindowResize: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.listenToWindowResize &&
      window.addEventListener("resize", () =>
        this.resizeTheScrollBar(this.$refs["resize-window-change"])
      );
  },
  methods: {
    resizeTheScrollBar: debounceResize((dom, add) => {
      const height = window.getComputedStyle(dom).height;
      dom.style.height = add
        ? parseInt(height) - 1 + "px"
        : parseInt(height) + 1 + "px";
    }, 300)
  }
};
</script>
<style lang="scss" scoped>
.happy-scroll {
  & /deep/ .happy-scroll-content {
    width: 100% !important;
  }
  & /deep/ .happy-scroll-container {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
