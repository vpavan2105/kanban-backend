const express = require("express");
const { TodoModel } = require("../models/todos.models");
const todoRouter = express.Router();
const { auth } = require('../middleware/auth.middleware')
const { access } = require('../middleware/access.middleware')

todoRouter.get("/", auth, async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.status(200).json(todos );
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
todoRouter.get("/:id", auth,async (req, res) => {
  try {
    const { id } =req.params;
    const todo = TodoModel.findById(id);
    if (todo) {
      const todo = await TodoModel.findOne({ _id: id });
      res.status(200).json( todo );
    } else {
      res.status(200).json({ message: "todo item not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

todoRouter.post("/",auth,access, async (req, res) => {
  console.log(req.body);
  
  try {
    const todo = new TodoModel(req.body);
    await todo.save();
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

todoRouter.patch("/:id",auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = TodoModel.findById(id);
    if (todo) {
      await TodoModel.findOneAndUpdate({ _id: id }, req.body);
      const updatedTodo = await TodoModel.findById(id);

      res.status(200).json(updatedTodo );
    } else {
      res.status(200).json({ message: "todo item not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
todoRouter.delete("/:id",auth,access('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const todo = TodoModel.findById(id);
    if (todo) {
      const deletedTodo = await TodoModel.findOneAndDelete({ _id: id });

      res.status(200).json(deletedTodo);
    } else {
      res.status(200).json({ message: "todo item not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

module.exports = {
  todoRouter,
};
