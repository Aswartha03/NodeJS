let fs = require("fs");

let data = fs.readFileSync("data.txt", "utf-8");

module.exports = { data };
