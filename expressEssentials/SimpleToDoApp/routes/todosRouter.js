let express = require("express");
const {
  allTodos,
  addTodo,
  updateTodoByID,
  deleteTodoByID,
  getTodosByTitle,
} = require("../controllers/todoController");
let todosRouter = express.Router();

// all todos
todosRouter.get("/all-todos", allTodos);

// add new todo
todosRouter.post("/add-todo", addTodo);

// update by id
todosRouter.put("/update-todo/:id", updateTodoByID);

// delete by id
todosRouter.delete("/dlt-todo/:id", deleteTodoByID);

// get todo details by their title
todosRouter.get("/todo/search", getTodosByTitle);

module.exports = todosRouter;
