const express = require("express");
const router = express.Router();
const passport = require("passport");
const {loginController, registerController, forgotPasswordController, resetPasswordController,  logoutController} = require("../controllers/auth.controller");
const authLimiter = require("../middlewares/authMiddleware");

router.get("/login", authLimiter , loginController)
router.post("/register", authLimiter , registerController);
router.post("/forgot-password", authLimiter, forgotPasswordController);
router.post("/reset-password", resetPasswordController);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
passport.authenticate("google", { failureRedirect: "/auth/google/failure" }),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Google Login successful",
      user: req.user
    });
  }
);
router.get("/logout",  logoutController);
router.get("/google/failure", (req, res) => {
  res.status(401).json({ success: false, message: "Google Login failed" });
});

module.exports = router;