const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req, res) => {
  const { method } = req;

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    const { username, password } = req.body;

    const result = login(username, password);

    if (result) {
      return new SuccessModel(result, "登录成功");
    } else {
      return new ErrorModel(result, "用户名或密码错误");
    }
  }
};

module.exports = handleUserRouter;
