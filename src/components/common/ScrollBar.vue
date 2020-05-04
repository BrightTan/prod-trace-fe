<template>
  <happy-scroll :size="size" :color="color" resize>
    <div ref="resize-window-change">
      <slot></slot>
    </div>
  </happy-scroll>
</template>
<script>
import { debounce } from "@/util/utilFunctions";

/**
 * 记住调整scrollbar的内容区域，保证循环地增减内容区域高度，配合vue-happy-scroll插件完成滑动条对window.resize的监听
 * @function ajustResize
 * @param {function} func 需要记住调用状态的函数
 * @return {function} 返回的记住状态的函数，该函数调用过程中会在最后一个参数传入上次是增加高度还是减小高度
 */
function ajustResize(func) {
  let add = false;
  return function(...params) {
    func.call(this, ...params, add);
  };
}

const addWindowResizeListener = (() => {
  const ListenerQueue = []; //监听器队列
  let windowResizeListener = undefined; //负责调用监听器的监听事件
  function adder(func) {
    //处理后需要返回的工具函数
    if (ListenerQueue.find(item => item === func)) {
      return;
    }
    ListenerQueue.push(func);
    ListenerQueue.length > 0 &&
      window.removeEventListener("resize", windowResizeListener);
    windowResizeListener = debounce(() => {
      ListenerQueue.forEach(funcItem => {
        funcItem();
      });
    }, 300);
    window.addEventListener("resize", windowResizeListener);
  }
  //移除监听器
  adder.removeListener = function(funcToRemove) {
    const removeListenerIndex = ListenerQueue.findIndex(listener => {
      return listener === funcToRemove;
    });
    if (removeListenerIndex === -1) {
      return;
    } else {
      ListenerQueue.splice(removeListenerIndex, 1);
      window.removeEventListener("resize", windowResizeListener);
      if (ListenerQueue.length === 0) {
        windowResizeListener = undefined;
      } else {
        windowResizeListener = debounce(() => {
          ListenerQueue.forEach(funcItem => {
            funcItem();
          });
        }, 300);
        window.addEventListener("resize", windowResizeListener);
      }
    }
  };
  return adder;
})();

export default {
  name: "ScrollBar",
  props: {
    color: {
      type: String,
      default: "rgba(0,0,0,0.4)"
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
  data() {
    return {
      //1px来回调整内容区域
      resizeTheScrollBar: ajustResize((dom, add) => {
        const height = window.getComputedStyle(dom).height;
        dom.style.height = add
          ? parseInt(height) - 1 + "px"
          : parseInt(height) + 1 + "px";
      }, 300)
    };
  },
  mounted() {
    //初始化监听window.resize变化
    this.listenToWindowResize &&
      addWindowResizeListener(this.windowResizeListener);
  },
  methods: {
    //window.rezize事件监听器
    windowResizeListener() {
      this.resizeTheScrollBar(this.$refs["resize-window-change"]);
    }
  },
  beforeDestroy() {
    addWindowResizeListener.removeListener(this.windowResizeListener);
  }
};
</script>
<style lang="scss" scoped>
.happy-scroll {
  & /deep/ .happy-scroll-content {
    width: 100% !important;
    border: none !important;
    display: block;
  }
  & /deep/ .happy-scroll-container {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
