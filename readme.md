## 技术方案

表设计

```js
博客
{
  id,
  title,
  content,
  createtime,
  author,
  lastmodifiytime,
}
```

| column     | datatype    | pk 主键 | 不为空 | 自动增加 | Default |
| ---------- | ----------- | ------- | ------ | -------- | ------- |
| id         | int         | Y       | Y      | Y        |
| title      | varchar(50) |         | Y      |          |
| content    | longtext    |         | Y      |          |
| createtime | bigint(20)  |         | Y      |          |         |
| author     | varchar(20) |         | Y      |          |         |
| lastmodify | bigint(20)  |         | Y      |          |

```js
用户
{
  id,
  username,
  password,
  realname,
  nikename,
  email,
}
```

- 创建 `users` 表

| column   | datatype    | pk 主键 | 不为空 | 自动增加 | Default |
| -------- | ----------- | ------- | ------ | -------- | ------- |
| id       | int         | Y       | Y      | Y        |         |
| username | varchar(20) |         | Y      |
| password | varchar(20) |         | Y      |
| realname | varchar(20) |         | Y      |
| nikename | varchar(20) |         |        |
| email    | varchar(20) |         |        |          |

## 接口设计 resetful 风格

| 描述             | 接口               | 方法   | url 参数                                                      | 备注                           |
| ---------------- | ------------------ | ------ | ------------------------------------------------------------- | ------------------------------ |
| 获取博客列表     | /api/v1/blog       | get    | author 作者，keyword 搜索关键字,page 页码,pagesize 每页多小个 | 参数为空的话，则不进行查询过滤 |
| 获取博客详情内容 | /api/v1/blog/:id   | get    | id 为博客 id                                                  |
| 新增一篇博客     | /api/v1/blog       | post   |                                                               | post 中有新增的内容            |
| 更新一篇博客     | /api/v1/blog/:id   | png    | id                                                            | posData 中有更新的内容         |
| 删除一篇博客     | /api/v1/blog/:id   | delete | id                                                            | 根据 id 删除一篇博客           |
| 登录             | /api/v1/user/login | post   |                                                               | postData 中有用户名和密码      |

### 搭建开发环境

- nodemon 检测文件变化，自动重启 node
- cross-env 兼容 mac linux 和 windows 的环境变量设置

### 开发接口

- 初始化路由
- 返回假数据，路由跟数据处理分离，以符合设计原则

### API 和 路由 的区别

- API
  前端和后端、或者不同端（子系统）之间对接的一个术语
  URL 路由 `/api/blog/list` get, 输入，输出

- 路由
  API 的一部分，后端系统内部的一个模块

## 登录

### cookie

- 存储在浏览器的一段字符串（最大 5kb ）
- 跨域不共享
- 格式如 k1=v1;k2=v2; 可以存储结构化数据
- 每次发送 http 请求，会将请求域的 cookie 一起发送给 server
- server 可以修改 cookie 并返回浏览器
- 浏览器也可以通过 js 修改 cookie （有限制, httpOnly， 不允许前端访问 cookie）
- expires cookie 过期时间 接受时间的 GMT 格式

- 操作

```js
// 解析 cookie
req.cookie = {};
const cookieStr = req.headers.cookie || ""; // k=v
cookieStr.split(";").forEach(item => {
  if (!item) return;
  const [k, v] = item.split("=");
  req.cookie[k] = v;
});

res.setHeader("Set-Cookie", `username=${data.username}; path=/; httpOnly`); // 设置之后，不允许前端去修改


document.cookie // 前端获取 cookie 
```

#### 问题

- cookie 不安全，所以不能存放敏感信息，比如用户信息等。

### session

在客户端 用 键值对存着 用户的信息，比如 token 存在 cookie 里面，用户每次访问都会带上 token

然后在对应的当次请求把存起来的用户信息用 token 取出。

cookie 存储 userid(token), server 端 对应的用户信息

#### 问题

- 目前 session 直接是 js 变量，放在 node.js 进程内存中。
- 进程内存有限，访问量过大，内存暴增会导致卡死。
- 正式线上运行是多进程的，进程之间内存无法共享。

### redis
- 解决多进程之间的通信，常用缓存数据放在内存中。
- 相比于 mysql，访问速度快（内存和硬盘不是一个数量级的）
- 成本高，可存储的数量级更小（内存的硬伤）  

- [安装](https://www.runoob.com/redis/redis-install.html)
- 启动服务端 redis-server.exe redis.window.conf
- 客户端 redis-cli -h  127.0.0.1 -p 6379
- 链接 redis-server.exe redis.windows.conf
- 使用 set myKey abc, get Mykey


#### demo
```js
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
  console.log(err)
})

// 测试
redisClient.set('myname', 'zhangsan2', redis.print)
redisClient.get('myname', (err, val) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('val', val)

  // 退出
  redisClient.quit()
})
```

#### 总结
- 为何使用 redis ？ 不用 redis 会出现什么问题？
多进程之间无法共享 session 数据。

- redis 适合什么场景？mysql 适合什么场景？
redis 适合于频繁存取的数据读写，mysql 适合不常改动的大体量数据。


### nginx
- 高性能的 web 服务器
- 用来做静态服务、负载均衡
- 反向代理

#### 基本使用
- nginx -t 检查配制文件是否出错
- nginx 启动、 nginx -s reload 重启
- 停止 nginx -s stop