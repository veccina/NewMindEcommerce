const axios = require('axios');

exports.getMyInvoices = async (req, res, next) => {
    try {
        const userId = req.user.userId; // from JWT
        const url = `${process.env.BILLING_SERVICE_URL}/invoices?userId=${userId}`;
        const response = await axios.get(url);
        return res.json(response.data);
    } catch (error) {
        console.error('Error in getMyInvoices:', error);
        return res.status(500).json({ message: 'Failed to fetch user invoices' });
    }
};

exports.getAllInvoices = async (req, res, next) => {
    try {
        const url = `${process.env.BILLING_SERVICE_URL}/invoices/all`;
        const response = await axios.get(url);
        return res.json(response.data);
    } catch (error) {
        console.error('Error in getAllInvoices:', error);
        return res.status(500).json({ message: 'Failed to fetch all invoices' });
    }
};
