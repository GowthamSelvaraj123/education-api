const express = require('express');
const router = express.Router();
const {getProfile, updateProfile, deleteProfile} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.delete('/profile', authMiddleware, deleteProfile);

module.exports = router;