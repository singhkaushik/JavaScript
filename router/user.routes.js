const { Router } = require("express");
const {
  register,
  login,
  logout,
  profile,
} = require("../controllers/user.controller");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/profile", profile);
module.exports = router;
