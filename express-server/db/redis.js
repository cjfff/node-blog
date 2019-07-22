const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");


// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on("error", err => {
  console.log(err);
});


module.exports = redisClient