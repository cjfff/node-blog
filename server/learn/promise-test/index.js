const fs = require("fs");
const path = require("path");

function getFileContent(filename, cb) {
  const fullFileName = path.resolve(__dirname, "files", filename);
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      console.err(err);
      return;
    }
    const json = JSON.parse(data.toString());
    console.log(json);
    if (json.next) {
      cb && cb(json);
    }
  });
}

getFileContent("a.json", ({ next }) => {
  getFileContent(next, ({ next }) => {
    getFileContent(next);
  });
});
