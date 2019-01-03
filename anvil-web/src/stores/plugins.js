/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:23:37
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-01-03 22:28:29
 * redux 中间件
 */

export const createPromiseMiddleware = (effects) => {
  return () => (next) => (action) => {
    if (Object.keys(effects).indexOf(action.type) > -1) {
      return new Promise((resolve, reject) => {
        next({
          ...action,
          _resolve: resolve,
          _reject: reject,
        });
      });
    }
    return next(action);
  };
};

export const crashReporterMiddleware = () => {
  return () => (next) => (action) => {
    try {
      return next(action);
    } catch (err) {
      console.error('crash reporter:', err);
    }
  };
};
