import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Button,
    TextField,
    Paper,
    Grid,
} from '@mui/material';

function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const removeItem = (id) => {
        const newCart = cartItems.filter((item) => item._id !== id);
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const updateQuantity = (id, qty) => {
        const newCart = cartItems.map((item) =>
            item._id === id ? { ...item, qty: Number(qty) } : item
        );
        setCartItems(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    const handleCheckout = () => {
        navigate('/payment');
    };

    return (
        <Container sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            {cartItems.length === 0 && (
                <Typography variant="body1">No items in cart</Typography>
            )}
            {cartItems.map((item) => (
                <Paper key={item._id} sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={3}>
                            <Typography variant="h6">{item.name}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Typography>Price: ${item.price}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                type="number"
                                label="Quantity"
                                value={item.qty}
                                onChange={(e) => updateQuantity(item._id, e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Button variant="outlined" color="error" onClick={() => removeItem(item._id)}>
                                Remove
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
            {cartItems.length > 0 && (
                <>
                    <Typography variant="h6">Total: ${totalPrice.toFixed(2)}</Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={handleCheckout}>
                        Proceed to Payment
                    </Button>
                </>
            )}
        </Container>
    );
}

export default Cart;
