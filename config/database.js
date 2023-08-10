const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const dbUrl = process.env.MONGO_URI;
const database = async () => {
  try {
    const { connection } = await mongoose.connect(dbUrl);
    if (connection) {
      console.log(`Database connected at ${dbUrl}`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
module.exports = database;
