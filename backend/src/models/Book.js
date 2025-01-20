const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    copies: {
      type: Number,
      select: false,
      required: true,
    },
    availableCopies: {
      type: Number,
      default: function () {
        return this.copies;
      },
    },
    author: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Books", BookSchema);
