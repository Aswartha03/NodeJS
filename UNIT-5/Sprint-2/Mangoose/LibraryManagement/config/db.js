// let mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/LibraryDB");
// module.exports = mongoose;
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/LibraryDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
  serverSelectionTimeoutMS:5000
});

mongoose.connection.on("connected", () => {
  console.log("✅ Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose disconnected");
});

module.exports = mongoose;
