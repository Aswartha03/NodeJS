const { default: mongoose } = require("../configs/db");

let taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  isCompleted: Boolean,
  completionDate: Date,
  dueDate: Date,
});

let taskModel = mongoose.model("Tasks", taskSchema);
module.exports = taskModel;
