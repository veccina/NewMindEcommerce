const express = require('express');
const router = express.Router();
const { getInvoicesForUser, getAllInvoices, createInvoice } = require('../controllers/invoiceController');


router.get('/', getInvoicesForUser);


router.get('/all', getAllInvoices);


router.post('/', createInvoice);

module.exports = router;
