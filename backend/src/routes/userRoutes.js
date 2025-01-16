const router = require("express").Router();

const {
  getUser,
  register,
  login,
  changePassword,
} = require("../controller/UserController");
const { authenticate } = require("../middleware/auth");

router.post("/register", register);
router.get("/:id", authenticate, getUser);
router.post("/login", login);
router.post("/change-password", authenticate, changePassword);

module.exports = router;
