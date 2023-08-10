const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    maxlenght: 25,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 160,
    required: true,
    select: false,
  },
});

const User = model("User", userSchema);

model.exports = User;
