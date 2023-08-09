const express = require("express");
const { create, verifyEmail, resendVerificationToken } = require("../controllers/user");
const { userValidator, validate } = require("../middleware/validator/user");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/verify-token", verifyEmail);
router.post("/resend-token", resendVerificationToken);

module.exports = router;
