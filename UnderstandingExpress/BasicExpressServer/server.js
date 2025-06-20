let express = require("express");

let app = express();

app.use(express.json());
    
// test route
app.get("/test", (req, res) => {
  console.log("Test route is running...");
  res.send("Test route is running..");
});

//home route

app.get("/home", (req, res) => {
  res.send("<h2>Welcome to Home Page</h2>");
});
// aboutus route

app.get("/aboutus", (req, res) => {
  res.json({ message: "Welcome to About Us" });
});
// contactus route

app.get("/contactus", (req, res) => {
  res.json({ Email: "aswarth3@gmail.com", Phone: 6366908426 });
});

// undefined route
app.get("*", (req, res) => {
  res.send("404 Not Found!!");
});
app.listen(3000, () => {
  console.log("Server is runnig on 3000 port....");
});
