import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopNav from '../components/Layout/TopNav';
import Footer from './Footer';

function MainLayout() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <TopNav />
            <Box sx={{ flex: 1, p: 2 }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    );
}

export default MainLayout;
