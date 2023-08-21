const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const PasswordResetToken = require("../models/passwordResetToken");
const EmailVerificationToken = require("../models/emailVerificationTokens");

const { generateToken } = require("../utils/token");
const { transportInit } = require("../utils/mail");
const { generateRandomByte } = require("../utils/generateRandomByte");
const { sendError } = require("../utils/error");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(401).json({ error: "This email address is already is use." });

  const newUser = new User({ name, email, password });
  await newUser.save();
  // OTP Starts
  let OTP = generateToken();
  const newEmailVerificationTokens = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationTokens.save();

  const transport = transportInit();

  transport.sendMail({
    from: "verification@moviewreview.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <p>Your OTP is </p>${OTP}
    `,
  });

  res.status(201).json({
    success: "ok",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: "Invalid User!" });

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User not found" });

  if (user.isVerified) return res.json({ error: "User is already verified" });

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return res.json({ error: "Token not found." });

  const isMatched = await token.compareToken(OTP);

  if (!isMatched) return res.json({ error: "Please submit a valid OTP" });

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);
  // Nodemailer Transport Initialization
  const transport = transportInit();
  transport.sendMail({
    from: "verification@moviewreview.com",
    to: user.email,
    subject: "Welcome to movie review app",
    html: `
    <p>Welcome to our app</p>
    `,
  });

  const jwtToken = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });

  res.json({
    success: "ok",
    message: "Email Verified, You are now logged in",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token: jwtToken,
    },
  });
};

exports.resendVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found");

  if (user.isVerified) return sendError(res, "User is already verified");

  const existingToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (existingToken) return sendError(res, "Token can be requested after one hour");

  // OTP Starts
  let OTP = generateToken();
  const newEmailVerificationTokens = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationTokens.save();
  // Nodemailer Transport Initialization
  const transport = transportInit();
  transport.sendMail({
    from: "verification@moviewreview.com",
    to: user.email,
    subject: "Email Verification",
    html: `
    <p>Your OTP is </p>${OTP}
    `,
  });

  res.json({ message: "New OTP has been send to your account." });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return sendError(res, "Email is missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken) return sendError(res, "Token can be requested after one hour");

  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({ owner: user._id, token });

  await newPasswordResetToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  const transport = transportInit();
  transport.sendMail({
    from: "security@moviewreview.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
    <p>Your password reset link is </p>${resetPasswordUrl}
    `,
  });
  res.json({ message: "Password Reset Link sent to your Email Address." });
};

exports.sendPasswordResetResponse = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);

  if (matched) return sendError(res, "New password must be not similiar to old password");

  user.password = newPassword;

  await user.save();

  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  const transport = transportInit();
  transport.sendMail({
    from: "security@moviewreview.com",
    to: user.email,
    subject: "Password Reset Succesfull",
    html: `
    <p>Your new password has been set succesfully </p>`,
  });
  res.json({ message: "Password Reset successfully." });
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch");

  const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" });

  const { _id, name } = user;

  res.json({
    success: "ok",
    user: {
      id: _id,
      name,
      email,
      token,
    },
  });
};