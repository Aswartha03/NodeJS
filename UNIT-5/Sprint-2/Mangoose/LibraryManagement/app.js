let express = require("express");
const libraryRouter = require("./routes/libraryRoutes");
const { default: mongoose } = require("./config/db");
let app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is working.." });
});

app.use("/library",libraryRouter)

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found.." });
});

// app.listen(3000, () => {
//   console.log("Server is running on the 3000 port..");
// });
mongoose.connection.once("open", () => {
  // console.log("✅ MongoDB connected successfully");
  app.listen(3000, () => {
    console.log("🚀 Server is running on http://localhost:3000");
  });
});
