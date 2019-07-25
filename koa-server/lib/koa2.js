const http = require("http");

// 组合中间件
function compose(middlewareList) {
  return function(ctx) {
    // 中间件调用
    function dispatch(i) {
      const fn = middlewareList[i];
      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  };
}

class LikeKoa2 {
  constructor() {
    this.middlewareList = [];
  }

  use(fn) {
    this.middlewareList.push(fn);
    return this;
  }

  createContext(req, res) {
    const ctx = {
      req,
      res
    };
    ctx.set = (key, v) => {
      ctx[key] = v;
    };

    ctx.get = key => ctx[key];

    ctx.query = req.query;
    ctx.url = req.url
    ctx.method = req.method;
    return ctx;
  }

  handleRequest(ctx, fn) {
    return fn(ctx);
  }

  callback() {
    return (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, compose(this.middlewareList));
    };
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
}

module.exports = LikeKoa2;
