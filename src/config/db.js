const env = process.env.NODE_ENV; // 环境参数

// 配制
let MYSQL_CONFIG, REDIS_CONFIG;

if (env === "dev") {
  MYSQL_CONFIG = {
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "myblog"
  };
  REDIS_CONFIG = {
    host: "127.0.0.1",
    port: 6379
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
  REDIS_CONFIG = {
    host: "127.0.0.1",
    port: 6379
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
};
