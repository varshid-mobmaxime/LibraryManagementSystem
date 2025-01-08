const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please add a Last Name"],
    },
    userName: {
      type: String,
      unique: true,
      required: [true, "Please add a User Name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [/^\S+@\S+$/, "Please add a valid email"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please add Phone Number"],
      unique: true,
      match: [/d{10}$/, "Please add a valid phone number"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1736026934~exp=1736030534~hmac=8f19999f7c55bf23601b865604414179d8cc8ab540c53b3cd49873343a417d93&w=1060",
    },
    favourites: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Books",
      },
    ],
    bookRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Books",
      },
    ],
    request: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookRequest",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getSignedJwt = function () {
  return jwt.sign({ user: this }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.virtual("books", {
  ref: "Books",
  localField: "_id",
  foreignField: "user",
});

// UserSchema.virtual("post", {
//   ref: "Post",
//   localField: "_id",
//   foreignField: "post",
// });

module.exports = mongoose.model("User", UserSchema);
