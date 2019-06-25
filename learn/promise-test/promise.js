const fs = require("fs");
const path = require("path");

function getFileContent(filename) {
  const fullFileName = path.resolve(__dirname, "files", filename);

  return new Promise((resolve, reject) => {
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(JSON.parse(data.toString()));
      resolve(JSON.parse(data.toString()));
    });
  });
}

getFileContent("a.json")
  .then(({ next }) => getFileContent(next))
  .then(({ next }) => getFileContent(next));
