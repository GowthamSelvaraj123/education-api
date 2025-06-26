const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {createCategory, createCourse, updateCourse, deleteCourse, addLesson, getAllUsers, getAllReviews} = require("../controllers/admin.controller");

router.get("/dashboard", authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to your dashboard",
        user: req.user
    });
});

router.post('/category',  createCategory);

router.post('/course',  createCourse);
router.put('/course/:courseId', updateCourse);
router.delete('/course/:courseId', deleteCourse);

router.post('/course/:courseId/lesson', addLesson);

router.get('/users',  getAllUsers);
router.get('/reviews',  getAllReviews);

module.exports = router;