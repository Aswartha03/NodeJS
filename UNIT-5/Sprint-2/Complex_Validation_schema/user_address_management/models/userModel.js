let mongoose = require("mongoose");
let addressSchema = new mongoose.Schema({
  street: String,
  city:String , 
  state: String,
  country: { type: String, default: "India" },
  pincode: Number,
});
let userSchema = new mongoose.Schema({
  name: {type:String,required:true} ,
  email: {type:String,required:true , unique:true},
  age: {type:Number , min:20 ,max:100 },
  address: [addressSchema],
});

let userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
