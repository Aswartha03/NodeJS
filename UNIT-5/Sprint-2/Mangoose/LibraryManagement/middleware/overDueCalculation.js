const libraryModel = require("../models/libraryModel");

let overDueCalculationMiddleware = async(req, res, next) => {
  let id = req.params.id;
  let book = await libraryModel.findById(id);

  if (!book) {
    return res.status(404).json({ message: "Book is not found" });
  }
  console.log(book.status)
  if (book.status != "borrowed") {
    return res.status(404).json({ message: "Book is not borrowed.." });
  }
  let today = new Date();
  let dueDate = new Date(book.dueDate);
  let diffInMs = today - dueDate;
  let isDue = diffInMs > 0;
  overDueDays = isDue ? Math.floor(diffInMs / (1000 * 60 * 60 * 24)) : 0;
  let overDueAmount = overDueDays * 10;
  book.overdueFees += overDueAmount;
  next()
};

module.exports = overDueCalculationMiddleware
