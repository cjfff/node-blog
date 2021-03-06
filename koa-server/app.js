require('dotenv').config()
const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const session = require("koa-generic-session");
const redisSession = require("koa-redis");
const resMiddleware = require('./middware/resMiddleware')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')


const blog = require("./routes/blog");
const user = require("./routes/user");

const { REDIS_CONFIG } = require('./config/db')

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(resMiddleware());
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

if (process.env.NODE_ENV !== "dev") {
  const fileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(fileName, {
    flags: "a"
  });
  app.use(
    morgan("combined", {
      stream: writeStream
    })
  );
} else {
  app.use(morgan("dev"));
}

app.keys = ["cjf_2019+#_!"];
app.use(
  session({
    // 配制 cookie
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisSession({
      // all: "127.0.0.1:6379" // 写死本地 redis
      all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
    })
  })
);

app.use(blog.routes(), blog.allowedMethods());
app.use(user.routes(), user.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
