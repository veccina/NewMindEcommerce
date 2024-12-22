const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../services/userService');

exports.register = async (req, res, next) => {
    try {
        const { username, fullName, email, password, address } = req.body;
        if (!username || !fullName || !email || !password || !address) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const user = new User({ username, fullName, email, password, address });
        await user.save();
        const token = generateToken(user);
        return res.status(201).json({ message: 'User created', token });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { fullName, address } = req.body;
        // e.g., allow user to update fullName, address, etc.
        const updated = await User.findByIdAndUpdate(
            userId,
            { fullName, address },
            { new: true }
        );
        return res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

// Admin can create user as admin or normal
exports.createUserByAdmin = async (req, res, next) => {
    try {
        const { username, fullName, email, password, address, isAdmin } = req.body;
        const newUser = new User({ username, fullName, email, password, address, isAdmin });
        await newUser.save();
        return res.status(201).json({ message: 'User created by admin', newUser });
    } catch (error) {
        next(error);
    }
};

exports.deleteUserByAdmin = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'User deleted by admin' });
    } catch (error) {
        next(error);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
