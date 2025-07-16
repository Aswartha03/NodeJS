let mongoose = require ('mongoose');
let authorSchema = new mongoose.Schema ({
  name: {type: String, required: true},
  gender: {type: String, enum: ['male', 'female'], required: true},
  isDeleted: {type: String, default: false},
});

let AuthorModel = mongoose.model ('authors', authorSchema);
module.exports = AuthorModel;
