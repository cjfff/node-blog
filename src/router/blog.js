const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 统一的登录验证函数
function loginCheck(req) {
  if (!req.session.username) {
    return Promise.resolve(new SuccessModel(new ErrorModel("尚未登录")));
  }
}

const handleBlogRouter = (req, res) => {
  const { method } = req;
  const { id } = req.query;

  // 获取博客列表
  if (method === "GET" && req.path === "/api/blog/list") {
    const { author = "", keyword = "", isAdmin } = req.query;

    if (isAdmin) {
      // 管理员界面
      const loginCheckResult = loginCheck(req);
  
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }

      author = req.session.username
    }
    
    return getList(author, keyword).then(data => new SuccessModel(data));
  }

  // 获取博客详情
  if (method === "GET" && req.path === "/api/blog/detail") {
    return getDetail(id).then(data => new SuccessModel(data, "success"));
  }

  // 新建博客
  if (method === "POST" && req.path === "/api/blog/new") {
    const loginCheckResult = loginCheck(req);

    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    req.body.author = req.session.username;

    return newBlog(req.body).then(
      data => new SuccessModel({ id: data.insertId }, "新建成功")
    );
  }

  // 更新
  if (method === "POST" && req.path === "/api/blog/update") {
    const loginCheckResult = loginCheck(req);

    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    let data = req.body;
    return updateBlog(id, data).then(result =>
      result
        ? new SuccessModel(result, "success")
        : new ErrorModel(result, "failed")
    );
  }
  // 获取博客列表
  if (method === "POST" && req.path === "/api/blog/del") {
    const loginCheckResult = loginCheck(req);

    if (loginCheckResult) {
      // 未登录
      return loginCheckResult;
    }
    const author = req.session.username;

    return delBlog(id, author).then(result => {
      return result
        ? new SuccessModel(result, "success")
        : new ErrorModel(result, "failed");
    });
  }
};

module.exports = handleBlogRouter;
