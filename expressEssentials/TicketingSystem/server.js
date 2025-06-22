let express = require("express");
const { ticketsRouter } = require("./routes/ticketsRouter");

let app = express();
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Running.." });
}) /
  // tickets Router ..
  app.use("/tickets", ticketsRouter);

// undefined Route
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 , Route is not found..." });
});
// port 
app.listen(3000, () => {
  console.log("Server is running on the 3000 port..");
});
