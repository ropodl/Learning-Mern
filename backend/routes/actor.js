const express = require("express");
const { uploadImage } = require("../middleware/multer");
const { actorValidator } = require("../middleware/validator/actor");
const { validate } = require("../middleware/validator/validate");
const { create, update, remove, search, latest, actor } = require("../controllers/actor");
const { isAdmin, isAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/create", uploadImage.single("avatar"), isAuth, isAdmin, actorValidator, validate, create);
router.post("/update/:id", uploadImage.single("avatar"), isAuth, isAdmin, actorValidator, validate, update);

router.delete("/:id", isAuth, isAdmin, remove);

router.get("/latest", latest);
router.get("/search", search);
router.get("/:id", actor);

module.exports = router;
