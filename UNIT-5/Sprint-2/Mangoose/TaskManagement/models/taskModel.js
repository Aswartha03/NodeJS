let mongoose = require("mongoose");
// import { Schema } from "./../node_modules/mongoose/types/index.d";
mongoose.connect("mongodb://127.0.0.1:27017/TaskDB");

let taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  dueData: Date,
});

let taskModel = mongoose.model("Tasks", taskSchema);

module.exports = taskModel;
