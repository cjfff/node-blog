const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const { method } = req;
  const { id } = req.query;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query;
    return getList(author, keyword).then(data => new SuccessModel(data));
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    return getDetail(id).then(data => new SuccessModel(data, "success"));
  }

  // 新建博客
  if (method === "POST" && req.path === "/api/blog/new") {
    return newBlog(req.body).then(
      data => new SuccessModel({ id: data.insertId }, "新建成功")
    );
  }

  // 跟新
  if (method === "POST" && req.path === "/api/blog/update") {
    let data = req.body;
    return updateBlog(id, data).then(result =>
      result
        ? new SuccessModel(result, "success")
        : new ErrorModel(result, "failed")
    );
  }
  // 获取博客列表
  if (method === "POST" && req.path === "/api/blog/del") {
    const { author } = req.query;
    return delBlog(id, author).then(result => {
      return result
        ? new SuccessModel(result, "success")
        : new ErrorModel(result, "failed");
    });
  }
};

module.exports = handleBlogRouter;
