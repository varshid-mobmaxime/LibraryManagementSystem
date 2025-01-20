const mongoose = require("mongoose");
const { BOOK_REQUEST_STATUS } = require("../constants");

const BookRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.ObjectId,
      ref: "Books",
      required: true,
    },
    status: {
      type: Number,
      default: BOOK_REQUEST_STATUS.NotRequested,
      enum: Object.values(BOOK_REQUEST_STATUS),
    },
    penalty: {
      type: Number,
      default: 0,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    issueDate: {
      type: Date,
    },
    cancelDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookRequest", BookRequestSchema);
