let express = require("express");
let app = express();
app.use(express.json());

// test route
app.get("/test", (req, res) => {
  res.send("Test route is running..");
});
// single user route

app.get("/users/get", (req, res) => {
  res.json({ id: 1, name: "John Doe", email: "john@example.com" });
});

// list of users route
app.get("/users/list", (req, res) => {
  res.json([
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
    { id: 3, name: "Bob Smith", email: "bob@example.com" },
  ]);
});

app.get("*", (req, res) => {
  res.send("404 Not Found...");
});

app.listen(3400, () => {
  console.log("server is running on the 3400 port..");
});
