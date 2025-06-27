let express = require("express");
const {
  getAllBooks,
  addNewBook,
  borrowBookById,
  returnBookById,
  deleteBooksByID,
} = require("../controllers/libraryControllers");
const overDueCalculationMiddleware = require("../middleware/overDueCalculation");
const dataCheckMiddleware = require("../middleware/dataValidationMw");
let libraryRouter = express.Router();

libraryRouter.get("/books", getAllBooks);
libraryRouter.post("/books", dataCheckMiddleware,addNewBook);
libraryRouter.patch("/borrow/:id",  borrowBookById);
libraryRouter.patch(
  "/return/:id",
  overDueCalculationMiddleware,
  returnBookById
);
libraryRouter.delete("/delete/:id", deleteBooksByID);

module.exports = libraryRouter;
