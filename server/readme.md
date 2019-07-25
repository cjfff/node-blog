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


### 日志
- 访问日志

- node js 文件操作，nodejs stream
- 日志功能开发和使用
- 日志文件拆分，日志内容分析


- 日志要存储到文件中

- 为何不存储在 mysql 中？

对性能要求不高, 方便迁移，所有服务器都识别文件类型，不需要环境支持

- 为何不存在 redis 中？

体量大，内存成本高。

#### 设计
- 按时间划分 如 2019-02-10.access.log, 以访问量递推，小时，分钟单位
- 实现方式 linux crontab 命令，即定时任务
- 设置定时任务 每天特定时间把 access.log 拷贝并重命名为 2019-07-20.access.log, 并清空原来的文件，继续积累日志

格式 ***** command 指脚本

1. 1**** 每一分钟执行一次  -- 分钟
2. *1**** 每天的第一个小时执行 -- 小时 
3. 第三个 * 号 代表日期，即每个月多小号
4. 第四个 月份
5. 第五个 星期

例子 
-  21*** 每天的第一个小时2分钟执行
- crontab -e 编辑定时任务

[具体学习地址](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html)

### IO 操作的性能瓶颈
- IO 包括 网络 IO 文件 IO
- 相比于 CPU 计算和内存读写，IO 是很慢的

### stream
- 标准的输入输出 pipe 就是管道，符合流的模型
- process.stdin.pipe(process.stdout)
- 例子可以参考 客户端向服务端发送 post data 的时候，是一点点接收的。



### 安全
- sql 注入：窃取数据库内容
  - 攻击方式：输入一个 sql 片段，最终拼成一段攻击代码 例如 select * from user where username='zhangsan'-- ', 即用户名输入是 zhangsan'--
  - 预防措施：使用 mysql 的 escape 函数处理输入内容即可
- XSS 攻击：窃取前端的 cookie 内容
  - 一些地方需要展示用户直接输入的内容的时候，如果用户输入的是 script 标签什么的话，展示的时候会被直接执行，预防措施是生成 js 的特殊转义字符
  - |字符|转义字符|
    |--|:--:|---:|
    |&|`&amp;`|
    |<|`&lt;`|
    |>|`&gt;`|
    |"|`&quot;`|
    |'|`&#x27;`|
    |/|`&#x2F;`|
- 密码加密： 保障用户信息安全

万一和数据库被黑客攻破，也不会泄露用户信息
> 撞库攻击（拿到某个你在别的平台的账号密码，去别的系统尝试登陆）
> 预防措施，将密码加密，即便泄露也不会出现问题

```js
const crypto = require('crypto') // node 原生库

// 秘钥
const SECRET_KEY = 'KEY'

// md5 加密
const md5 = (content) => {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}


// 加密函数
function genPassword(pw) {
  const str = `password=${pw}&key=${SECRET_KEY}`
  return md5(str);
}
```


### pm2
- 进程守护，系统奔溃自动重启
- 启动多进程，充分利用 CPU 和内存 
- 自带日志记录功能

#### 命令
```js
pm2 start 

pm2 list 查看当前启动的服务

pm2 restart appName / id

pm2 stop/delete appName/ id // 停止，删除

pm2 info appName/id

pm2 log appName/id // 可以实时查看日志记录, pm2 会自动收集打印输出

pm2 monit appName/id // 查看内存
```


#### 配置
- 使用配置文件，配制进程数量，日志文件目录等
- 修改启动命令，重启
- 访问 server 检查日志文件是否成功

- 进程之间无法实现通信，例如使用 session ，无法传递，所以需要引入 redis 外部存储.

```json
{
  "apps": {
    "name": "pm2-test-server", // 指定启动名字
    "script": "app.js", // 指定脚本
    "watch": true, // 是否监听文件改动自动重启
    "ignore_watch": [ // 不监听的文件
      "node_modules",
      "logs"
    ],
    "instances": 4,
    "error_file": "logs/err.log", // 错误日志放置文件
    "out_file": "logs/out.log", // 普通日志
    "log_date_format": "YYYY-MM-DD HH:mm:ss" // 每条记录的时间
  }
}
```

```js
$ npm install pm2 -g     # 命令行安装 pm2 
$ pm2 start app.js -i 4 #后台运行pm2，启动4个app.js 
                                # 也可以把'max' 参数传递给 start
                                # 正确的进程数目依赖于Cpu的核心数目
$ pm2 start app.js --name my-api # 命名进程
$ pm2 list               # 显示所有进程状态
$ pm2 monit              # 监视所有进程
$ pm2 logs               #  显示所有进程日志
$ pm2 stop all           # 停止所有进程
$ pm2 restart all        # 重启所有进程
$ pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0             # 停止指定的进程
$ pm2 restart 0          # 重启指定的进程
$ pm2 startup            # 产生 init 脚本 保持进程活着
$ pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
$ pm2 delete 0           # 杀死指定的进程
$ pm2 delete all         # 杀死全部进程

运行进程的不同方式：
$ pm2 start app.js -i max  # 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3      # 启动3个进程
$ pm2 start app.js -x        #用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23   # 用fork模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone  # 启动一个进程并把它命名为 serverone
$ pm2 stop serverone       # 停止 serverone 进程
$ pm2 start app.json        # 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23                   #在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log  # 启动 并 生成一个配置文件
你也可以执行用其他语言编写的app  ( fork 模式):
$ pm2 start my-bash-script.sh    -x --interpreter bash
$ pm2 start my-python-script.py -x --interpreter python
```


![imgage](https://s2.ax1x.com/2019/07/25/eZedMV.png)