const { check } = require("express-validator");
const genres = require("../../utils/genres");
const { isValidObjectId } = require("mongoose");

exports.validateMovie = [
  check("title").trim().notEmpty().withMessage("Movie title is missing"),
  check("story_line").trim().notEmpty().withMessage("Story Line is missing"),
  check("release_date").isDate().withMessage("Release Date is missing"),
  check("status")
    .isIn(["public", "private"])
    .withMessage("Status must be private or public"),
  check("type").trim().notEmpty().withMessage("Movie Type is missing"),
  check("genres")
    .isArray()
    .withMessage("Genres must be an array of strings")
    .custom((value) => {
      for (g of value) {
        if (!genres.includes(g)) throw Error("Invalid Genres");
      }
      return true;
    }),
  check("tags")
    .isArray()
    .withMessage("Tags must be an array of strings")
    .custom((tags) => {
      for (let tag of tags) {
        if (typeof tag !== "string") throw Error("Invalid Tags");
      }
      return true;
    }),
  check("cast")
    .isArray()
    .withMessage("Cast must be an array of strings")
    .custom((cast) => {
      for (let c of cast) {
        if (!isValidObjectId(c.actor))
          throw Error("Invalid Cast ID inside cast");
        if (!c.role_as.trim()) throw Error("Role as is missing inside cast");
        if (typeof c.lead_actor !== "boolean")
          throw Error("Only boolean is accepted in lead actor inside cast");
      }

      return true;
    }),
  check("trailer")
    .isObject()
    .withMessage("Trailer Info must be an object with url and public_id")
    .custom(({ url, public_id }) => {
      try {
        const result = new URL(url);
        if (!result.protocol.includes("http"))
          throw Error("Trailer url is not secure");

        const array = url.split("/");
        const publicID = array[array.length - 1].split(".")[0];

        if (publicID !== public_id)
          throw Error("Trailer public_id is invalid in trailer_info");
      } catch (error) {
        throw Error("Trailer url is invalid");
      }
      return true;
    }),
  // check("poster").custom((_, { req }) => {
  //   if (!req.file) throw Error("Poster file is missing!");
  //   return true;
  // }),
  check("language").trim().notEmpty().withMessage("Language is missing"),
];
