const { SuccessModel, ErrorModel } = require("../model/resModel");

// 快速回复中间件
module.exports = () => async (ctx, next) => {
  ctx.success = (...args) => (ctx.body = new SuccessModel(...args));
  ctx.error = (...args) => (ctx.body = new ErrorModel(...args));
  await next();
};
