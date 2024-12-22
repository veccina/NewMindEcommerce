const express = require('express');
const router = express.Router();
const {
    register,
    login,
    updateProfile,
    createUserByAdmin,
    deleteUserByAdmin,
    getAllUsers
} = require('../controllers/userController');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

router.post('/register', register);
router.post('/login', login);

// Normal user can update profile
router.put('/profile', auth, updateProfile);

// Admin routes
router.post('/admin/create', auth, adminAuth, createUserByAdmin);
router.delete('/admin/:userId', auth, adminAuth, deleteUserByAdmin);
router.get('/admin/all', auth, adminAuth, getAllUsers);

module.exports = router;
