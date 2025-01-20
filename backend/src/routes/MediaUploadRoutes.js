const router = require("express").Router();
const { authenticate } = require("../middleware/auth");
const { uploadFile } = require("../controller/MediaUploadController");

// Upload route
router.post("/:type", uploadFile);

module.exports = router;
