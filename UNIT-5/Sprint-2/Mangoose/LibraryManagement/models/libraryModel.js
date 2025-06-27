const { default: mongoose } = require("mongoose");

let librarySchema = new mongoose.Schema({
  title: String,
  author: String,
  status: String,
  borrowerName: String,
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  overdueFees: Number,
});

let libraryModel = mongoose.model("Library", librarySchema);

module.exports = libraryModel;
