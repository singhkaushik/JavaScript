const mongoose = require("mongoose");
const dbUrl = process.env.MONGO_URI;
const database = () => {
  mongoose
    .connect(dbUrl)
    .then((conn) =>
      console.log(`Database Connected with ${conn.connection.host}`)
    )
    .catch((e) => {
      console.log(e.message);
    });
};
module.exports = database;
