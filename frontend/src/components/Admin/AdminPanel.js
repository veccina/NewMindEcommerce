import React from 'react';
import { Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
    const navigate = useNavigate();

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Admin Panel
            </Typography>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={() => navigate('/admin/users')}>
                    Manage Users
                </Button>
                <Button variant="contained" onClick={() => navigate('/admin/orders')}>
                    View Orders
                </Button>
                <Button variant="contained" onClick={() => navigate('/admin/invoices')}>
                    View Invoices
                </Button>
            </Stack>
        </Container>
    );
}

export default AdminPanel;
