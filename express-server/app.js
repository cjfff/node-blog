require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var cookieParser = require("cookie-parser");
const resMiddleware = require("./middware/resMiddleware.js");
var logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./db/redis");

var blogRouter = require("./routes/blog");
var userRouter = require("./routes/user");

var app = express();

if (process.env.NODE_ENV !== "dev") {
  const fileName = path.join(__dirname, "logs", "access.log");
  const writeStream = fs.createWriteStream(fileName, {
    flags: "a"
  });
  app.use(
    logger("combined", {
      stream: writeStream
    })
  );
} else {
  app.use(logger("dev"));
}

app.use(resMiddleware());
app.use(express.json()); // 解析 application/json 获取 post data 中的数据
app.use(express.urlencoded({ extended: false })); // 解析 form
app.use(cookieParser()); // 解析 http 请求中带过来的 cookie

const redisStore = new RedisStore({
  client: redisClient
});

app.use(
  session({
    store: redisStore,
    secret: "my_blog#",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
