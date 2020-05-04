import axios from "axios";

/**
 * @function processStatus
 * @param {Object} res axios请求返回的数据
 * @param {Object} message element的提示工具
 * @description 统一处理http状态码
 */
function processStatus(res, message) {
  const response = res.response;
  if (response.status === 404) {
    message.error("请求失败，资源不存在404");
  } else if (response.status >= 400 && response.status < 500) {
    message.error("请求失败，客户端错误");
  } else if (response.status >= 500) {
    message.error(`请求失败，服务器端错误${response.status}`);
  }
}

/**
 * @function processCode
 * @param {Object} res axios请求返回的数据
 * @param {Function} authFailCallBack 验证失败的回调函数
 * @param {Object} message  element的提示工具
 * @description 统一处理返回数据的code字段(前后端约定好)
 */
function processCode(res, authFailCallBack, message) {
  if (res.code === 1) {
    return Promise.resolve(res);
  } else if (res.code === 2) {
    res.message && message.success(res.message);
    return Promise.resolve(res);
  } else if (res.code === 0) {
    message.error("请求失败，服务器出错");
  } else if (res.code === -1) {
    authFailCallBack && authFailCallBack();
  } else if (res.code === -2) {
    if (res.message) {
      message.error(res.message);
    } else {
      message.error("请求失败，服务器出错");
    }
  } else {
    message.error("请求失败，服务器响应错误");
  }
  res._frontEndCatch = true;
  return Promise.reject(res);
}

/**
 * @function dispatchRequest
 * @param {Object} config 请求的配置对象，axios的配置（详见axios配置文档）
 * @param {Function} authFailCallBack 验证失败的回调函数
 * @param {Object} message element的提示工具
 * @description 利用axios执行请求
 */
function dispatchRequest(config, authFailCallBack, message) {
  return axios
    .request(config)
    .then((res) => {
      const { data, status, statusText, headers, config } = res;
      if (/json/.test(headers["content-type"])) {
        data.data === undefined && (data.data = {});

        const dealedData = {
          ...data,
          _status: status,
          _statusText: statusText,
          _headers: headers,
          _config: config,
        };

        return processCode(dealedData, authFailCallBack, message);
      } else {
        return Promise.resolve(res);
      }
    })
    .catch((errInfo) => {
      if (errInfo._frontEndCatch) {
        /**then reject出来的不做处理 */
      } else if (errInfo.response) {
        processStatus(errInfo, message);
      } else {
        if (errInfo.toJSON && errInfo.toJSON().message) {
          message.error(`网络出错：${errInfo.toJSON().message}`);
        } else {
          message.error("请求失败，未知系统错误");
        }
      }

      return Promise.reject(errInfo);
    });
}

export { dispatchRequest };
