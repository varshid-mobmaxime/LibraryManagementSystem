const Book = require("../models/Book");
const { tryCatch } = require("../utils/tryCatch");
const APIFeatures = require("../utils/ApiFeature");
const User = require("../models/User");
const { decodeToken } = require("../utils/jwt.utils");
const BookRequest = require("../models/BookRequest");
const { getRequestBookStatusString } = require("../utils");
const { BOOK_REQUEST_STATUS } = require("../constants");

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

exports.getFavouriteBooks = tryCatch(async (req, res) => {
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

  const FavBooks = booksWithFavouriteFlag?.filter(
    (bookObj) => bookObj?.isFavourite
  );

  res.status(201).json({ success: true, result: { books: FavBooks } });
});

exports.getBook = tryCatch(async (req, res) => {
  const book = await Book.findById(req.params.id);

  const userId = req.user._id;
  const { favourites } = await User.findById(userId);

  const isBookFavourite = favourites.includes(req.params.id);

  //Book request
  const bookRequest = await BookRequest.findOne({
    user: userId,
    book: req.params.id,
    status: { $nin: [BOOK_REQUEST_STATUS.Return, BOOK_REQUEST_STATUS.Cancel] },
  });

  const isRequested = !!bookRequest;

  const booksWithFavouriteFlag = {
    ...book.toObject(),
    isFavourite: isBookFavourite,
    status: isRequested
      ? bookRequest?.status
      : BOOK_REQUEST_STATUS.NotRequested,
    statusName: getRequestBookStatusString(
      isRequested ? bookRequest?.status : 0
    ),
  };

  console.log("requestBooks is =--> ", booksWithFavouriteFlag);
  res.status(201).json({ success: true, result: booksWithFavouriteFlag });
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
    message: "Book added successfully.",
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
    message: "Book Update Successfully.",
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

  res.status(201).json({
    success: true,
    message: "Book deleted Successfully.",
    data: {},
  });
});
