let express = require("express");
const taskModel = require("../models/taskModel");
let tasksRouter = express.Router();

tasksRouter.get("/all-tasks", async (req, res) => {
  try {
    let tasks = await taskModel.find();
    res.status(200).json({ message: "tasks", tasks });
  } catch (error) {
    res.status.apply(500).json({ message: "Something Went Wrong.." });
  }
});

tasksRouter.post("/add-task", async (req, res) => {
  try {
    let newTask = req.body;
    newTask = { ...newTask, dueDate: new Date().toISOString() };
    await taskModel.create(newTask);
    res.status(200).json({ message: "Task is Added" });
  } catch (error) {
    res.status(500).json({ message: "Something Went Wrong.." });
  }
});

tasksRouter.patch("/update-task/:id",async(req,res)=>{
    try {
        let id = req.params.id 
        await taskModel.findByIdAndUpdate(id,{status:"completed"})
        res.status(200).json({ message: "Task is Updated" });
    } catch (error) {
         res.status(500).json({ message: "Something Went Wrong.." })
    }
})

tasksRouter.delete("/delete-task/:id",async(req,res)=>{
    try {
        let id = req.params.id 
        await taskModel.findByIdAndDelete(id)
        res.status(200).json({ message: "Task is Deleted" });
    } catch (error) {
         res.status(500).json({ message: "Something Went Wrong.." })
    }
})
module.exports = tasksRouter;
