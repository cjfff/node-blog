const fs = require("fs");
const path = require("path");
const readline = require("readline");

// 文件名
const fullFileName = path.join(__dirname, "../", "logs", "access.log");

// 创建 readstream
const readStream = fs.createReadStream(fullFileName);

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
});

let chromeNum = 0;
let sum = 0;

// 逐行读取
rl.on("line", lineData => {
  if (!lineData) {
    return;
  }
  sum++;

  const arr = lineData.split("  --  ");
  console.log(arr);
});

rl.on('close', () => {
  console.log(sum)
})

