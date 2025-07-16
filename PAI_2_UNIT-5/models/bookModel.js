let mongoose = require ('mongoose');
let bookSchema = new mongoose.Schema ({
  bookname: {type: String, required: true},
  description: {type: String},
  price: {type: Number, required: true},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authors',
    required: true,
  },
  isDeleted:{type:String,default:false}
});
let BookModel = mongoose.model ('books', bookSchema);
module.exports = BookModel;
