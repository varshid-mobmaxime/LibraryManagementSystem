const router = require("express").Router();

const { getUserBookDetails } = require("../controller/BooksController");
const {
  getUser,
  register,
  login,
  changePassword,
  updateProfilePic,
} = require("../controller/UserController");
const { authenticate } = require("../middleware/auth");

router.post("/register", register);
router.get("/:id", authenticate, getUser);
router.post("/login", login);
router.post("/change-password", authenticate, changePassword);
router.post("/update-profile", authenticate, updateProfilePic);
router.get("/book-history/:id", authenticate, getUserBookDetails);

module.exports = router;
