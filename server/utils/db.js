const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
// mongoose.connect();
const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection succesfull to db");
  } catch (error) {
    console.error("Database Connection Failed");
    process.exit();
  }
};

module.exports = connectDb;
