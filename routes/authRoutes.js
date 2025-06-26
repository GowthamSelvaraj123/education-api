const express = require("express");
const router = express.Router();
const passport = require("passport");
const {loginController, registerController} = require("../controllers/auth.controller")

router.get("/login", loginController)
router.post("/register", registerController);
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
router.get("/google/failure", (req, res) => {
  res.status(401).json({ success: false, message: "Google Login failed" });
});

module.exports = router;