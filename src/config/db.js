const env = process.env.NODE_ENV; // 环境参数

// 配制
let MYSQL_CONFIG;

if (env === "dev") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "myblog"
  };
}

// 根据环境不同 config 可以设置不同

if (env === "production") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "myblog"
  };
}

module.exports = {
  MYSQL_CONFIG
};
