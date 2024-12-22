const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(
        { userId: user._id, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

module.exports = { generateToken };
