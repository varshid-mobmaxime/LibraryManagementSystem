const { BOOK_REQUEST_STATUS } = require("../constants");
const Book = require("../models/Book");
const BookRequest = require("../models/BookRequest");
const { getRequestBookStatusString } = require("../utils");
const { tryCatch } = require("../utils/tryCatch");
const moment = require("moment");

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

  const BookId = await BookRequest.findById(bookRequestId);

  console.log("BookId.book =--> ", BookId.book.toString());

  const BookObj = await Book.findById(BookId.book.toString());
  console.log("BookIs is =--> ", BookObj);

  if (status === BOOK_REQUEST_STATUS.Issue) {
    await Book.findByIdAndUpdate(BookId.book.toString(), {
      $inc: { availableCopies: -1 },
    });
    const returnDate = moment().add(7, "days");
    await BookRequest.findByIdAndUpdate(bookRequestId, {
      status: status,
      issueDate: moment(),
      returnDate: returnDate,
    });
  } else if (status === BOOK_REQUEST_STATUS.Return) {
    await Book.findByIdAndUpdate(BookId.book.toString(), {
      $inc: { availableCopies: +1 },
    });

    const rDate = await BookRequest.findOne({ _id: bookRequestId }).select(
      "returnDate"
    );
    const momentReturnDate = moment(rDate?.returnDate);
    // const MomentIssueDate = moment(IDate).add(7, "days");
    const CurrentDate = moment();
    const Diff = CurrentDate.diff(momentReturnDate, "days");

    await BookRequest.findByIdAndUpdate(bookRequestId, {
      status: status,
      returnDate: moment(),
      penalty: Diff * 10,
    });
  } else if (status === BOOK_REQUEST_STATUS.Cancel) {
    await BookRequest.findByIdAndUpdate(bookRequestId, {
      status: status,
      cancelDate: moment(),
    });
  } else {
    await BookRequest.findByIdAndUpdate(bookRequestId, { status: status });
  }

  res.status(201).json({ success: true, message: "Book Update Successfully" });
});

exports.requestBookList = tryCatch(async (req, res, next) => {
  const requestedBooks = await BookRequest.find()
    .populate("user", "firstName lastName email")
    .populate("book", "title author url");

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

//Return user all books
exports.requestUserBookList = tryCatch(async (req, res, next) => {
  const userId = req.params.id;
  const requestedBooks = await BookRequest.find({ user: userId })
    .populate("user", "firstName lastName email")
    .populate("book", "title author url");

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

//Return only requested book for user
exports.requestUserRequestBookList = tryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const requestedBooks = await BookRequest.find({
    user: userId,
    status: BOOK_REQUEST_STATUS.Pending,
  })
    .populate("user", "firstName lastName email")
    .populate("book", "title author url");

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

//Return only issued book for user
exports.requestUserIssuedBookList = tryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const requestedBooks = await BookRequest.find({
    user: userId,
    status: BOOK_REQUEST_STATUS.Issue,
  })
    .populate("user", "firstName lastName email")
    .populate("book", "title author url");

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

//Return only Returned book for user
exports.requestUserReturnBookList = tryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const requestedBooks = await BookRequest.find({
    user: userId,
    status: BOOK_REQUEST_STATUS.Return,
  })
    .populate("user", "firstName lastName email")
    .populate("book", "title author url");

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

//Return only Cancel book for user
exports.requestUserCancelBookList = tryCatch(async (req, res, next) => {
  const userId = req.user._id;
  const requestedBooks = await BookRequest.find({
    user: userId,
    status: BOOK_REQUEST_STATUS.Cancel,
  })
    .populate("user", "firstName lastName email")
    .populate("book", "title author url");

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
