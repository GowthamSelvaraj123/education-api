const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {type: String, required: true},
  slug: {type: String, lowercase: true},
  content: {type: String,},
  videoUrl: {type: String},
  duration: { type: String},
  isFreePreview: { type: Boolean, default: false, },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', },
  order: { type: Number, },
  createdAt: { type: Date, default: Date.now,},
})

module.exports = mongoose.model('Lesson', lessonSchema);