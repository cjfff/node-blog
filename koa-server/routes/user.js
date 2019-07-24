const router = require("koa-router")();

router.prefix("/user");

router.get("/", function(ctx, next) {
  ctx.body = "this is a users response!";
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
