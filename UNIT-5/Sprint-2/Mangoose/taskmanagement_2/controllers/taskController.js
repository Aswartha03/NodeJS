const taskModel = require("../models/taskModel");

let getAllTasks = async (req, res) => {
  try {
    let allTasks = await taskModel.find();
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", tasks: allTasks });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

let addNewTask = async (req, res) => {
  try {
    let newtask = req.body;
    let { priority } = newtask;
    if (priority) {
      newtask = { ...newtask, priority: priority.toLowerCase() };
    }
    await taskModel.create(newtask);
    res.status(200).json({ message: "New Task is Added.." });
  } catch (error) {
    // console.log("Error",error)
    res.status(500).json({ message: "Something went wrong.." });
  }
};

let updateTaskById = async (req, res) => {
  try {
    let id = req.params.id;
    let newDetails = req.body;
    if (newDetails) {
      await taskModel.findByIdAndUpdate(id, {
        ...newDetails,
        isCompleted: true,
        completionDate: new Date().toISOString(),
      });
    } else {
      await taskModel.findByIdAndUpdate(id, {
        isCompleted: true,
        completionDate: new Date().toISOString(),
      });
    }
    res.status(200).json({ message: "Task is updated" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.." });
  }
};

let deleteTaskBypriority = async (req, res) => {
  try {
    let priority = req.query.priority?.toLowerCase();
    // console.log(priority)
    if (!priority) {
      return res
        .status(400)
        .json({ message: "Priority query param is required" });
    }
    let result = await taskModel.deleteMany({ priority });

    res.status(200).json({
      message: `${result.deletedCount} task(s) deleted.`,
    });
  } catch (error) {
    // console.error("Delete error:", error);
    res.status(500).json({ message: "Something went wrong.." });
  }
};


module.exports = {
  getAllTasks,
  addNewTask,
  updateTaskById,
  deleteTaskBypriority,
};
