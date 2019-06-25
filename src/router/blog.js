const {
  getList,
  getDetail,
  newBlog,
  updateBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleBlogRouter = (req, res) => {
  const { method } = req;
  const { id } = req.query;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query;

    return new SuccessModel(getList(author, keyword), "博客列表");
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    return new SuccessModel(getDetail(id), "博客详情");
  }

  // 获取博客列表
  if (method === "POST" && req.path === "/api/blog/new") {
    let data = req.body;
    console.log(data);

    return new SuccessModel(newBlog(data), "新建成功");
  }

  // 跟新
  if (method === "POST" && req.path === "/api/blog/update") {
    let data = req.body;
    const result = updateBlog(id, data);
    if (result) {
      return new SuccessModel(result, "更新成功");
    } else {
      return new ErrorModel(result, "更新失败");
    }
  }
  // 获取博客列表
  if (method === "POST" && req.path === "/api/blog/del") {
    return {
      msg: "删除博客"
    };
  }
};

module.exports = handleBlogRouter;
