const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {type : String, enum :["pending", "inprogress", "completed"],default: "pending"},
  due_date: String,
});

const TodoModel = mongoose.model("todos", TodoSchema);

module.exports = {
  TodoModel,
};
