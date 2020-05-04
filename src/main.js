import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import registUI from "@/registUI";
import registHttp from "@/util/http";
import "vue-happy-scroll/docs/happy-scroll.css";

//按需加载element组件样式
registUI();

//引入Http请求模块
registHttp("/", Vue.prototype.$message, () => {
  router.replace("/login");
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
