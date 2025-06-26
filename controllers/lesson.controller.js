const Lesson = require('../models/lesson.model');
const Course = require('../models/course.model');

const getLessonsByCourse = async(req, res) =>{
    try {
        const {courseId} = req.params;
        const lesson = await Lesson.find({courseId}).sort({order:1})
        res.status(200).json({status:true, message:"Get Lessons Successfully", data:lesson})
    }
    catch(err)
    {
        res.status(500).json({status:true, message:"Failed to fetch lessons", err})
    }
}

const getLessonsById = async(req, res) => {
    try{
        const lesson = await Lesson.findById(req.params.getLessonsById)
        if(!lesson){
             return res.status(404).json({status:true, message:"Lesson not found"})
        }
        res.status(200).json({status:true, message:"Get Lessons Successfully", data:lesson})
    }
    catch(err)
    {
        res.status(500).json({ message: 'Failed to fetch lesson', err });
    }
}

const createLesson = async(req, res) => {
    try{
    const { courseId } = req.params;
    const { title, content, videoUrl, duration, isFreePreview, order } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lesson = await Lesson.create({title, content, videoUrl, duration, isFreePreview, order, course: courseId,});

    course.lessons.push(lesson._id);
    await course.save();
    res.status(200).json({status:true, message:"Get Lessons Successfully", data:lesson})
}
catch(err)
{
    res.status(500).json({ message: 'Failed to fetch lesson', err });
}
}

const updateLesson = async(req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.lessonId,
      req.body,
      { new: true }
    );

    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Lesson update failed', error });
  }
}

const deleteLesson = async(req, res) => {
      try {
    const { courseId, lessonId } = req.params;

    const lesson = await Lesson.findByIdAndDelete(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    await Course.findByIdAndUpdate(courseId, {
      $pull: { lessons: lessonId },
    });

    res.json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Lesson deletion failed', error });
  }
}

module.exports = {getLessonsByCourse, getLessonsById, createLesson, updateLesson, deleteLesson}