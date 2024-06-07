const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const { errorHandeler } = require('../utils/error');
const JWT_SECRET = 'superStrongSecret';

module.exports = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandeler(401, "Access denied. No token provided."));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        next(errorHandeler(400, "Invalid token."));
    }
};

