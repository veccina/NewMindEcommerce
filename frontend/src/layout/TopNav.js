import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeToggle } from '../../theme/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function decodeToken(token) {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
}

function TopNav() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let isAdmin = false;
    if (token) {
        const decoded = decodeToken(token);
        if (decoded && decoded.isAdmin) {
            isAdmin = true;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const { mode, toggleColorMode } = useThemeToggle();

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    My E-Commerce
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/" sx={{ mr: 1 }}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/cart" sx={{ mr: 1 }}>
                        Cart
                    </Button>

                    {token ? (
                        <>
                            <Button color="inherit" component={Link} to="/profile" sx={{ mr: 1 }}>
                                Profile
                            </Button>
                            {isAdmin && (
                                <Button color="inherit" component={Link} to="/admin" sx={{ mr: 1 }}>
                                    Admin
                                </Button>
                            )}
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Box>
                <IconButton color="inherit" onClick={toggleColorMode} sx={{ ml: 2 }}>
                    {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default TopNav;
