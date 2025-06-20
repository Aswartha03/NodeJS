let express = require("express");
let app = express();

// basic test route

app.get("/test", (req, res) => {
  res.send("Test Route is Running...");
});

// read file route using path module

let readFile = require("../pathFiles/fileInfo");

app.get("/fileinfo", (req, res) => {
  let result = readFile("file/data.txt");
  res.send(result);
});

// url data using url module route
let urlDataProvide = require("../pathFiles/urlparser");
app.get("/parseurl", (req, res) => {
  console.log("Url Data From url Module...");
  let UrlDetails = urlDataProvide(
    "https://masaischool.com/course?name=backend&duration=6weeks"
  );
  res.send(UrlDetails);
});

app.listen(3400, () => {
  console.log("Server is Running on the 3400 port...");
});
