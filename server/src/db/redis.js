const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on("error", err => {
  console.log(err);
});

function set(key, val) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val, redis.print);
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }

      // 如果读取的 key 不存在
      if (val == null) {
        resolve(null);
        return;
      }

      // 先尝试进行 JSON.parse, 失败后直接进行返回
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });

  return promise;
}

module.exports = {
  set,
  get
};

// // 测试
// redisClient.set("myname", "zhangsan2", redis.print);
// redisClient.get("myname", (err, val) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log("val", val);

//   // 退出
//   redisClient.quit();
// });
