const { check } = require("express-validator");

exports.actorValidator = [check("name").trim().notEmpty().withMessage("Actor's name is empty"), check("about").trim().notEmpty().withMessage("About is a required field"), check("gender").trim().notEmpty().withMessage("Gender is required field")];
