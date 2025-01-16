const router = require("express").Router();

const {
  requestBook,
  requestBookList,
  updateBookStatus,
  requestUserBookList,
} = require("../controller/RequestBookController");

const { authenticate, authorize } = require("../middleware/auth");

//Request Book
router.post("/", authenticate, requestBook);
router.post(
  "/update-record",
  authenticate,
  // authorize(["admin"]),
  updateBookStatus
);
router.get("/list", authenticate, authorize(["admin"]), requestBookList);
router.get("/user", authenticate, requestUserBookList);

module.exports = router;
