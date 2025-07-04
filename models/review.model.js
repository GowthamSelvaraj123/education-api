const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true,},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
  rating: {type: Number,min: 1, max: 5,required: true,},
  comment: {type: String,maxlength: 1000,},
  createdAt: {type: Date, default: Date.now,},
}, {timestamps: true});

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
