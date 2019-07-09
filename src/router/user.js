const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method } = req;

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;

    return login(username, password).then(data => {
      return data.username
        ? new SuccessModel(data, "登录成功")
        : new ErrorModel("用户名或密码错误");
    });
  }
};

module.exports = handleUserRouter;
