let express = require("express")
const { addAuthor, getAuthors, authorById, updateAuthorById, deleteAuthorById } = require("../controllers/authorController")
let authorRouter = express.Router()
// add Author
authorRouter.post("/add-author",addAuthor)
// get all authors 
authorRouter.get("/authors",getAuthors)
// author by id 
authorRouter.get("/author/:authorId",authorById)
// update author by id
authorRouter.put("/update-author/:authorId",updateAuthorById)
// delete author by id 
authorRouter.delete("/delete-author/:authorId",deleteAuthorById)


module.exports = authorRouter 