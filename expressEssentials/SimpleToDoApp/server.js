let express = require("express");
const todosRouter = require("./routes/todosRouter");

let app = express();

app.use(express.json());


// test route
todosRouter.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Working.." });
});
// todosRouter
app.use("/todos",todosRouter)


// undefined route
todosRouter.get("*", (req, res) => {
  res.status(404).json({ message: "404 Route Not Found" });
});
let isRunning = () => {
  console.log("Server is Runnig on the 3200 port..");
};
app.listen(3200, isRunning);
