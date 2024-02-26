const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected succesfully");
  } catch (err) {
    console.log("Db connection failed", err.message);
  }
};
dbConnect();
module.exports = dbConnect;
