const Invoice = require('../models/Invoice');

/**
 * GET /invoices?userId=xxxx
 * If userId is provided => return only that user’s invoices
 * If userId is missing => return 400 or some logic
 */
exports.getInvoicesForUser = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'Missing userId query param' });
        }
        const invoices = await Invoice.find({ userId });
        return res.json(invoices);
    } catch (error) {
        console.error('Error fetching user invoices:', error);
        return res.status(500).json({ message: 'Error fetching invoices' });
    }
};

/**
 * GET /invoices/all
 * Return all invoices (for admin usage)
 */
exports.getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find();
        return res.json(invoices);
    } catch (error) {
        console.error('Error fetching all invoices:', error);
        return res.status(500).json({ message: 'Error fetching all invoices' });
    }
};


exports.createInvoice = async (req, res) => {
    try {
        const { userId, orderId, amount, status } = req.body;
        const invoice = new Invoice({ userId, orderId, amount, status });
        await invoice.save();
        return res.status(201).json(invoice);
    } catch (error) {
        console.error('Error creating invoice:', error);
        return res.status(500).json({ message: 'Error creating invoice' });
    }
};
