const multer = require("multer");

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: 0,
      message: err.message,
    });
  }
  return res.status(500).json({
    success: 0,
    message: "Internal Server Error",
  });
}

module.exports = {
  notFound,
  errorHandler,
};
