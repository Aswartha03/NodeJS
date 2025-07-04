let express = require("express")
const { addBook, allBooks, bookById, updateBookById, deleteBookById, booksByAuthor, getAllAvailableBooksByAuthor } = require("../controllers/bookController")
const booksdataCheckMw = require("../middlewares/dataCheckmw")
let bookRouter = express.Router()




// add book  
bookRouter.post("/add-book",booksdataCheckMw,addBook)
// all books 
bookRouter.get("/books",allBooks)
// book by id 
bookRouter.get("/book/:bookId",bookById)
// update book By id 
bookRouter.put("/update-book/:bookId",updateBookById)
// delete book by id 
bookRouter.delete("/delete-book/:bookId",deleteBookById)
// books by author 
bookRouter.get("/books/:authorId",booksByAuthor)
// active books by author 
bookRouter.get("/books/:authorId?available=true",getAllAvailableBooksByAuthor)
module.exports = bookRouter 