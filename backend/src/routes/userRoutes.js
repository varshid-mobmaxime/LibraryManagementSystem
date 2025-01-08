const router = require("express").Router();

const {
  register,
  login,
  changePassword,
} = require("../controller/UserController");
const { authenticate } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authenticate, changePassword);

module.exports = router;
