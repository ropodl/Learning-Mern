const crypto = require("crypto");
const User = require("../models/user");
const EmailVerficationToken = require("../models/emailVerificationTokens");
const { isValidObjectId } = require("mongoose");
const { generateToken } = require("../utils/token");
const { transportInit } = require("../utils/mail");
const { PasswordResetToken } = require("../models/passwordResetToken");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(401).json({ error: "This email address is already is use." });

  const newUser = new User({ name, email, password });
  await newUser.save();
  // OTP Starts
  let OTP = generateToken();
  const newEmailVerificationTokens = new EmailVerficationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationTokens.save();

  var transport = transportInit();

  transport.sendMail({
    from: "verification@moviewreview.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
    <p>Your OTP is </p>${OTP}
    `,
  });

  res.json({ message: "Please verify your account with the OTP that has been sent to your account." });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;
  if (!isValidObjectId(userId)) return res.json({ error: "Invalide User!" });

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User not found" });

  if (user.isVerified) return res.json({ error: "User is already verified" });

  const token = await EmailVerficationToken.findOne({ owner: userId });
  if (!token) return res.json({ error: "Token not found." });

  const isMatched = await token.compareToken(OTP);

  if (!isMatched) return res.json({ error: "Please submit a valid OTP" });

  user.isVerified = true;
  await user.save();

  await EmailVerficationToken.findByIdAndDelete(token._id);
  res.json({ message: "Your Email is verified" });
  // Nodemailer Transport Initialization
  var transport = transportInit();
  transport.sendMail({
    from: "verification@moviewreview.com",
    to: user.email,
    subject: "Welcome to movie review app",
    html: `
    <p>Welcome to our app</p>
    `,
  });
};

exports.resendVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.json({ error: "User not found" });

  if (user.isVerified) return res.json({ error: "User is already verified" });

  const existingToken = await EmailVerficationToken.findOne({
    owner: userId,
  });
  if (existingToken) return res.json({ error: "Token can be requested after one hour" });

  // OTP Starts
  let OTP = generateToken();
  const newEmailVerificationTokens = new EmailVerficationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationTokens.save();
  // Nodemailer Transport Initialization
  var transport = transportInit();
  transport.sendMail({
    from: "verification@moviewreview.com",
    to: user.email,
    subject: "Email Verification",
    html: `
    <p>Your OTP is </p>${OTP}
    `,
  });

  res.json({ message: "New OTP has been send to ypur account." });
};

exports.resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.json({ error: "Email Address missing" });

  const user = User.findOne({ email });
  if (!user) return res.json({ error: "User not found" });

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken) return res.json({ error: "Token can be requested after one hour" });

  crypto.randomBytes();
};
