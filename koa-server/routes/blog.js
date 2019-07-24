const router = require("koa-router")();

router.prefix("/api/blog");

router.get("/", function(ctx, next) {
  ctx.body = {
    hello: 'lsfjlsdk'
  }
});


module.exports = router;
