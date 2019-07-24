const router = require("koa-router")();
const loginCheck = require("../middware/loginCheck");

const {
  getList,
  getDetail,
  updateBlog,
  newBlog,
  delBlog
} = require("../controller/blog");

router.prefix("/api/blog");

router.get("/", function(ctx, next) {
  let { author = "", keyword = "", isAdmin } = ctx.request.query;

  if (isAdmin) {
    // 管理员界面

    if (ctx.session.username == null) {
      // 未登录
      return ctx.error("未登录");
    }

    author = ctx.session.username;
  }

  return getList(author, keyword).then(ctx.success);
});

router.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;

  return getDetail(id).then(ctx.success);
});

router.post("/", loginCheck, async (ctx, next) => {
  const { title, content } = ctx.request.body;

  if (!title) return ctx.error("请输入标题");

  if (!content) return ctx.error("请输入内容");

  const result = await newBlog({
    title,
    content,
    author: ctx.session.username
  });

  result && ctx.success(result);
});

router.put("/:id", loginCheck, async (ctx, next) => {
  const { id } = ctx.params;

  const { username } = ctx.session;

  const { author } = await getDetail(id);

  if (author !== username) {
    return res.error("您不是该文章的作者，无权修改");
  }
  const { title, content } = ctx.request.body;

  if (!title) return ctx.error("请输入标题");

  if (!content) return ctx.error("请输入内容");

  return updateBlog(id, req.body).then(ctx.success);
});

router.delete("/:id", loginCheck, async (ctx, next) => {
  const { id } = ctx.params;
  const result = await delBlog(id, ctx.session.username);
  result ? ctx.success("删除成功") : ctx.error("删除失败");
});

module.exports = router;
