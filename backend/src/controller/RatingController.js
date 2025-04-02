const Book = require("../models/Book");
const Rating = require("../models/Rating");

const { tryCatch } = require("../utils/tryCatch");

exports.addRating = tryCatch(async (req, res, next) => {
  const { bookId, rating } = req.body;
  const userId = req.user._id;

  // Validate bookId
  if (!bookId) {
    return res
      .status(400)
      .json({ success: false, message: "Book ID is required" });
  }

  // Check if the book exists
  const book = await Book.findById(bookId);
  if (!book) {
    return next({
      message: "Book not found",
    });
  }

  // Update rating if it exists, otherwise create a new one
  const updatedRating = await Rating.findOneAndUpdate(
    { book: bookId, user: userId }, // Find by bookId and userId
    { rating }, // Update the rating
    { new: true, upsert: true, setDefaultsOnInsert: true } // Create a new document if not found
  );

  res.status(201).json({
    success: true,
    message: updatedRating.wasNew
      ? "Rating added successfully"
      : "Rating updated successfully",
    data: updatedRating,
  });
});
