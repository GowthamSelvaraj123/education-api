const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/dashboard", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to your dashboard",
        user: req.user
    });
});

module.exports = router;