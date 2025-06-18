let fs = require("fs");

let readFileData = () => {
  let data = fs.readFileSync("./data.txt", "utf-8");
  return data;
};

let appendFileData = () => {
  fs.appendFileSync("./data.txt", "This is Appended Data.", "utf-8");
};
module.exports = { readFileData, appendFileData };
