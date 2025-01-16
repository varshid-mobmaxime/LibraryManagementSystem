const Book = require("../models/Book");
const User = require("../models/User");
const { tryCatch } = require("../utils/tryCatch");
const APIFeatures = require("../utils/ApiFeature");
const { decodeToken } = require("../utils/jwt.utils");

exports.favourits = tryCatch(async (req, res, next) => {
  const userId = req.user._id;

  const { bookId } = req.body;

  const userData = await User.findById(userId);

  const isBookFavourite = userData.favourites.includes(bookId);

  if (!bookId) {
    res.status(400).json({ message: "Book ID is required." });
  }

  if (!userData) {
    res.status(404).json({ message: "User not found." });
  }

  const book = await Book.findById(bookId);

  isBookFavourite
    ? await User.findByIdAndUpdate(userId, { $pull: { favourites: bookId } })
    : await User.findByIdAndUpdate(userId, { $push: { favourites: bookId } });

  if (isBookFavourite) {
    res.status(201).json({
      message: "Book Removed from favourite list.",
      result: { ...book.toObject(), isFavourite: !isBookFavourite },
    });
  } else {
    res.status(201).json({
      message: "Book added in favourite list.",
      result: { ...book.toObject(), isFavourite: !isBookFavourite },
    });
  }
});

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
