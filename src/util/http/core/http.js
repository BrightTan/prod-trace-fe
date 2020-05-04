import axios from "axios";
import { dispatchRequest } from "./dispatchRequest";

/**
 * @class Http
 * @property {Object} defaults axios默认配置
 * @property {Object} interceptors 与axios请求拦截器相同
 * @property {Function} authFailCallBack 无登录态的时候回调函数
 * @property {Object} message element-ui提示模块
 * @property {Function} useAuthFailHandler 配置无登陆态的回调函数
 * @property {Function} useMessage 配置element提示模块
 * @property {Function} get 发送get请求
 * @property {Function} post 发送post请求
 * @property {Function} put 发送put请求
 * @property {Function} delete 发送delete请求
 */
class Http {
  get defaults() {
    return axios.defaults;
  }
  get interceptors() {
    return {
      request: axios.interceptors.request,
      response: axios.interceptors.response
    };
  }
  authFailCallBack;
  message;
  useAuthFailHandler(callback) {
    this.authFailCallBack = callback;
  }
  useMessage(message) {
    this.message = message;
  }
  checkCompo() {
    if (!this.message) {
      throw new Error(
        "Http错误，请先配置使用的element-ui Message模块: 传入模块构造方法第二个参数"
      );
    }
  }
  get(config) {
    this.checkCompo();
    const { url, headers, data, ...otherAxiosConfig } = config;
    return dispatchRequest(
      {
        url: url,
        method: "GET",
        headers: headers || {},
        params: data || {},
        ...otherAxiosConfig
      },
      this.authFailCallBack,
      this.message
    );
  }
  post(config) {
    this.checkCompo();
    const { url, headers, data, ...otherAxiosConfig } = config;
    return dispatchRequest(
      {
        url: url,
        method: "POST",
        headers: headers || {},
        data: data || {},
        ...otherAxiosConfig
      },
      this.authFailCallBack,
      this.message
    );
  }
  put(config) {
    this.checkCompo();
    const { url, headers, data, ...otherAxiosConfig } = config;
    return dispatchRequest(
      {
        url: url,
        method: "PUT",
        headers: headers || {},
        data: data || {},
        ...otherAxiosConfig
      },
      this.authFailCallBack,
      this.message
    );
  }
  delete(config) {
    this.checkCompo();
    const { url, headers, data, ...otherAxiosConfig } = config;
    return dispatchRequest(
      {
        url: url,
        method: "DELETE",
        headers: headers || {},
        data: data || {},
        ...otherAxiosConfig
      },
      this.authFailCallBack,
      this.message
    );
  }
}

export { Http };
