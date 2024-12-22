const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const orderController = require('../controllers/orderController');

// Normal user can create an order, see own orders
router.post('/', auth, orderController.createOrder);
router.get('/my', auth, orderController.getMyOrders);

// Admin can see all orders
router.get('/admin/all', auth, adminAuth, orderController.getAllOrders);

module.exports = router;
