var express = require("express");
var router = express.Router();

const { login } = require("../controller/user");

/* GET home page. */
router.post("/login", function(req, res, next) {
  const { username, password } = req.body;

  login(username, password).then(data => {
    // 写入 session
    if (data.username) {
      req.session.username = data.username;
      req.session.realname = data.realname;
    }

    data.username
      ? res.success(data, "登录成功")
      : res.error("用户名或密码错误");
  });
});

// 测试 session
router.get("/checkLogin", (req, res, next) => {
  if (req.session.username) {
    res.success({
      username: req.session.username,
      realname: req.session.realnameF
    });
  } else {
    res.error("未登录");
  }
});

router.post("/logout", (req, res, next) => {
  delete req.session.username;
  delete req.session.realname;

  res.success("登出成功");
});

module.exports = router;
