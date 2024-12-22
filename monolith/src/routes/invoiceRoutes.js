const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const { getMyInvoices, getAllInvoices } = require('../controllers/invoiceController');

router.get('/my', auth, getMyInvoices);
router.get('/admin/all', auth, adminAuth, getAllInvoices);

module.exports = router;
