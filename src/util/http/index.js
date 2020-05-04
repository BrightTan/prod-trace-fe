import Vue from "vue";
import axios from "axios";
import { Http } from "./core/http";

let httpIns;

/**
 * 创建Http请求实例，并绑定在vue实例上
 * @param {String} baseUrl 请求的根路径
 * @param {Object} message element-ui的提示模块
 * @param {Function} authFailHandler 无登陆态请求回调
 */
function createHttpInstance(baseUrl, message, authFailHandler) {
  if (httpIns) {
    return httpIns;
  }
  axios.defaults.baseURL = baseUrl;
  httpIns = new Http();
  authFailHandler && httpIns.useAuthFailHandler(authFailHandler);
  httpIns.useMessage(message);
  /**
   * @type {Http} httpIns
   */
  Vue.prototype.$Http = httpIns;
  return httpIns;
}

export default createHttpInstance;
