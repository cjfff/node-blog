const login = (username, password) => {
  // 使用假数据
  if (username === 'cjf' &&password === '123') {
    return true
  } else {
    return false
  }
}


module.exports = {
  login
}