let mongoose = require("mongoose");
let connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/evaluationDB");
    console.log("Connected Db To NODE...");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectToDb;
