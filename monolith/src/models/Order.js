const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name:      { type: String, required: true },
    price:     { type: Number, required: true },
    quantity:  { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items:  [orderItemSchema],
    total:  { type: Number, required: true },
    status: { type: String, default: 'PENDING' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
