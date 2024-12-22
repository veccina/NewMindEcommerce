const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const header = req.headers['authorization'];
    if (!header) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, email, isAdmin }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
