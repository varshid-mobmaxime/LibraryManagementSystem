const Book = require("../models/Book");
const { tryCatch } = require("../utils/tryCatch");
const APIFeatures = require("../utils/ApiFeature");
const User = require("../models/User");
const { decodeToken } = require("../utils/jwt.utils");
const BookRequest = require("../models/BookRequest");
const { getRequestBookStatusString } = require("../utils");
const { BOOK_REQUEST_STATUS } = require("../constants");
const Rating = require("../models/Rating");

exports.getDashboardDetails = tryCatch(async (req, res) => {
  const totalAvailableCopies = await Book.aggregate([
    {
      $group: {
        _id: null, // No grouping key, just aggregate all documents
        availableCopies: { $sum: "$availableCopies" },
      },
    },
  ]);
  const totalBooks = await Book.countDocuments();
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalBorrowedBooks = await BookRequest.countDocuments({
    status: BOOK_REQUEST_STATUS.Issue,
  }); // Only borrowed books that haven't been returned

  const totalRequestedBooks = await BookRequest.countDocuments({
    status: BOOK_REQUEST_STATUS.Pending,
  });

  res.status(201).json({
    success: true,
    result: {
      totalBooks: totalBooks || 0,
      totalAdmins: totalAdmins || 0,
      totalUsers: totalUsers || 0,
      totalBorrowedBooks: totalBorrowedBooks || 0,
      totalRequestedBooks: totalRequestedBooks || 0,
      totalAvailableBooks: totalAvailableCopies?.[0]?.availableCopies || 0,
    },
  });
});

exports.getUserBookDetails = tryCatch(async (req, res) => {
  console.log("APi Clled/././././././././");

  const userId = req.params.id;

  const totalUserBorrowedBooks = await BookRequest.countDocuments({
    status: BOOK_REQUEST_STATUS.Issue,
    user: userId,
  }); // Only borrowed books that haven't been returned

  const totalUserRequestedBooks = await BookRequest.countDocuments({
    status: BOOK_REQUEST_STATUS.Pending,
    user: userId,
  });

  const totalUserReturnedBooks = await BookRequest.countDocuments({
    status: BOOK_REQUEST_STATUS.Return,
    user: userId,
  });

  const totalUserCancelledBooks = await BookRequest.countDocuments({
    status: BOOK_REQUEST_STATUS.Cancel,
    user: userId,
  });

  res.status(201).json({
    success: true,
    result: {
      BorrowedBooks: totalUserBorrowedBooks || 0,
      RequestedBooks: totalUserRequestedBooks || 0,
      ReturnedBooks: totalUserReturnedBooks || 0,
      CancelledBooks: totalUserCancelledBooks || 0,
    },
  });
});

//Get all books
exports.getBooks = tryCatch(async (req, res) => {
  // let query = Book.find();
  // if (req.query.search) {
  //   query = Book.find({ $text: { $search: `${req.query.search}` } });
  // }

  let query = Book.find();

  if (req.query.search) {
    const searchQuery = req.query.search.trim();

    // if (searchQuery.length === 1) {
    // For single letter searches, use regular expression
    query = Book.find({
      $or: [
        { title: { $regex: `^${searchQuery}`, $options: "i" } },
        { author: { $regex: `^${searchQuery}`, $options: "i" } },
      ],
    });
    // } else {
    //   // For longer searches, use full-text search
    //   query = Book.find({ $text: { $search: searchQuery } });
    // }
  }

  const advancedQuery = new APIFeatures(query, req.query)
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

// exports.getBook = tryCatch(async (req, res) => {
//   const book = await Book.findById(req.params.id);

//   const userId = req.user._id;
//   const { favourites } = await User.findById(userId);

//   const isBookFavourite = favourites.includes(req.params.id);

//   //Book request
//   const bookRequest = await BookRequest.findOne({
//     user: userId,
//     book: req.params.id,
//     status: { $nin: [BOOK_REQUEST_STATUS.Return] },
//     // status: { $nin: [BOOK_REQUEST_STATUS.Return, BOOK_REQUEST_STATUS.Cancel] },
//   });

//   const isRequested = !!bookRequest;

//   const booksWithFavouriteFlag = {
//     ...book.toObject(),
//     isFavourite: isBookFavourite,
//     status: isRequested
//       ? bookRequest?.status
//       : BOOK_REQUEST_STATUS.NotRequested,
//     statusName: getRequestBookStatusString(
//       isRequested ? bookRequest?.status : 0
//     ),
//   };

//   console.log("requestBooks is =--> ", booksWithFavouriteFlag);
//   res.status(201).json({ success: true, result: booksWithFavouriteFlag });
// });

exports.getBook = tryCatch(async (req, res) => {
  const book = await Book.findById(req.params.id);

  const userId = req.user._id;
  const { favourites } = await User.findById(userId);

  const isBookFavourite = favourites.includes(req.params.id);

  // Fetch all book requests for the user and the book, sorted by the latest first
  const bookRequests = await BookRequest.find({
    user: userId,
    book: req.params.id,
  }).sort({ createdAt: -1 }); // Assuming `createdAt` is the timestamp field

  let bookRequestStatus = BOOK_REQUEST_STATUS.NotRequested;
  let statusName = getRequestBookStatusString(0);
  let bookRequestDate = getRequestBookStatusString(0);
  let bookReturnDate = getRequestBookStatusString(0);

  if (bookRequests.length > 0) {
    // Check for the latest relevant status
    const latestRequest = bookRequests[0];
    bookRequestStatus = latestRequest.status;
    bookRequestDate = latestRequest.createdAt;
    bookReturnDate = latestRequest.returnDate;

    statusName = getRequestBookStatusString(latestRequest.status);

    // Check if there are any pending statuses
    const pendingRequest = bookRequests.find(
      (request) => request.status === BOOK_REQUEST_STATUS.Pending
    );

    if (pendingRequest) {
      bookRequestStatus = BOOK_REQUEST_STATUS.Pending;
      statusName = getRequestBookStatusString(BOOK_REQUEST_STATUS.Pending);
    }
  }

  // Fetch ratings for the book and calculate the average rating
  const ratings = await Rating.find({ book: req.params.id });
  const totalRatings = ratings.length;
  const averageRating =
    totalRatings > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

  const userRating = ratings.find(
    (r) => r.user.toString() === userId.toString()
  );

  const booksWithFavouriteFlag = {
    ...book.toObject(),
    isFavourite: isBookFavourite,
    status: bookRequestStatus,
    statusName: statusName,
    requestedDate: bookRequestDate,
    returnDate: bookReturnDate,
    rating: {
      averageRating: parseFloat(averageRating.toFixed(1)), // Average rating rounded to 1 decimal
      totalRatings: totalRatings, // Total number of ratings
      userRating: userRating ? userRating.rating : null, // Current user's rating (if exists)
    },
  };

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

  let new_copies = req?.body?.copies;

  const diff = new_copies - book?.copies;

  let new_available_copies = book?.availableCopies + diff;
  req.body.availableCopies = new_available_copies;

  await Book.findByIdAndUpdate(req.params.id, req.body, {
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
