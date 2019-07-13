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
