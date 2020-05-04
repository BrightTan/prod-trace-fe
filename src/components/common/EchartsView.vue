<template>
  <div
    ref="echartDom"
    :data="echartsConfig.dataset.source.toString() + this.loading"
    class="graph-view"
  ></div>
</template>

<script>
import { throttleKeepLast } from "@/util/utilFunctions";
import echarts, { EChartOption } from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/dataset";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/axisPointer";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

export default {
  name: "EchartsView",
  props: {
    echartsConfig: {
      type: EChartOption,
      default: () => ({})
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      echartIns: undefined,
      resetOptions: throttleKeepLast(instance => {
        instance && instance.resize();
      }, 1000)
    };
  },
  created() {
    window.addEventListener("resize", () => {
      this.resetOptions(this.echartIns);
    });
  },
  mounted() {
    this.echartIns = echarts.init(this.$refs.echartDom);
    this.echartIns.setOption(this.echartsConfig);
    this.loading &&
      this.echartIns.showLoading("default", {
        text: "加载中",
        color: "#28B4EF",
        textColor: "white",
        maskColor: "rgba(0, 0, 0, 0.8)"
      });
  },
  updated() {
    this.echartIns.setOption(this.echartsConfig);
    this.loading &&
      this.echartIns.showLoading("default", {
        text: "加载中",
        color: "#28B4EF",
        textColor: "white",
        maskColor: "rgba(0, 0, 0, 0.8)"
      });
    !this.loading && this.echartIns.hideLoading();
  }
};
</script>
<style lang="scss" scoped>
.graph-view {
  height: 100%;
}
</style>
