const handleUserRouter = (req, res) => {
  const { method } = req

  // 登录
  if (method === "POST" && req.path === "/api/user/login") {
    return {
      msg: "登录接口"
    };
  }

}

module.exports = handleUserRouter