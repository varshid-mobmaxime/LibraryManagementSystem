const Book = require("../models/Book");
const { tryCatch } = require("../utils/tryCatch");
const APIFeatures = require("../utils/ApiFeature");
const User = require("../models/User");
const { decodeToken } = require("../utils/jwt.utils");

exports.getBooks = tryCatch(async (req, res) => {
  const advancedQuery = new APIFeatures(Book.find({}), req.query)
    .sort()
    .paginate()
    .fields()
    .filter();
  const books = await advancedQuery.query;

  const userId = req.user._id;

  const { favourites } = await User.findById(userId);

  const booksWithFavouriteFlag = books.map((book) => {
    return {
      ...book.toObject(), // Convert Mongoose document to plain object
      isFavourite: favourites.includes(book._id), // Check if book._id is in favourites
    };
  });

  res
    .status(201)
    .json({ success: true, result: { books: booksWithFavouriteFlag } });
});

exports.getBook = tryCatch(async (req, res) => {
  const book = await Book.findById(req.params.id);

  const userId = req.user._id;
  const { favourites } = await User.findById(userId);

  const booksWithFavouriteFlag = {
    ...book,
    isFavourite: favourites.includes(req.params.id),
  };

  res.status(201).json({ success: true, result: book });
});

exports.addBook = tryCatch(async (req, res) => {
  const { title, url, author, copies, language, desc } = req.body;
  const book = await Book.create({
    title,
    url,
    author,
    copies,
    language,
    desc,
  });

  res.status(201).json({
    success: true,
    data: book,
  });
});

exports.updateBook = tryCatch(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!book) {
    return next({
      message: "Book not found",
    });
  }

  //   if (book.user.toString() !== req.user._id) {
  //     return next({
  //       message: "Not authorized to update the comment",
  //     });
  //   }

  book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  book.save();

  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.deleteBook = tryCatch(async (req, res, next) => {
  let book = await Book.findById(req.params.id);

  if (!Book) {
    return next({
      message: "Book not found",
    });
  }
  //   if (Book.user.toString() !== req.user._id) {
  //     return next({
  //       message: "Not authorized to delete the comment",
  //     });
  //   }

  await book.remove();

  res.status(200).json({
    success: true,
    message: "Book deleted Successfully.",
    data: {},
  });
});
