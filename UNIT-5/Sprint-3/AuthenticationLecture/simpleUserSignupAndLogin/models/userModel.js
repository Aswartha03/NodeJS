let mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true ,required:true},
  password: String 
});

let userModel = mongoose.model("users",userSchema)
module.exports = userModel ;