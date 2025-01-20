const router = require("express").Router();

const {
  requestBook,
  requestBookList,
  updateBookStatus,
  requestUserBookList,
  requestUserIssuedBookList,
  requestUserRequestBookList,
  requestUserReturnBookList,
  requestUserCancelBookList,
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
router.get("/user/:id", authenticate, requestUserBookList);
router.get("/user-request", authenticate, requestUserRequestBookList);
router.get("/user-issue", authenticate, requestUserIssuedBookList);
router.get("/user-return", authenticate, requestUserReturnBookList);
router.get("/user-cancel", authenticate, requestUserCancelBookList);

module.exports = router;
