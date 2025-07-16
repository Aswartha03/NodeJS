let express = require ('express');
const authMiddleware = require('../middlewares/authMiddleware');
const BookModel = require('../models/bookModel');
let bookRouter = express.Router ();
let redis = require("../configs/redis")

// add book 
bookRouter.post("/",authMiddleware(["editor","admin"]),async(req,res)=>{
    try {
        let {description , bookname , price , author} = req.body 
        if(!description || !bookname || !price || !author) {
            return res.status(400).json({message:"please provide all feilds"})
        }
        redis.del("books")
        let newBook = await BookModel.create({description,bookname,price,author})
        res.status(200).json({message:"Book added" , newBook})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
// getBooks 
bookRouter.get("/",authMiddleware(["admin","editor"]),async(req,res)=>{
    try {
        let books = await redis.get("books")
        if(!books){
            let booksFromDB = await BookModel.find()
            redis.set("books",JSON.stringify(booksFromDB))
            res.status(200).json({message:"books from Db",books:booksFromDB})
        }
        books = JSON.parse(books)
        res.status(200).json({message:"books from Redis",books},{"Ex":300})
    } catch (error) {
         res.status(500).json({message:error.message})
    }
})
// delete book by id 
bookRouter.delete("/:id",authMiddleware(["admin","editor"]),async(req,res)=>{
    try {
        let {id} = req.params 
        if(!id){
            return res.status(200).json({message:"bookid required"})
        }
        let book = await BookModel.findById(id)
        if(!book){
            return res.status(404).json({message:"book is not found"})
        }
        book.isDeleted = true
        await book.save()
        redis.del("books")
        res.status(200).json({message:"Book is deleted",deletedBook:book})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
module.exports = bookRouter;
