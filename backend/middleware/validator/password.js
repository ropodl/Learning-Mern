const { check, validationResult } = require("express-validator");

exports.passwordValidator = [check("newPassword").trim().notEmpty().withMessage("Password is Missing").isLength({ min: 6, max: 20 }).withMessage("Password length must be 8 to 20 characters long")];

exports.validatePassword = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    res.status(400).json({ error });
  }
  next();
};
