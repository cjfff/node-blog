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