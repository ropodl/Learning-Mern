const express = require("express");
const { create, verifyEmail, resendVerificationToken, resetPassword, sendPasswordResetResponse, forgotPassword, signIn } = require("../controllers/user");
const { userValidator, validateUser, signInValidator } = require("../middleware/validator/user");
const { validatePasswordToken } = require("../middleware/validator/passwordToken");
const { passwordValidator, validatePassword } = require("../middleware/validator/password");
const { isAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/create", userValidator, validateUser, create);
router.post("/sign-in", signInValidator, validateUser, signIn);
router.post("/verify-token", verifyEmail);
router.post("/resend-token", resendVerificationToken);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-password-token", validatePasswordToken, sendPasswordResetResponse);
router.post("/reset-password", passwordValidator, validatePassword, validatePasswordToken, resetPassword);
// IS USER AUTH
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req;
  res.json({
    user: user._id,
    name: user.name,
    email: user.email,
    isVerified: user.isVerified,
  });
});

module.exports = router;
