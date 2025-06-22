let fs = require("fs");

let readData = () => {
  try {
    let dataFromReading = fs.readFileSync("tasks.json", "utf-8");
    if (!dataFromReading.trim()) {
      return [];
    }
    let data = JSON.parse(dataFromReading);
    return data;
  } catch (error) {
    console.log("Error :", error.message);
    return [];
  }
};

let writeData  = (data)=>{
    try {
        fs.writeFileSync("tasks.json",JSON.stringify(data))
    } catch (error) {
        console.log("Error :",error.message)
    }
}

module.exports = { readData , writeData };
