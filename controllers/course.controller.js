const Course = require("../models/course.model")
const Lesson = require("../models/lesson.model")
const Review = require('../models/review.model');

const getAllCourses = async(req, res) => {
    try 
    {
        const courses = await Course.find({published:true}).populate('category').populate('author', 'name email').select('-lessons');
        res.status(201).json({ success: true, message: "Get all courses Successfully", data:users });
    }
    catch(err)
    {
        res.status(500).json({ success: false, message: 'Failed to fetch courses', err });
    }

}
const getCourseDetails = async(req, res) => {
    try{
        const { courseIdOrSlug } = req.params;
        const course = await Course.findOne({$or:[{_id:courseIdOrSlug, slug:courseIdOrSlug}]}).populate('author', 'name email').populate({path: 'lessons',options: { sort: { order: 1 } },});
        if(!course)
        {
            return res.status(404).json({ success: true, message: "Course Not Found"});
        }
        const reviews = await Review.find({course:course._id}).populate('user', 'name').sort({ createdAt: -1 });
        res.status(201).json({ success: true, message: "Get Course Details Successfully", data:course, reviews });
    }   
    catch(error)
    {
        res.status(500).json({ success: false, message: 'Failed to fetch course details', err });
    }
}

const getCoursesByCategory = async(req, res) => {
    const {categorySlug} = req.body;
    const courses = await Course.find({published:true}).populate('category').populate('author', 'name').where('category.slug').equals(categorySlug);
    res.status(201).json({ success: true, message: "Get Course Details Successfully", data:courses});
}

const enrollCourse = async(req, res) => {
    try{
    const courseId = req.params.courseId;
    const userId = req.user._id;
    const course = await Course.findById(courseId);
    if(!course)
    {   
        return res.status(404).json({ success: true, message: "Course Not Found"});
    }
     if (course.enrolledStudents.includes(userId)){
         return res.status(400).json({ message: 'Already enrolled in this course' });
     }
    course.enrolledStudents.push(userId);
    await course.save();
    res.status(200).json({ message: 'Enrollment successful', courseId });
    }
    catch(err)
    {
        res.status(500).json({ success: false, message: 'Enrollment Failed Successfully', err });
    }
}
const getUserEnrolledCourses = async(req, res) => {
try{
 const userId = req.user._id;
 const courses = await Course.find({ enrolledStudents: userId })
      .populate('author', 'name')
      .select('-lessons');
      res.status(200).json({ message: 'Get Enrollment course Successfully', courses});
}
catch(err)
{
    res.status(500).json({ success: false, message: 'Fetch data failed', err });
}
}

module.exports = {getAllCourses,getCourseDetails, getCoursesByCategory, enrollCourse, getUserEnrolledCourses}