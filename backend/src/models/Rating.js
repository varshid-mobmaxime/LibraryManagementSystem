const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      default: 0,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
