const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const {method, url} = req
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为 JSON
  res.setHeader('Content-type', 'application/json')

  // 返回数据
  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回
  if (method === 'GET') {
    // 这里为什么返回字符串？
    // 主要是上面设置头部就是设置这里返回的字符串是什么格式
    res.end(JSON.stringify(resData))
  }

  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    })
  }

})

server.listen(3000)