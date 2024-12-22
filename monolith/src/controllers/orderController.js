const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
    try {
        const { cartItems } = req.body;
        if (!cartItems || !cartItems.length) {
            return res.status(400).json({ message: 'No items to order' });
        }

        let total = 0;
        const items = [];

        for (const item of cartItems) {
            total += item.price * item.quantity;
            items.push({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            });
        }

        const newOrder = new Order({
            userId: req.user.userId,
            items,
            total,
            status: 'PENDING'
        });
        await newOrder.save();

        return res.status(201).json({ message: 'Order created', order: newOrder });
    } catch (error) {
        next(error);
    }
};

exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ userId: req.user.userId });
        return res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('userId', 'username email');
        return res.json(orders);
    } catch (error) {
        next(error);
    }
};
