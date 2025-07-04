
let mongoose = require("mongoose")
let authorSchema = new mongoose.Schema({
    name : {type:String , required : true} , 
    birthYear : Number , 
    nationality : String 
})
let authorModel = mongoose.model("Author",authorSchema)
module.exports = authorModel ;