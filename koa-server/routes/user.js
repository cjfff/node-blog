const router = require("koa-router")();
router.prefix("/api/user");

const { login } = require("../controller/user");

router.post("/login", async (ctx, next) => {
  const user = await login(ctx.request.body);

  if (user.username) {
    ctx.session.username = user.username;
  }

  user.username ? ctx.success(user, "登录成功") : ctx.error("用户名或密码错误");
});

router.get("/checkLogin", async (ctx, next) => {
  if (ctx.session.username) {
    return ctx.success(
      {
        username: ctx.session.username
      },
      "登录成功"
    );
  }

  return ctx.error("未登录");
});

router.post("/logout", async (ctx, next) => {
  delete ctx.session.username;
  ctx.success("退出登录成功");
});

router.get("/session-test", function(ctx, next) {
  if (ctx.session.view == null) {
    ctx.session.view = 0;
  }
  ctx.session.view++;

  ctx.body = {
    code: 0,
    data: {
      view: ctx.session.view
    }
  };
});

module.exports = router;
