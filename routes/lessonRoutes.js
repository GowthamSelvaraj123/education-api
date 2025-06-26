const express = require("express");
const router = express.Router();
const {getLessonsByCourse, getLessonsById, createLesson, updateLesson, deleteLesson} = require("../controllers/lesson.controller")
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/courses/:courseId/lessons', getLessonsByCourse);
router.get('/lessons/:lessonId',  getLessonsById);
router.post('/courses/:courseId/lessons', authMiddleware, createLesson);
router.put('/lessons/:lessonId', authMiddleware, updateLesson);
router.delete('/courses/:courseId/lessons/:lessonId', authMiddleware, deleteLesson);