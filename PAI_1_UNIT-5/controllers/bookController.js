let bookModel = require("../models/bookModel");
let addBook = async (req, res) => {
  try {
    let book = await bookModel.create(req.body);
    res.status(201).json({ message: "Book Created", book });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let allBooks = async (req, res) => {
  try {
    let books = await bookModel.find();
    if (books.length == 0) {
      return res.status(200).json({ message: "There is no books" });
    }
    res.status(200).json({ message: "Books", books });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let bookById = async (req, res) => {
  try {
    let { bookId } = req.params;
    if (!bookId) {
      return res.status(200).json({ message: "Please provide bookId" });
    }
    let book = await bookModel.findById(bookId);
    console.log(book);
    if (!book) {
      return res
        .status(200)
        .json({ message: "Book not found , please provide valid bookId" });
    }
    res.status(200).json({ message: "Book Found", book });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

let updateBookById = async (req, res) => {
  try {
    let { bookId } = req.params;
    let newDetails = req.body;
    if (!bookId) {
      return res.status(200).json({ mesage: "bookId is required to update.." });
    }
    // console.log(bookId,newDetails)
    let book = await bookModel.findByIdAndUpdate(
      bookId,
      { $set: newDetails },
      { new: true }
    );
    // console.log(author)
    res.status(200).json({ message: "book  Updated..", book });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let deleteBookById = async (req, res) => {
  try {
    let { bookId } = req.params;
    if (!bookId) {
      return res.status(200).json({ mesage: "bookId is required to delete.." });
    }
    let book = await bookModel.findById(bookId);
    if (!book) {
      return res.status(200).json({ message: "Book is not found to delete" });
    }
    console.log(book);
    await bookModel.findByIdAndUpdate(bookId, { $set: { available: false } });
    res.status(200).json({ message: "book deleted.." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
let booksByAuthor = async(req,res)=>{
    try {
        let {authorId} = req.params 
        if(!authorId){
            return res.status(200).json({message:"authorId is requiredd..."})
        }
        let book = await bookModel.findOne({author:authorId}) 
        if(!book){
            return res.status({message:"No books are written by this author"})
        }
        let booksByAuthor = await bookModel.find({author:authorId}).populate("author")
        console.log(booksByAuthor)
        res.status(200).json({message:"books by author" , booksByAuthor})
    } catch (error) {
         console.log(error.message);
    res.status(500).json({ message: error.message });
    }
}
let getAllAvailableBooksByAuthor = async(req,res)=>{
    try {
        let {authorId} = req.params 
        if(!authorId){
            return res.status(200).json({message:"authorId is requiredd..."})
        }
        let book = await bookModel.findOne({author:authorId}) 
        if(!book){
            return res.status({message:"No books are written by this author"})
        }
        let ActiveBooksByAuthor = await bookModel.find({author:authorId,available}).populate("author")
        console.log(ActiveBooksByAuthor[0].available)
        console.log("Aswartha")
        ActiveBooksByAuthor = ActiveBooksByAuthor.filter((book)=>book.available===true)
        console.log(ActiveBooksByAuthor)
        res.status(200).json({message:"Active books by author" , ActiveBooksByAuthor})
    } catch (error) {
         console.log(error.message);
    res.status(500).json({ message: error.message });
    }
}
module.exports = {
  addBook,
  allBooks,
  bookById,
  updateBookById,
  deleteBookById,
  booksByAuthor,
  getAllAvailableBooksByAuthor
};
