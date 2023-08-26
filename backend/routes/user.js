const express = require("express");
const { create, verifyEmail, resendVerificationToken, resetPassword, sendPasswordResetResponse, forgotPassword, signIn, isAuthRes } = require("../controllers/user");
const { userValidator, signInValidator } = require("../middleware/validator/user");
const { validatePasswordToken } = require("../middleware/validator/passwordToken");
const { passwordValidator, validatePassword } = require("../middleware/validator/password");
const { isAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validator/validate");

const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/verify-token", verifyEmail);
router.post("/resend-token", resendVerificationToken);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-password-token", validatePasswordToken, sendPasswordResetResponse);
router.post("/reset-password", passwordValidator, validatePassword, validatePasswordToken, resetPassword);
// IS USER AUTH
router.get("/is-auth", isAuth, isAuthRes);

module.exports = router;
