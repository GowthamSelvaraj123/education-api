const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  address: String,
  googleId: { type: String },
  roles: {
    type: [String],
    enum: ['user', 'admin', 'seller', 'moderator'],
    default: ['user'],
  },
  resetToken: { type: String },
resetTokenExpiration: { type: Date },
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;