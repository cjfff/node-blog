var express = require("express");
const loginCheck = require("../middware/loginCheck");
var router = express.Router();

const {
  getList,
  getDetail,
  updateBlog,
  newBlog,
  delBlog
} = require("../controller/blog");

router.get("/", (req, res, next) => {
  let { author = "", keyword = "", isAdmin } = req.query;

  if (isAdmin) {
    // 管理员界面

    if (req.session.username == null) {
      // 未登录
      return res.error("未登录");
    }

    author = req.session.username;
  }

  getList(author, keyword).then(res.success);
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  getDetail(id).then(res.success);
});

router.use(loginCheck);

router.post("/", async (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.error("请输入标题");

  if (!content) return res.error("请输入内容");

  const result = await newBlog({
    title,
    content,
    author: req.session.username
  });

  result && res.success(result);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await delBlog(id, req.session.username);
  if (result) {
    return res.success("删除成功");
  } else {
    return res.error("删除失败");
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const { username } = req.session;

  const { author } = await getDetail(id);

  if (author !== username) {
    return res.error("您不是该文章的作者，无权修改");
  }
  const { title, content } = req.body;

  if (!title) return res.error("请输入标题");

  if (!content) return res.error("请输入内容");

  return updateBlog(id, req.body).then(res.success);
});

module.exports = router;
