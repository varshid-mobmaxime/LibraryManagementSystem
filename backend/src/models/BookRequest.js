const mongoose = require("mongoose");

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
    },
    status: {
      type: String,
      default: "Book Requested",
      enum: ["Book Request", "Pending From Admin,Book Borrowed,Canceled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookRequest", BookRequestSchema);
