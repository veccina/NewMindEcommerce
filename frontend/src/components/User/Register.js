import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box
} from '@mui/material';

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        address: {
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const [_, field] = name.split('.');
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [field]: value }
            }));
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/users/register', form);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    fullWidth
                    margin="normal"
                    value={form.username}
                    onChange={handleChange}
                />
                <TextField
                    label="Full Name"
                    name="fullName"
                    fullWidth
                    margin="normal"
                    value={form.fullName}
                    onChange={handleChange}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={form.password}
                    onChange={handleChange}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Address
                </Typography>
                <TextField
                    label="Line 1"
                    name="address.line1"
                    fullWidth
                    margin="normal"
                    value={form.address.line1}
                    onChange={handleChange}
                />
                <TextField
                    label="Line 2"
                    name="address.line2"
                    fullWidth
                    margin="normal"
                    value={form.address.line2}
                    onChange={handleChange}
                />
                <TextField
                    label="City"
                    name="address.city"
                    fullWidth
                    margin="normal"
                    value={form.address.city}
                    onChange={handleChange}
                />
                <TextField
                    label="State"
                    name="address.state"
                    fullWidth
                    margin="normal"
                    value={form.address.state}
                    onChange={handleChange}
                />
                <TextField
                    label="ZIP"
                    name="address.zip"
                    fullWidth
                    margin="normal"
                    value={form.address.zip}
                    onChange={handleChange}
                />
                <Button variant="contained" type="submit" sx={{ mt: 3 }}>
                    Register
                </Button>
            </Box>
        </Container>
    );
}

export default Register;
