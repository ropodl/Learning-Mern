const express = require("express");
const { isAuth, isAdmin } = require("../middleware/auth");
const {
  uploadTrailer,
  create,
  updateWithPoster,
  updateNoPoster,
  remove,
} = require("../controllers/movie");
const { uploadVideo, uploadImage } = require("../middleware/multer");
const { validateMovie } = require("../middleware/validator/movie");
const { validate } = require("../middleware/validator/validate");
const { parseMovie } = require("../utils/parse");
const router = express.Router();

router.post(
  "/create",
  isAuth,
  isAdmin,
  uploadImage.single("poster"),
  parseMovie,
  validateMovie,
  validate,
  create
);

router.post(
  "/update-no-poster/:id",
  isAuth,
  isAdmin,
  parseMovie,
  validateMovie,
  validate,
  updateNoPoster
);
router.post(
  "/update-with-poster/:id",
  isAuth,
  isAdmin,
  parseMovie,
  validateMovie,
  validate,
  updateWithPoster
);

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);
router.delete("/:id", isAuth, isAdmin, uploadVideo.single("video"), remove);

module.exports = router;
