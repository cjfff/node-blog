
## http 概述
从输入url到页面显示，都发生了什么
- DNS解析，建立TCP连接，发送 http 请求
- server 接收到 http 请求，处理，并返回
- 客户端接收到返回数据，处理数据（如渲染页面，执行 js ）


## Node.js 处理 http 请求
- get 请求和 querystring
- post 请求和 pastdata
- 路由 处理

### get 请求 
- 客户端向 server 端获取数据，如查询博客列表
- 通过 querystring 来传递数据，如 a.html?a=100&b=200
- 浏览器直接访问，就发送 get 请求

demo
```js
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const url = req.url // 获取请求的完整 url
  console.log(req.method, url) // GET
  req.query = querystring.parse(url.split('?')[1]) // 解析 querystring
  console.log(req.query)
  res.end(JSON.stringify(req.query)) // 将 querystring 返回
})

server.listen(3000)

```


### post 请求
- post 请求，客户端要向服务端传递数据，如新建博客
- 通过 post data 传递数据
- 浏览器无法直接模拟，需要手写 js，或者使用 postman

```js
const http = require('http')

const server = http.createServer((req, res) => {
  console.log('======')
  if (req.method === 'POST') {
    // 数据格式
    console.log('content-type', req.headers['content-type'])
    // 接受数据
    let postData = ""
    // 流处理
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      console.log('postData', postData)
      res.end('hello world') // 返回
    })
  }
})

server.listen(3000, () => {
  console.log('ok')
})
```

### 处理路由
就是匹配不同的资源标识