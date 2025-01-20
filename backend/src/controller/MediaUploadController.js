// const multer = require("multer");
// const path = require("path");
// const dotenv = require("dotenv");
// const { tryCatch } = require("../utils/tryCatch");

// dotenv.config();

// // exports.mediaUpload = tryCatch(async (req, res) => {
// //   res.status(201).json({
// //     success: true,
// //     result: {
// //       url: `http://localhost:${process.env.PORT}/mediaUpload/${req.file.filename}`,
// //     },
// //   });
// // });

// // Storage engine configuration
// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// // Multer configuration
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10 MB
// }).single("profile");

// // Upload handler
// exports.uploadFile = tryCatch((req, res) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//     } else if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Unknown error occurred while uploading the file.",
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       url: `http://localhost:${process.env.PORT}/profile/${req.file.filename}`,
//     });
//   });
// });

// // module.exports = { uploadFile };

const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const { tryCatch } = require("../utils/tryCatch");

dotenv.config();

// Dynamic Storage Engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.params.type; // Get the type from the route parameter
    const validTypes = ["profile", "book"]; // Allowed types
    if (!validTypes.includes(type)) {
      return cb(new Error("Invalid upload type"));
    }
    cb(null, `./upload/${type}Images`);
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size 10 MB
}).single("file");

// Upload handler
exports.uploadFile = tryCatch((req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message:
          err.message || "Unknown error occurred while uploading the file.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded.",
      });
    }

    const type = req.params.type;
    return res.status(200).json({
      success: true,
      url: `http://localhost:${process.env.PORT}/${type}Images/${req.file.filename}`,
    });
  });
});
