let fs = require("fs");

function readData() {
  try {
    let dataFromReading = fs.readFileSync("db.json", "utf-8");
    if (!dataFromReading.trim()) {
      return [];
    }
    let data = JSON.parse(dataFromReading);
    return data;
  } catch (error) {
    console.log("Error:", error.messsage);
    return [];
  }
}

function writeFile(data) {
  try {
    fs.writeFileSync("db.json", JSON.stringify(data));
  } catch (error) {
    console.log("Error:", error.message);
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
module.exports = { readData, writeFile, findIndex };
