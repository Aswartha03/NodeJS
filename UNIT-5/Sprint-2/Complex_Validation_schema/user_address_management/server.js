let express = require("express");
const connectToDB = require("./configs/db");
const userRouter = require("./routes/userRouter");
let app = express();
app.use(express.json());

connectToDB();// connecting mongoDB to nodeJS

// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working" });
});

// users route
app.use("/users", userRouter);

// undefined route
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found" });
});

app.listen(3000, () => {
  console.log("Server is Running on the 3000 port..");
});
