const { readFile, writeFile, findIndex } = require("../models/todoModel");

let allTodos = (req, res) => {
  let todosArray = readFile();
  if (todosArray.length == 0) {
    res.status(404).json({ message: "There are No todos.." });
  }
  res.status(200).json(todosArray);
};

let addTodo = (req, res) => {
  let newTodo = req.body;
  let todosArray = readFile();
  let id =
    todosArray.length == 0 ? 1 : todosArray[todosArray.length - 1].id + 1;
  newTodo = { ...newTodo, id: id };
  todosArray.push(newTodo);
  writeFile(todosArray);
  res.status(200).json({ message: "New ToDo Added..." });
};

let updateTodoByID = (req, res) => {
  let id = req.params.id;
  let todosArray = readFile();
  if (todosArray.length == 0) {
    res.status(404).json({ message: "No ToDo to Update..." });
  }
  let index = findIndex(-1, todosArray, id);
  if (index == -1) {
    res.status(404).json({ message: "No ToDo With that id to update.." });
  } else {
    todosArray[index] = { ...todosArray[index], completed: true };
    writeFile(todosArray);
    res.status(200).json({ message: "Todo Updated..." });
  }
};

let deleteTodoByID = (req, res) => {
  let id = req.params.id;
  let todosArray = readFile();
  if (todosArray.length == 0) {
    res.status(404).json({ message: "No ToDo to Delete" });
  }
  let index = findIndex(-1, todosArray, id);
  if (index == -1) {
    res.status(404).json({ message: "No ToDo With that id to Delete" });
  } else {
    todosArray = todosArray.filter((todo) => todo.id != id);
    writeFile(todosArray);
    res.status(200).json({ message: "Todo Deleted..." });
  }
};

let getTodosByTitle = (req, res) => {
  let title = req.query.q;
  let todosArray = readFile();
  if (todosArray.length == 0) {
    res.status(404).json({ message: "There is No ToDos" });
  }
  let searchedTodos = todosArray.filter((todo) =>
    todo.title.toLowerCase().includes(title.toLowerCase())
  );
  if (searchedTodos.length == 0) {
    res.status(404).json({ message: "There is No ToDos with that title.." });
  } else {
    res.status(200).json(searchedTodos);
  }
};

module.exports = {
  addTodo,
  allTodos,
  getTodosByTitle,
  updateTodoByID,
  deleteTodoByID,
};
