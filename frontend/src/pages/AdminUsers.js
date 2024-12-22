import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
    Container,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
} from '@mui/material';

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users/admin/all')
            .then((res) => setUsers(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/admin/${id}`);
            alert('User deleted');
            setUsers(users.filter(u => u._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Manage Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin?</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u._id}>
                                <TableCell>{u.fullName}</TableCell>
                                <TableCell>{u.username}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.isAdmin ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(u._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default AdminUsers;
