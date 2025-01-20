const Book = require("../models/Book");
const User = require("../models/User");
const { tryCatch } = require("../utils/tryCatch");
const APIFeatures = require("../utils/ApiFeature");
const { decodeToken } = require("../utils/jwt.utils");
const { BOOK_REQUEST_STATUS } = require("../constants");
const BookRequest = require("../models/BookRequest");
const { getRequestBookStatusString } = require("../utils");

// exports.addToFavourits = tryCatch(async (req, res, next) => {
//   const { bookId } = req.body;
//   const authorization = req.headers["authorization"] ?? "";
//   const { _id } = decodeToken(authorization)?.user;
//   const userData = await User.findById(_id);
//   const isBookFavourite = userData.favourites.includes(bookId);
//   if (isBookFavourite) {
//     return next({
//       message: "Book already in favourite.",
//     });
//   }
//   await User.findByIdAndUpdate(_id, { $push: { favourites: bookId } });
//   return next({
//     message: "Book added in favourite list.",
//   });
// });

// exports.removeToFavourits = tryCatch(async (req, res, next) => {
//   const { bookId } = req.body;
//   const authorization = req.headers["authorization"] ?? "";
//   const { _id } = decodeToken(authorization)?.user;
//   const userData = await User.findById(_id);
//   const isBookFavourite = userData.favourites.includes(bookId);

//   // if (!isBookFavourite) {
//   //   return next({
//   //     message: "Book is not in favourite.",
//   //   });
//   // }
//   isBookFavourite &&
//     (await User.findByIdAndUpdate(_id, { $pull: { favourites: bookId } }));
//   return next({
//     message: "Book Removed from favourite list.",
//   });
// });

exports.favourits = tryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const { bookId } = req.body;

  // Validate input
  if (!bookId) {
    return res
      .status(400)
      .json({ success: false, message: "Book ID is required." });
  }

  // Fetch user data
  const userData = await User.findById(userId);
  if (!userData) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // Fetch book data
  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found." });
  }

  // Check if the book is already a favourite
  const isBookFavourite = userData.favourites.includes(bookId);

  // Fetch book request data
  const bookRequest = await BookRequest.findOne({ user: userId, book: bookId });
  const isRequested = !!bookRequest;

  // Update user's favourites list
  await User.findByIdAndUpdate(
    userId,
    isBookFavourite
      ? { $pull: { favourites: bookId } }
      : { $push: { favourites: bookId } }
  );

  // Prepare response
  const message = isBookFavourite
    ? "Book removed from favourite list."
    : "Book added in favourite list.";

  const result = {
    ...book.toObject(),
    isFavourite: !isBookFavourite,
    status: isRequested
      ? bookRequest?.status
      : BOOK_REQUEST_STATUS.NotRequested,
    statusName: getRequestBookStatusString(
      isRequested ? bookRequest?.status : 0
    ),
  };

  // Send response
  return res.status(201).json({ success: true, message, result });
});
