const { BOOK_REQUEST_STATUS } = require("../constants");
const Book = require("../models/Book");
const BookRequest = require("../models/BookRequest");
const { getRequestBookStatusString } = require("../utils");
const { tryCatch } = require("../utils/tryCatch");

exports.requestBook = tryCatch(async (req, res, next) => {
  const { bookId } = req.body;
  const userId = req.user._id;
  let book = await Book.findById(bookId);

  if (!bookId) {
    res.status(200).json({ success: false, message: "Pass Book Id" });
  }

  if (!book) {
    return next({
      message: "Book not found",
    });
  }

  console.log("Called =--> ");

  console.log("bookId, userId is =--> ", bookId, userId);

  await BookRequest.create({
    book: bookId,
    user: userId,
    status: BOOK_REQUEST_STATUS.Pending,
  });

  res.status(201).json({ success: true, message: "Book request successfully" });
});

exports.updateBookStatus = tryCatch(async (req, res) => {
  const { bookRequestId, status } = req.body;

  await BookRequest.findByIdAndUpdate(bookRequestId, { status: status });

  res.status(201).json({ success: true, message: "Book Update Successfully" });
});

exports.requestBookList = tryCatch(async (req, res, next) => {
  const requestedBooks = await BookRequest.find()
    .populate("user", "firstName lastName email")
    .populate("book", "title author");

  if (!requestedBooks.length > 0) {
    return res
      .status(200)
      .json({ success: false, message: "No book requests found" });
  }

  const result = requestedBooks.map((i) => ({
    ...i.toObject(), // Ensure `i` is a plain object if it's a Mongoose document
    statusName: getRequestBookStatusString(i.status),
  }));

  res.status(201).json({
    success: true,
    result: result,
  });
});

exports.requestUserBookList = tryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const requestedBooks = await BookRequest.find({ user: userId })
    .populate("user", "firstName lastName email")
    .populate("book", "title author");

  if (!requestedBooks.length > 0) {
    return res.status(200).json({ success: false, result: [] });
  }

  const result = requestedBooks.map((i) => ({
    ...i.toObject(), // Ensure `i` is a plain object if it's a Mongoose document
    statusName: getRequestBookStatusString(i.status),
  }));

  res.status(201).json({
    success: true,
    result: result,
  });
});
