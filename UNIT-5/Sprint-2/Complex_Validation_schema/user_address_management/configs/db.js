let mongoose = require("mongoose");

let connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/UserDataBase");
    console.log("Connect to DB");
  } catch (error) {
    console.log("something went wrong at connecting to DB");
  }
};

module.exports = connectToDB;
