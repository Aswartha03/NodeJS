let express = require("express");
const {
  getAllTasks,
  addNewTask,
  updateTaskById,
  deleteTaskBypriority,
} = require("../controllers/taskController");
const dataValidationMiddleware = require("../middlewars/taskMiddleware");
let taskRouter = express.Router();

taskRouter.get("/all-tasks", getAllTasks);
taskRouter.post("/add-task",dataValidationMiddleware, addNewTask);
taskRouter.patch("/update-task/:id", updateTaskById);
taskRouter.delete("/delete-task?:priority", deleteTaskBypriority);
module.exports = taskRouter;
