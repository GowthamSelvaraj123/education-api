const Course = require("../models/course.model")
const Lesson = require("../models/lesson.model")
const Category = require("../models/category.model")
const User = require('../models/user.model');
const Review = require('../models/review.model');

const createCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        const existing = await Category.findOne({ slug });
        if (existing) {
            return res.status(400).json({ success: false, message: "Category already exists" })
        }
        const category = await Category.create({ name, slug, description });
        res.status(201).json({ success: true, message: "Category Added Successfully" });

    }
    catch (err) {
        res.status(500).json({success: false, message: 'Category creation failed', err });

    }
};

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, message: "Category Added Successfully" });

    }
    catch (err) {
        res.status(500).json({success: false, message: 'Course creation failed', err });
    }
}

const updateCourse = async (req, res) => {
    try {
        const updateCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true })
        res.status(201).json({ success: true, message: "Category Updated Successfully" });
    }
    catch (err) {
        res.status(500).json({success: false, message: 'Course update failed', err });
    }

}

const deleteCourse = async (req, res) => {
    try {
        const deleteCourse = await Course.findByIdAndDelete(req.params.courseId);
        res.status(201).json({ success: true, message: "Category Deleted Successfully" });
    }
    catch (err) {
        res.status(500).json({success: false, message: 'Delete update failed', err });
    }
}

const addLesson = async (req, res) => {
    try{
        const {title, content, videoUrl, isFreePreview, order} = req.body;
        const courseId = req.params.courseId;
        const lesson = await Lesson.create({title, content, videoUrl, isFreePreview, order});
        await Course.findByIdAndUpdate(courseId, {$push:{lessons:lesson._id}})
        res.status(201).json({ success: true, message: "Add Lesson Successfully" });
    }
    catch(err)
    {
        res.status(500).json({success: false, message: 'Add lesson failed', err });
    }
}

const getAllUsers = async (req, res) => {
    try 
    {   
        const users = await User.find().select('-password');
        res.status(201).json({ success: true, message: "Get Users Successfully", data:users });
    }
    catch(err)
    {
        res.status(500).json({ success: false, message: 'Failed to fetch users', err });
    }
}

const getAllReviews = async (req, res) => {
    try{
        const reviews = await User.find().populate('course', 'title').populate('user', 'name email');
        res.status(201).json({ success: true, message: "Get Reviews Successfully", data:reviews });
    }
    catch(err)
    {
        res.status(500).json({ success: false, message: 'Failed to fetch reviews', err });
    }
}

module.exports = { createCategory, createCourse, updateCourse, deleteCourse, addLesson, getAllUsers, getAllReviews }