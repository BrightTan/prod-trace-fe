/**
 * 这是一个防抖函数，处理传入的函数，返回经过防抖的新函数，该返回函数多次密集执行只会真正执行最后一次调用
 * @function debounce
 * @param {function} func 需要防抖的函数
 * @param {number} wait 防抖时间（毫秒）
 */
export function debounce(func, wait) {
  let timer = null;
  return function(...params) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      timer = setTimeout(() => {
        func.apply(this, params);
        clearTimeout(timer);
        timer = null;
      }, wait);
      return;
    }
    timer = setTimeout(() => {
      func.apply(this, params);
      clearTimeout(timer);
      timer = null;
    }, wait);
  };
}

/**
 * 这是一个结合了节流和防抖的功能的函数，能够在一段时间内只执行最后调用
 * @param {Function} func 需要处理的函数
 * @param {number} wait 需要节流的时间段
 */
export function throttleKeepLast(func, wait) {
  let throttle = false;
  function waitFunc() {
    /** init empty func */
  }
  let throttleFunc = waitFunc;
  let throttleArgs = [];
  return function(...args) {
    if (!throttle) {
      throttle = true;
      throttleFunc = func;
      throttleArgs = args;
      setTimeout(() => {
        throttleFunc.apply(this, throttleArgs);
        throttleFunc = waitFunc;
        throttleArgs = [];
        throttle = false;
      }, wait);
    } else {
      throttleFunc = func;
      throttleArgs = args;
    }
  };
}

/**
 * 获取两个数字的整区间，例如 min=53, max=4310, 整区间为 【0，5000】
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function getRange(min, max) {
  const litegralDiff = 1 * Math.pow(10, (max - min).toString().length - 1); //取最小值和最大值的差值，得到差值的最大单位，例如差值为4245，差值最大单位为1000
  return [
    Math.floor(min / litegralDiff) * litegralDiff,
    Math.floor((max - 1 + litegralDiff) / litegralDiff) * litegralDiff
  ];
}
