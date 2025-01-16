const User = require("../models/User");
const { tryCatch } = require("../utils/tryCatch");
const bcrypt = require("bcryptjs");

exports.getUsers = tryCatch(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ users });
});

exports.getUser = tryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select([
    "-password",
    "-favourites",
    "-bookRequests",
    "-request",
  ]);

  console.log("user Details is =--> ", user);

  // const userId = req.user._id;
  // const { favourites } = await User.findById(userId);

  // const isBookFavourite = favourites.includes(req.params.id);

  // const booksWithFavouriteFlag = {
  //   ...book.toObject(),
  //   isFavourite: isBookFavourite,
  // };

  res.status(201).json({ success: true, result: user });
});

exports.register = tryCatch(async (req, res, next) => {
  const {
    firstName,
    lastName,
    userName,
    phoneNumber,
    email,
    password,
    role,
    avatar,
  } = req.body;

  //Check User name length more then 4
  if (userName.length <= 4) {
    return next({
      message: "UserName length should be grater the 4",
    });
  }

  //Check user name is already exist or not?
  const userNameExist = await User.findOne({ userName: "userName" });
  if (userNameExist) {
    return next({
      message: "UserName already existed.",
    });
  }

  //Check mobile Number is already exist or not?
  const phoneNumberExist = await User.findOne({ phoneNumber });
  if (phoneNumberExist) {
    return next({
      message: "Phone NumberExist already existed.",
    });
  }

  //Check email is already exist or not?
  const emailExist = await User.findOne({ email: "email" });
  if (emailExist) {
    return next({
      message: "email already existed.",
    });
  }

  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password,
    phoneNumber,
    role,
    avatar,
  });

  const userObj = await User.findOne({ email }).select([
    "-password",
    // "-favourites",
    "-bookRequests",
    "-request",
  ]);

  const token = user.getSignedJwt();

  console.log("user obj is =--> ", userObj);

  res.status(201).json({
    success: true,
    message: "Register Successfully.",
    token,
    user: userObj,
  });
});

exports.login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next({
      message: "Please provide valid email and password.",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  const userObj = await User.findOne({ email }).select([
    "-password",
    // "-favourites",
    "-bookRequests",
    "-request",
  ]);

  console.log("userObj is =--> ", userObj);

  if (!user) {
    return next({
      message: "Invalid Credentials",
    });
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    res.status(200).json({ success: false, message: "Invalid Credentials" });
    // res.({
    //   message: "Invalid Credentials",
    // });
  }

  const token = user.getSignedJwt();

  res.status(201).json({
    success: true,
    token,
    user: userObj,
  });
});

exports.changePassword = tryCatch(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body;

  console.log("Old password:", oldPassword);

  const userId = req.user._id;

  if (!newPassword || !oldPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  // Find the user by ID
  const user = await User.findById(userId).select("+password");
  console.log("Stored password:", user);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // Verify old password
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  console.log("Password change isMatch is =--> ", isMatch);

  if (!isMatch) {
    return res
      .status(200)
      .json({ success: false, message: "Old password is incorrect." });
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});

exports.updateUser = tryCatch(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, userName, avatar, role } =
    req.body;
  const userId = req.params.id;
  console.log("req.params.id is =--> ", req.params.id);

  // Find the user by ID
  const user = await User.findById(userId).select("-password");

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found." });
  }

  // Update the user's password

  await User.findByIdAndUpdate(userId, {
    firstName,
    lastName,
    email,
    phoneNumber,
    userName,
    avatar,
    role,
  });

  res.status(200).json({
    success: true,
    message: "User updated successfully.",
  });
});

exports.deleteUser = tryCatch(async (req, res) => {
  let user = await User.findById(req.params.id);

  if (!User) {
    res.status(404).json({
      success: false,
      message: "User Not Found.",
    });
  }

  await user.remove();

  res.status(201).json({
    success: true,
    message: "user deleted Successfully.",
    data: {},
  });
});
