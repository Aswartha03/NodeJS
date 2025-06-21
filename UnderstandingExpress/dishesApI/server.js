let express = require("express");
let app = express();
app.use(express.json());
let fs = require("fs");
const { json } = require("stream/consumers");
// test route
app.get("/test", (req, res) => {
  res.status(200).send("Test Route is Running...");
});
// get request
app.get("/dishes", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let dishes = data.Dishes; // all dishes in the db.json
  res.status(200).json(dishes);
});
// post request
app.post("/dishes", (req, res) => {
  let newDish = req.body;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let dishes = data.Dishes; // all dishes in the db.json
  let id = dishes[dishes.length - 1].id + 1;
  newDish = { ...newDish, id: id };
  dishes.push(newDish);
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json({ message: "New Dish is Added.." });
});

/// put request
app.put("/dishes/:id", (req, res) => {
  let id = req.params.id; // id from input
  let newDish = req.body; // new Updated dish
  // console.log(id);
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let dishes = data.Dishes; // all dishes in the db.json
  //updating
  let index = -1;
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "404 Dish is Not Found.." });
  } else {
    dishes[index] = newDish;
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(200).json({ message: "Dish is Updated .." });
  }
});

// delete Route
app.delete("/dishes/:id", (req, res) => {
  let id = req.params.id; // id from input
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let dishes = data.Dishes; // all dishes in the db.json
  // console.log("Before Delete", dishes);
  let index = -1;
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "404 Dish is Not Found to Delete .." });
  } else {
    let AfterDeletionDishes = dishes.filter((dish, index) => dish.id != id);
    data.Dishes = AfterDeletionDishes;
    // console.log(AfterDeletionDishes);
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(200).json({ message: "Dish is Deleted.." });
  }
});

// dish Details by name 

app.get("/dishes/get",(req,res)=>{
  let name = req.query.name
  if(!name){
    res.status(404).json({message:`Please Enter valid name...`})
  }
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let dishes = data.Dishes; // all dishes in the db.json
  let requiredDishes = dishes.filter((dish)=>dish.name.toLowerCase()==name.toLowerCase()) 
  console.log(requiredDishes)
  if(requiredDishes.length==0){
    res.status(404).json({message:`404 Dish Not Found...`})
  }
  else {
      res.json(requiredDishes)
  }
})

// dish details by id route
app.get("/dishes/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let dishes = data.Dishes; // all dishes in the db.json
  // console.log("Before Delete", dishes);
  let index = -1;
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "404 Dish is Not Found " });
  } else {
    let required = dishes[index];
    res.status(200).json(required);
  }
});


// undefined route
app.get("*", (req, res) => {
  res.status(404).json({ message: "404 Route Not Found.." });
});
app.listen(3000, () => {
  console.log("Server is running on the 3000 port..");
});

// Dish Details By id  ROute
