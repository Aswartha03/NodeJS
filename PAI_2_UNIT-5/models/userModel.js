let mongoose = require ('mongoose');
let userSchema = new mongoose.Schema ({
  email: {type: String, required: true, default: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['viewer', 'editor', 'admin'], default: 'viewer'},
});

let UserModel = mongoose.model ('users', userSchema);

module.exports = UserModel;
