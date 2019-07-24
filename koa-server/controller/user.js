const { exec } = require("../db/mysql");
const { genPassword } = require("../utils/cryp");

const login = async ({username, password}) => {
  let sql = `
    select username, realname from users where username='${username}' and password='${genPassword(
    password
  )}';
  `;
  return await exec(sql).then(rows => rows[0] || {});
};

module.exports = {
  login
};
