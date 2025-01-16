const router = require("express").Router();

const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controller/UserController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/users", authenticate, authorize(["admin"]), getUsers);
router.put("/update-user/:id", authenticate, authorize(["admin"]), updateUser);
router.delete(
  "/delete-user/:id",
  authenticate,
  authorize(["admin"]),
  deleteUser
);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
