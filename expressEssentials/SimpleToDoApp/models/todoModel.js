let fs = require("fs");

function readFile() {
  try {
    let datafromReading = fs.readFileSync("db.json", "utf-8");
    if (!datafromReading.trim()) {
      return [];
    }
    let data = JSON.parse(datafromReading);
    return data.length == 0 ? [] : data;
  } catch (err) {
    console.error("Error reading or parsing db.json:", err.message);
    return [];
  }
}

function writeFile(dataArray) {
  try {
    fs.writeFileSync("db.json", JSON.stringify(dataArray)); // Pretty print
  } catch (err) {
    console.error("Error writing db.json:", err.message);
  }
}

function findIndex(index, arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      index = i;
      break;
    }
  }
  return index;
}
module.exports = { readFile, writeFile, findIndex };
