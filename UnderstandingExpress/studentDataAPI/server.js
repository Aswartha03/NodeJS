let express = require("express");
let app = express();
app.use(express.json());

let fs = require("fs");
// test route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Test Route is Running..." });
});

// all student route
app.get("/students", (req, res) => {
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Users Are there..." });
  }
  res.status(200).json(data);
});

// post new Student Details
app.post("/students", (req, res) => {
  let newStudent = req.body;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  let id = data.length == 0 ? 1 : data[data.length - 1].id + 1;
  newStudent = { ...newStudent, id: id };
  data.push(newStudent);
  fs.writeFileSync("db.json", JSON.stringify(data));
  res.status(200).json({ message: "New Student is added.." });
});
// Update Student By id
app.put("/students/:id", (req, res) => {
  let id = req.params.id;
  let newStudentDetails = req.body;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Users Are there to Update..." });
  }
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "No User there to update with that id.." });
  } else {
    data[index] = { ...newStudentDetails, id: id };
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(200).json({ message: "Student Updated.." });
  }
});
// Delete Student by ID
app.delete("/students/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Users Are there to Delete.." });
  }
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "No User there to delete with that id.." });
  } else {
    let dataAfterDeletion = data.filter((student) => student.id != id);
    fs.writeFileSync("db.json", JSON.stringify(dataAfterDeletion));
    res.status(200).json({ message: "Student Deleted.." });
  }
});
// get student details by course name
app.get("/students/search", (req, res) => {
  let courseName = req.query.course;

  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Users Are there" });
  }
  let studentsWithCourseName = data.filter((student) =>
    student.course.toLowerCase().includes(courseName.toLowerCase())
  );
  if(studentsWithCourseName.length==0){
        res.status(404).json({ message: "No Users Are there with that coursename.." });
  }

  res.status(200).json(studentsWithCourseName);
});

// get Student details by id

app.get("/students/:id", (req, res) => {
  let id = req.params.id;
  let data = JSON.parse(fs.readFileSync("db.json", "utf-8"));
  if (data.length == 0) {
    res.status(404).json({ message: "No Users Are there.." });
  }
  let index = -1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    res.status(404).json({ message: "No User there with that id.." });
  } else {
    res.status(200).json(data[index]);
  }
});

// any undefined routes
app.get("*", (req, res) => {
  res.status(404).json({ message: "Route is Not Found.." });
});
app.listen(3200, () => {
  console.log("Server is running on the 3200 port...");
});
