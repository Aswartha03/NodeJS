let express = require("express");
let app = express();
app.use(express.json());
let fs = require("fs");
// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Running..." });
});

// get all the books
app.get("/books", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Books Are there..." });
  }
  res.status(200).json(data);
});
// post route
app.post("/books", (req, res) => {
  let newBook = req.body;
  //   console.log(newBook)
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  //   console.log(data)
  let id = data.length == 0 ? 1 : data[data.length - 1].id + 1;
  newBook = { ...newBook, id: id };
  console.log("New : ", newBook);
  data.push(newBook);
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json({ message: "New Book is Added" });
});

// updating book route by id
app.put("/books/:id", (req, res) => {
  let id = req.params.id;
  let newData = req.body;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Books are there..." });
  }
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "404 Not Found Book to Update" });
  } else {
    data[index] = { ...newData, id: id };
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(200).json({ message: "Book is Updated..." });
  }
});

// delete book using id
app.delete("/books/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Books Are there.." });
  }
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "404 Not Found Book to Delete.." });
  } else {
    let newDataAfterDeletion = data.filter((book) => book.id != id);
    fs.writeFileSync("db.json", JSON.stringify(newDataAfterDeletion));
    res.status(200).json({ message: "Book is Deleted......" });
  }
});

//get book details by id

app.get("/books/search", (req, res) => {
  let authorName = req.query.author;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Books Are there.." });
  }
  let books = data.filter(
    (b) => b.author.toLowerCase() === authorName.toLowerCase()
  );
  if (books.length == 0) {
    res
      .status(404)
      .json({ message: "404 Not Found Book with that authorname.." });
  } else {
    res.status(200).json(books);
  }
});

// get book details by id
app.get("/books/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Books Are there.." });
  }
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "404 Not Found Book with that id" });
  } else {
    res.status(200).json(data[index]);
  }
});
// any undefined Route

app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Not Found the Route.." });
});
app.listen(3000, () => {
  console.log("Server is runnig on 3000 port..");
});
