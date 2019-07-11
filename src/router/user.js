const { login } = require("../controller/user");
const redis = require("../db/redis");

const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method } = req;

  // 登录
  if (method === "GET" && req.path === "/api/user/login") {
    // const { username, password } = req.body;
    const { username, password } = req.query;

    return login(username, password).then(data => {
      if (data.username) {
        req.session.username = data.username;
        req.session.realname = data.realname;

        redis.set(req.sessionId, req.session);
      }

      return data.username
        ? new SuccessModel(data, "登录成功")
        : new ErrorModel("用户名或密码错误");
    });
  }

  if (method === "GET" && req.path === "/api/user/login-test") {
    return Promise.resolve(
      req.session.username
        ? new SuccessModel(
            {
              ...req.session
            },
            "登录成功"
          )
        : new ErrorModel("没有登录")
    );
  }
};

module.exports = handleUserRouter;
