const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.model");
const userRouter = express.Router();
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res
      .status(200)
      .json({ message: `${req.body.username} registered successfully` });
  } catch (err) {
    res.status(404).json({ message: err });
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const isPassword = user.password === password;
      if (isPassword) {
       
        jwt.sign(
          { role : user.role },
          process.env.SECRET_KEY,
          (err, token) => {
            if (err) {
              console.log(err);
              return res.status(200).json({ message: "Error signing" });
            } else {
              return res.status(200).json({ token });
            }
          }
        );
      } else {
        res.status(200).json({ message: "Passwords incorrect" });
      }
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(404).json({ message: err });
  }
});



module.exports = {
  userRouter,
};
