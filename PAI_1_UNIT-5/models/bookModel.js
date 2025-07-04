let mongoose = require("mongoose")

let bookSchema = new mongoose.Schema({
    title  : {type:String, required:true},
    author  : {type:mongoose.Schema.Types.ObjectId , ref:"Author"} , 
    year  : Number,
    genre  : String,
    available  : {type:Boolean, default: true}
})
let bookModel = mongoose.model("Book",bookSchema)
module.exports = bookModel ;


