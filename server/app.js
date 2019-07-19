const querystring = require("querystring");
const redis = require("./src/db/redis");
const { access } = require("./src/utils/log");
const handleBlogRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");

const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  return d.toGMTString();
};

function setCookieId(res, userId) {
  res.setHeader(
    "Set-Cookie",
    `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
  );
}

// session store

// 用于处理 post data
const getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }

    if (!/application\/json/.test(req.headers["content-type"])) {
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
  // 记录 access log
  access(
    `${req.method} -- ${req.url} -- ${
      req.headers["user-agent"]
    } -- ${Date.now()}`
  );
  res.setHeader("Content-type", "application/json");
  const { url } = req;

  // 获取 path
  req.path = url.split("?")[0];
  // 解析 query
  req.query = querystring.parse(url.split("?")[1]);

  // 解析 cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ""; // k=v
  cookieStr.split(";").forEach(item => {
    if (!item) return;
    const [k, v] = item.split("=");
    req.cookie[k.trim()] = v;
  });

  // 解析 session
  let userId = req.cookie.userId,
    needSetCookie = false;

  if (!userId) {
    needSetCookie = true;
    userId = (Date.now() + Math.random()).toString(16);
    // 初始化 session
    redis.set(userId, {});
  }

  // 获取session
  req.sessionId = userId;
  redis
    .get(req.sessionId)
    .then(sessionData => {
      if (!sessionData) {
        // 初始化
        redis.set(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        req.session = sessionData;
      }

      return getPostData(req);
    })
    .then(async postData => {
      req.body = postData;

      // 处理 blog 路由
      const blogPromise = handleBlogRouter(req, res);

      if (blogPromise) {
        blogPromise.then(blogData => {
          needSetCookie && setCookieId(res, userId);
          res.end(JSON.stringify(blogData));
        });
        return;
      }

      // 处理 user 路由
      const userPromise = handleUserRouter(req, res);
      if (userPromise) {
        userPromise.then(userData => {
          needSetCookie && setCookieId(res, userId);
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
