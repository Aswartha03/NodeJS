let express = require("express");
const apiRouter = require("./routes/api");
let app = express();
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working" });
});
// router 
app.use("/api", apiRouter);
// any undefined route
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found.." });
});

app.listen(3000, () => {
  console.log("Server is Running on the 3000 port..");
});
