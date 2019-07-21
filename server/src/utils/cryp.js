const crypto = require('crypto') // node 原生库

// 秘钥
const SECRET_KEY = 'MY_BLOG_CJFFF_!#_9527'

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

module.exports = {
  genPassword
}


