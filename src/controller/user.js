const { exec } = require("../db/mysql");

const login = (username, password) => {
  let sql = `
    select * from users where username='${username}' and password='${password}';
  `;

  return exec(sql).then(rows => rows[0]);
};

module.exports = {
  login
};
