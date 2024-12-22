import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.dark',
                color: 'white',
                textAlign: 'center',
                py: 2,
                mt: 'auto'
            }}
        >
            <Typography variant="body2">
                &copy; {new Date().getFullYear()} My E-Commerce. All rights reserved.
            </Typography>
        </Box>
    );
}

export default Footer;
