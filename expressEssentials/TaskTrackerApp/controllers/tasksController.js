const { readData, writeData } = require("../models/tasksModel");

let getAllTasks = (req, res) => {
  let tasks = readData();
  if (tasks.length == 0) {
    return res.status(404).json({ message: "No tasks are available" });
  }
  res.status(200).json(tasks);
};

let addNewTask = (req, res) => {
  let newTask = req.body;
  let tasks = readData();
  let id = tasks.length == 0 ? 1 : tasks[tasks.length - 1].id + 1;
  newTask = { ...newTask, id, status: "pending" };
  tasks.push(newTask);
  writeData(tasks);
  res.status(200).json({ message: "new Task is added.." });
};

let updateTaskById = (req, res) => {
  let id = req.params.id;
  console.log("id:",id)
  let updatedTask = req.body;
  let tasks = readData();
  if (tasks.length == 0) {
    return res
      .status(404)
      .json({ message: "No tasks are available to update" });
  }
  let index = tasks.findIndex((task) => task.id == id);
  if (index == -1) {
    return res
      .status(404)
      .json({ message: "No tasks are available to update with that id" });
  }
  tasks[index] = { ...updatedTask, id, status: "pending" };
  writeData(tasks);
  res.status(200).json({ message: "Task is Updated.." });
};

let deleteTaskById = (req, res) => {
  let id = req.params.id;
  let tasks = readData();
  if (tasks.length == 0) {
    return res
      .status(404)
      .json({ message: "No tasks are available to delete" });
  }
  let index = tasks.findIndex((task) => task.id === id);
  if (index == -1) {
    return res
      .status(404)
      .json({ message: "No tasks are available to delete with that id" });
  }
  let tasksAfterDeletion = tasks.filter((task) => task.id != id);
  writeData(tasksAfterDeletion);
  res.status(200).json({ message: "Task is Deleted.." });
};

let getTaskByTag = (req, res) => {
  let tagName = req.query.tag;
  let tasks = readData();
  if (tasks.length == 0) {
    return res.status(404).json({ message: "No tasks are available" });
  }
  let tasksWithTag = tasks.filter((task) =>
    task.tag.toLowerCase().includes(tagName.toLowerCase())
  );
  if (tasksWithTag.length == 0) {
    return res
      .status(404)
      .json({ message: "No tasks are available  with that tag Name" });
  }
  res.status(200).json(tasksWithTag);
};

module.exports = {
  getAllTasks,
  addNewTask,
  updateTaskById,
  deleteTaskById,
  getTaskByTag,
};
