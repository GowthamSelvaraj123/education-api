const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'Color@123';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Check if token is present in header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Access denied. Token missing.' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // attach user info to request object
        next(); // pass control to next middleware or route
    } catch (err) {
        console.error('Invalid token:', err.message);
        res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }
};

module.exports = authMiddleware;
