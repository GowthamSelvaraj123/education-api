const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {type: String, required: true},
  slug: {type: String, unique: true, lowercase: true},
  description: {type: String,},
  category: {type: String},
  level: {type: String, enum: ['Beginner', 'Intermediate', 'Advanced'],},
  thumbnail: String,
  price: {type: Number, default: 0},
  isFree: {type: Boolean, default: false,},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',},
  lessons: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', }],
  enrolledStudents: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User', }],
  published: {type: Boolean, default: false,},
  createdAt: {type: Date, default: Date.now,},
})

module.exports = mongoose.model('Course', courseSchema);