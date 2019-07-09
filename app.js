const querystring = require("querystring");

const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

// 用于处理 post data
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }

    let postData = "";
    req.on("data", chunk => (postData += chunk.toString()));
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }

      resolve(JSON.parse(postData));
    });
  });
};

const serverHandle = (req, res) => {
  res.setHeader("Content-type", "application/json");
  const { url } = req;
  req.path = url.split("?")[0];
  req.query = querystring.parse(url.split("?")[1]);

  // 处理 postData
  getPostData(req).then(async postData => {
    req.body = postData;

    // 处理 blog 路由
    const blogPromise = handleBlogRouter(req, res);
    if (blogPromise) {
      blogPromise.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // handleBlogRouter(req, res).then(blogData => {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // });

    // const blogData = await handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }

    // 处理 user 路由
    const userPromise = handleUserRouter(req, res);
    if (userPromise) {
      userPromise.then(userData => {
        res.end(JSON.stringify(userData));
      });
      return;
    }

    // 未命中路由
    res.writeHead(404, {
      "Content-type": "text/plain"
    });
    res.write("404 Not Found\n");
    res.end();
  });
};

module.exports = serverHandle;
