const libraryModel = require("../models/libraryModel");

let getAllBooks = async (req, res) => {
  try {
    let books = await libraryModel.find();
    res.status(200).json({ message: "Books", Books: books });
  } catch (error) {
    console.log("error in the getting all the books :", error.message);
    res.status(409).json({ message: "error in getting all the books" });
  }
};

let addNewBook = async (req, res) => {
  try {
    let newBook = req.body;
    newBook = { ...newBook, status: "available", overdueFees: 0 };
    console.log(newBook);
    await libraryModel.create(newBook);
    res.status(202).json({ message: "New Book is Added.." });
  } catch (error) {
    console.log("Error in adding new book :", error.message);
    res.status(409).json({ message: "error in adding book" });
  }
};

let borrowBookById = async (req, res) => {
  try {
    let id = req.params.id;
    let { userName } = req.body;
    let currentDate = new Date().getHours();
    let book = await libraryModel.findById(id)
    if(!book){
      return res.status(404).json({message:"Book is not found to borrow with that id"})
    }
    // console.log(id,userName , currentDate , "dueDate:",(14*24)+currentDate)
    await libraryModel.findByIdAndUpdate(id, {
      $set: {
        borrowDate: currentDate,
        borrowerName: userName,
        status: "borrowed",
        dueDate: 14 * 24 + currentDate,
      },
      $unset: { returnDate: "" },
    });
    res.status(200).json({ message: "Book is Borrowed." });
  } catch (error) {
    res
      .status(409)
      .json({ message: "Something Went Wrong in the borrowing...." });
  }
};
let returnBookById = async (req, res) => {
  try {
    let id = req.params.id;
    let book = await libraryModel.findById(id);
    let overDueFees = book.overdueFees;
    console.log(overDueFees);
    // overDueFee calculation
    await libraryModel.findByIdAndUpdate(id, {
      $set: { status: "available", returnDate: new Date() },
      $unset: {
        borrowerName: "",
        borrowDate: "",
        dueDate: "",
        overdueFees: "",
      },
    });
    res
      .status(200)
      .json({ message: "Book is returned", overDueFees: overDueFees });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

let deleteBooksByID = async (req, res) => {
  try {
    let id = req.params.id;
    let deletedBook = await libraryModel.findOneAndDelete({
      _id:id , status:"available"
    })
    if(!deletedBook){
      return res.status(405).json({message:"Book is not found to deletion.."})
    }
    console.log(deletedBook)
    res.status(200).json({ message: "Book is Deleted.." });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  addNewBook,
  borrowBookById,
  returnBookById,
  deleteBooksByID,
};
