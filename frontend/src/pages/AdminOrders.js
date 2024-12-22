import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box
} from '@mui/material';

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get('/orders/admin/all')
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                All Orders
            </Typography>
            {orders.map(order => (
                <Card key={order._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography>Order ID: {order._id}</Typography>
                        <Typography>User: {order.userId?.username} / {order.userId?.email}</Typography>
                        <Typography>Status: {order.status}</Typography>
                        <Typography>Total: ${order.total}</Typography>
                        <Box sx={{ ml: 2 }}>
                            {order.items.map((item, i) => (
                                <Typography key={i}>
                                    {item.name} x {item.quantity} = ${item.price * item.quantity}
                                </Typography>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default AdminOrders;
