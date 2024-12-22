const express = require('express');
const cors = require('cors');
// const { consumer } = require('./config/kafka'); // only if you use Kafka
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(cors());
app.use(express.json());



app.use('/invoices', invoiceRoutes);


app.get('/', (req, res) => {
    res.send('Billing Service is up');
});

module.exports = app;
