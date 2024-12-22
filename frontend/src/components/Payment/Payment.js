import React from 'react';
import axios from 'axios';
import { Container, Button, Typography } from '@mui/material';

function Payment() {
    const handlePayment = async () => {
        try {
            // Fake user/order details for the example
            const userId = '123';
            const orderId = 'abc';
            const amount = 99.99;

            // Payment service runs on :4000 by default
            const res = await axios.post('http://localhost:4000/pay', {
                userId,
                orderId,
                amount,
            });
            alert('Payment processed: ' + res.data.message);
            // Optionally clear cart from localStorage
            localStorage.removeItem('cart');
        } catch (error) {
            console.error(error);
            alert('Payment failed');
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Payment Page
            </Typography>
            <Button variant="contained" onClick={handlePayment}>
                Pay Now
            </Button>
        </Container>
    );
}

export default Payment;
