const router = require("express").Router();

const { addRating } = require("../controller/RatingController");

const { authenticate, authorize } = require("../middleware/auth");

// Book Rating
router.post("/", authenticate, addRating);

module.exports = router;
