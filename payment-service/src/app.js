const express = require('express');
const cors = require('cors');
const { producer } = require('./config/kafka');

const app = express();
app.use(cors());
app.use(express.json());

// Dummy Payment Endpoint
app.post('/pay', async (req, res) => {
    try {
        // In a real scenario, you'd process actual payment logic here
        const { userId, orderId, amount } = req.body;

        // Payment successful, produce event to Kafka
        await producer.send({
            topic: process.env.KAFKA_PAYMENT_TOPIC || 'payment-completed',
            messages: [
                {
                    value: JSON.stringify({
                        userId,
                        orderId,
                        amount,
                        status: 'COMPLETED',
                        timestamp: new Date().toISOString(),
                    }),
                },
            ],
        });

        return res.status(200).json({ message: 'Payment successful', status: 'COMPLETED' });
    } catch (error) {
        console.error('Payment error:', error);
        return res.status(500).json({ message: 'Payment failed' });
    }
});

module.exports = app;
