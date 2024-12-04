const express = require("express");
const {authenticateToken, authorizeUser, authenticatePasswordResetRequest} = require("../middlewares/usersMiddlewares");
const userControllers = require("../Controllers/UserController");
var router = express.Router();

router.post('/submitSignupForm', userControllers.Signup);

router.post('/login', userControllers.Login);

router.get("/profile", authenticateToken, authorizeUser("buyer"), userControllers.GetProfile);

router.post("/forgotPassword", userControllers.ForgotPasswordRequest);

router.get("/resetPassword/:userId/:resetToken", authenticatePasswordResetRequest, userControllers.ResetPassword);

router.post("/sellerRegistration" , authenticateToken, authorizeUser('buyer'), userControllers.RegisterAsSeller);

module.exports = router;
