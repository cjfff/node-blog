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


## 接口设计 resetful 风格
描述|接口|方法|url参数|备注
--|--|--|--|--|
获取博客列表|/api/v1/blog  |get|author作者，keyword搜索关键字,page页码,pagesize每页多小个|参数为空的话，则不进行查询过滤
获取博客详情内容  |/api/v1/blog/:id  |get|id为博客id|
新增一篇博客  |/api/v1/blog |post||post中有新增的内容|
更新一篇博客  |/api/v1/blog/:id | png|id|posData中有更新的内容
删除一篇博客  |/api/v1/blog/:id |delete|id|根据id删除一篇博客
登录|/api/v1/user/login|post||postData中有用户名和密码


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
API的一部分，后端系统内部的一个模块