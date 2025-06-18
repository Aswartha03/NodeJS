let { readFileData, appendFileData } = require("../fsModule/fileOperations");

let data = readFileData();

console.log("Initial File Content:", data);

console.log("Appending data... ");

appendFileData();

let updatedData = readFileData();

console.log("Updated File Content: ", updatedData);
