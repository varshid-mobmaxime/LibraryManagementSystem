const router = require("express").Router();
const {
  addBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} = require("../controller/BooksController");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", authenticate, getBooks);
router.get("/:id", authenticate, getBook);
router.post("/", authenticate, authorize(["admin"]), addBook);
router.put("/:id", authenticate, authorize(["admin"]), updateBook);
router.delete("/:id", authenticate, authorize(["admin"]), deleteBook);

module.exports = router;
