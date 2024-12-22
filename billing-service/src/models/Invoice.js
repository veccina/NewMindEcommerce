const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    userId:  { type: String, required: true },
    orderId: { type: String },
    amount:  { type: Number },
    status:  { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
