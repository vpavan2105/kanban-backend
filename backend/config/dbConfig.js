const mongoose = require("mongoose");
require("dotenv").config();

const connectionToDB = async () => {
  await mongoose.connect(process.env.MONGO_STR);
};

module.exports = {
  connectionToDB,
};
