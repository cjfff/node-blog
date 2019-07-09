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

### session

### 开发登录功能，前端联调（用到 nginx 反向代理）
