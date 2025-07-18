let mongoose = require ('mongoose');
require ('dotenv').config ();

let connectToDb = async () => {
  try {
    await mongoose.connect (process.env.MONGO_URL);
    console.log ('connected to db');
  } catch (error) {
    console.log (error.message);
  }
};

module.exports = connectToDb;
