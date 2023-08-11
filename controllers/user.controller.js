const User = require("../models/user.model.js");
require("cloudinary");
const AppError = require("../utils/error.utils.js");
const register = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("Email already exits", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });

  if (!user) {
    return next(new AppError("User registration fail please try again", 400));
  }

  // file upload

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;
        //remove file from server
        fs.rm(`upload/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "file not uploaded,please try again", 500)
      );
    }
  }
  await user.save();
  user.password = undefined;

  const token = await User.generateJWTToken();

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};
const login = (req, res) => {};
const logout = (req, res) => {};
const profile = (req, res) => {};

module.exports = {
  register: register,
  login: login,
  logout: logout,
  profile: profile,
};
