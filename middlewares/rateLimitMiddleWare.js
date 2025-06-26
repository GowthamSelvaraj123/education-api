const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    success: false,
    message: "Too many attempts. Please try again after 15 minutes."
  }
});

module.exports = authLimiter;
