const express = require("express");
const router = express.Router();
const {getAllCourses,getCourseDetails, getCoursesByCategory, enrollCourse, getUserEnrolledCourses} = require("../controllers/course.controller")
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/courses', getAllCourses);
router.get('/courses/category/:categorySlug', getCourseDetails);
router.get('/courses/:courseIdOrSlug', getCoursesByCategory);

router.post('/courses/:courseId/enroll', authMiddleware, enrollCourse);
router.get('/my-courses', authMiddleware,  getUserEnrolledCourses);

module.exports = router;