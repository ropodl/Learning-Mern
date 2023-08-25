const { check, validationResult } = require("express-validator");
const { sendError } = require("../../utils/error");

exports.actorValidator = [check("name").trim().notEmpty().withMessage("Actor's name is empty"), check("about").trim().notEmpty().withMessage("About is a required field"), check("gender").trim().notEmpty().withMessage("Gender is required field")];

exports.validateActor = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    sendError(res, error, 400);
  }
  next();
};
