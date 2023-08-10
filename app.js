const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/ping", (req, res) => {
  res.status(200).send("<h1>Welcome To Your Page</h1>");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>OPPS! 404 Page not found</h1>");
});
module.exports = app;
