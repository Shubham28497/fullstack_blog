const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongoUrl");
    console.log("DB connected succesfully");
  } catch (err) {
    console.log("Db connection failed", err.message);
  }
};
dbConnect();
module.exports = dbConnect;
