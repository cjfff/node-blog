const { exec } = require("../db/mysql");
const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
  let sql = `
    select username, realname from users where username='${username}' and password='${genPassword(
    password
  )}';
  `;
  return exec(sql).then(rows => rows[0] || {});
};

module.exports = {
  login
};
