let express = require("express");
const {
  getAllTasks,
  addNewTask,
  updateTaskById,
  deleteTaskById,
  getTaskByTag,
} = require("../controllers/tasksController");
const { dataCheckMiddleware } = require("../middlewares/tasksMiddleware");

let tasksRouter = express.Router();

// get all tasks
tasksRouter.get("/tasks", getAllTasks);
// get task by tag 
tasksRouter.get("/tasks/filter" , getTaskByTag)
// add new task
tasksRouter.post("/tasks", dataCheckMiddleware,addNewTask);
// update task by id
tasksRouter.put("/tasks/:id", updateTaskById);
// delete task by id
tasksRouter.delete("/tasks/:id", deleteTaskById);


module.exports = { tasksRouter };
