
let authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
let addAuthor = async(req,res)=>{
    try {
        let author = await authorModel.create(req.body)
        res.status(201).json({message:"author Created",author})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
let getAuthors = async(req,res)=>{
    try {
        let authors = await authorModel.find()
        if(authors.length==0){
            res.status(200).json({message:"There is no authors.."})
        }
        res.status(200).json({message:"Authors",authors})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
let authorById = async(req,res)=>{
    try {
        let {authorId} = req.params 
        if(!authorId){
            return res.status(200).json({mesage:"AuthorId is required"})
        }
        let author = await authorModel.findById(authorId)
        if(!author){
            return res.status(404).json({message:"Author is not found.."})
        }
        res.status(200).json({message:"Author found",author})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

let updateAuthorById = async(req,res)=>{
    try {
        let {authorId} = req.params 
        let newDetails = req.body 
        if(!authorId){
            return res.status(200).json({mesage:"AuthorId is required to update.."})
        }
        let author = await authorModel.findByIdAndUpdate(authorId,{$set:newDetails})
        // console.log(author)
        res.status(200).json({message:"Author Updated..",author})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
let deleteAuthorById = async(req,res)=>{
    try {
        let {authorId} = req.params 
        if(!authorId){
            return res.status(200).json({mesage:"AuthorId is required to delete.."})
        }
        let author = await authorModel.findById(authorId)
        if(!author){
            return res.status(200).json({message:"Author is not found to delete"})
        }
        console.log(author)
        await bookModel.deleteMany({author:authorId})
        await authorModel.findByIdAndDelete(authorId)
        res.status(200).json({message:"Author deleted.."})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
module.exports = {addAuthor ,getAuthors ,authorById , updateAuthorById, deleteAuthorById}