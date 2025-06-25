let express = require("express");
const tasksRouter = require("./routes/tasksRouter");

let app = express();
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is working.." });
});
// tasks router
app.use("/tasks", tasksRouter);
// any undefined route
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found" });
});

app.listen(3000, () => {
  console.log("Server is running on the port 3000..");
});
