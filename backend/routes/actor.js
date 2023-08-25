const express = require("express");
const { uploadImage } = require("../middleware/multer");
const { actorValidator, validateActor } = require("../middleware/validator/actor");
const { create } = require("../controllers/actor");

const router = express.Router();

router.post("/create", uploadImage.single("avatar"), actorValidator, validateActor, create);

module.exports = router;
