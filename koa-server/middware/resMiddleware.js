const { SuccessModel, ErrorModel } = require("../model/resModel");

// 快速回复中间件
module.exports = () => (req, res, next) => {
  res.success = (...args) => res.send(new SuccessModel(...args));
  res.error = (...args) => res.send(new ErrorModel(...args));
  next();
};
