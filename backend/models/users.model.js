const mongoose = require("mongoose");

const User_Schema = new mongoose.Schema({
  username: String,
  password: String,
  role : {type : String , enum : ["user", "admin"], default : "user" },
  email: String,
});

const UserModel = mongoose.model("users", User_Schema);

module.exports = {
  UserModel,
};
