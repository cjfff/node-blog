### 安装
```js
npm i -g express-generator

express project_name
```

### 中间件

每一个 app.use 其实就是一个中间件，调用 next() 后执行下一个中间件。

```js
const express = require("express");

// 实例
const app = express();

app.use((req, res, next) => {
  console.log("请求开始", req.method, req.url);
  next();
});

app.use((req, res, next) => {
  req.cookie = {
    userId: "abc"
  };
  next();
});

app.use((req, res, next) => {
  // 假设处理 post data
  // 异步
  setTimeout(() => {
    req.body = {
      username: "cjf",
      password: "123"
    };
    next();
  }, 200);
});

app.use('/', (req, res, next) => {
  res.json({
    code: 0,
    data: {
       arr: [1,2,3,4]
    }
  })
})

app.use((req, res, next) => {
  res.json({
    code: -1,
    msg: '404 not found'
  })
});


app.listen(3000, () => {
  console.log('app listening 3000')
})
```



### session

```js
npm i -S express-session

const session = require("express-session");

// ps 请记得在 cookie 读取之后使用
app.use(
  session({
    secret: "my_blog#",
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

这个中间件其实就是帮我们生产了一个 唯一标志发放给前端 存放 cookie，下次来的时候再带上就能标志处用户了。
```


### redis

为什么需要 redis 呢？ session 是有缺项的，使用的是服务器的运行内存

1. 占用服务器有限的资源
2. 服务如果需要重新部署更新的话需要重启，会丢失所有的内存数据。


需要同步到 session 当中

```js
const session = require("express-session");
const RedisStore = require('connect-redis')(session)

```


### 日志

使用 [morgan](https://github.com/expressjs/morgan) 三方插件


### express 中间件原理

- app.use 注册中间件，收集 cb
- 遇到 http 请求，根据 path 和 method 判断触发哪些
- 实现 next 机制