let express = require("express");
const taskRouter = require("./routes/taskRoutes");
let app = express();
app.use(express.json());

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working" });
});
// task Router
app.use("/tasks", taskRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found.." });
});
app.listen(3000, () => {
  console.log("Server is running on the port 3000");
});
