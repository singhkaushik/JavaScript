const app = require("./app.js");
const database = require("./config/database.js");
const PORT = process.env.PORT || 4040;

app.listen(PORT, async () => {
  await database();
  console.log(`Server is running on port ${PORT}`);
});
