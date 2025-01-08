const router = require("express").Router();
const { favourits } = require("../controller/FavouritesController");
const { authenticate } = require("../middleware/auth");

router.post("/favourite", authenticate, favourits);
// router.post("/remove-favourite", authenticate, removeToFavourits);

module.exports = router;
