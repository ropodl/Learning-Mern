const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../../models/passwordResetToken");
const { sendError } = require("../../utils/error");

exports.validatePasswordToken = async (req, res, next) => {
  const { token, userId } = req.body;

  if (!token.trim() || token === null || !isValidObjectId(userId)) return sendError(res, "Invalid Request");

  const resetToken = await PasswordResetToken.findOne({ owner: userId });
  if (!resetToken) return sendError(res, "Unauthorized Access, invalid request");

  const matched = await resetToken.compareToken(token);
  if (!matched) return sendError(res, "Unauthorized Access, invalid request");

  req.resetToken = resetToken;

  next();
};
