import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
    Container,
    Typography,
    Card,
    CardContent
} from '@mui/material';

function AdminInvoices() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        api.get('/invoices/admin/all')
            .then(res => setInvoices(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                All Invoices
            </Typography>
            {invoices.map(inv => (
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

export default AdminInvoices;
