const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString()
}

const handleUserRouter = (req, res) => {
  const { method } = req;

  // 登录
  if (method === "GET" && req.path === "/api/user/login") {
    // const { username, password } = req.body;
    const { username, password } = req.query;

    return login(username, password).then(data => {
      if (data.username) {
        res.setHeader(
          "Set-Cookie",
          `username=${
            data.username
          }; path=/; httpOnly; expires=${getCookieExpires()}`
        );
      }
      return data.username
        ? new SuccessModel(data, "登录成功")
        : new ErrorModel("用户名或密码错误");
    });
  }

  if (method === "GET" && req.path === "/api/user/login-test") {
    return Promise.resolve(
      req.cookie.username
        ? new SuccessModel({
          username: req.cookie.username
        },"登录成功")
        : new ErrorModel("没有登录")
    );
  }
};

module.exports = handleUserRouter;
