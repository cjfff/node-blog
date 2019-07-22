module.exports = (req, res, next) => {
  if (req.session.username) {
    return next();
  }
  res.error("未登录");
};
