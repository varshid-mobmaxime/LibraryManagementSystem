const { getMessages, sendMessage } = require("../controller/MessageController");
const router = require("express").Router();
const { authenticate, authorize } = require("../middleware/auth");

// router.post("/add/", authenticate, addMessage);
// router.post("/get/", authenticate, getMessages);

router.get("/:id", authenticate, getMessages);
router.post("/send/:id", authenticate, sendMessage);

module.exports = router;
