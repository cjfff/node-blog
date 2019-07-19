const fs = require("fs");
const path = require("path");

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + "\n"); // 关键代码
}

// create write Stream
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, "../", "logs", fileName);

  const witeSream = fs.createWriteStream(fullFileName, {
    flags: "a",
    encoding: "utf8"
  });
  return witeSream;
}

const access = (function() {
  return log => {
    if (process.env.NODE_ENV === "dev") {
      return console.log(log);
    } else {
      // 写入访问日志
      const accessWriteStream = createWriteStream("access.log");

      return writeLog(accessWriteStream, log);
    }
  };
})();

module.exports = {
  access
};
