import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Box
} from '@mui/material';

function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [invoices, setInvoices] = useState([]);

    // Optionally fetch user with a dedicated "me" endpoint if you have it.
    // We'll skip that part and just show orders/invoices for now.

    useEffect(() => {
        // fetch user's orders
        api.get('/orders/my')
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err));

        // fetch user's invoices
        api.get('/invoices/my')
            .then((res) => setInvoices(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                My Profile
            </Typography>

            {/* If you want to store user info in localStorage or from an endpoint: */}
            {user && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6">{user.fullName}</Typography>
                        <Typography>Email: {user.email}</Typography>
                        <Typography>Address: {user.address?.line1}, {user.address?.city}</Typography>
                    </CardContent>
                </Card>
            )}

            <Typography variant="h5" sx={{ mt: 2 }}>
                My Orders
            </Typography>
            {orders.map((o) => (
                <Card key={o._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography>Order ID: {o._id}</Typography>
                        <Typography>Status: {o.status}</Typography>
                        <Typography>Total: ${o.total}</Typography>
                        <Box sx={{ pl: 2, mt: 1 }}>
                            {o.items.map((item) => (
                                <Typography key={item.productId}>
                                    {item.name} x {item.quantity} = ${item.price * item.quantity}
                                </Typography>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Typography variant="h5" sx={{ mt: 4 }}>
                My Invoices
            </Typography>
            {invoices.map((inv) => (
                <Card key={inv._id} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography>Invoice ID: {inv._id}</Typography>
                        <Typography>Amount: ${inv.amount}</Typography>
                        <Typography>Status: {inv.status}</Typography>
                        <Typography>Created: {new Date(inv.createdAt).toLocaleString()}</Typography>
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default Profile;
