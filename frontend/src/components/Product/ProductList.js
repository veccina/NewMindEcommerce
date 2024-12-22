import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ProductList() {
    const navigate = useNavigate();

    // State for the products list
    const [products, setProducts] = useState([]);

    // State for filter inputs
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState('');

    // Fetch products on component mount (and whenever we apply filter)
    useEffect(() => {
        handleApplyFilter();
        // eslint-disable-next-line
    }, []);

    // Handle "Add to Cart"
    const handleAddToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // If product is already in cart, you could increment quantity; here we just push
        cart.push({ ...product, qty: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    };

    // Build query string & fetch products
    const handleApplyFilter = async () => {
        try {
            const params = [];
            if (category) {
                params.push(`category=${encodeURIComponent(category)}`);
            }
            if (minPrice) {
                params.push(`minPrice=${encodeURIComponent(minPrice)}`);
            }
            if (maxPrice) {
                params.push(`maxPrice=${encodeURIComponent(maxPrice)}`);
            }
            if (search) {
                params.push(`search=${encodeURIComponent(search)}`);
            }
            const query = params.length > 0 ? `?${params.join('&')}` : '';

            const res = await api.get(`/products${query}`);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Product List
            </Typography>

            {/* FILTER BAR */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 3,
                    alignItems: 'center'
                }}
            >
                {/* Category Select */}
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Men">Men</MenuItem>
                        <MenuItem value="Women">Women</MenuItem>
                        <MenuItem value="Electronics">Electronics</MenuItem>
                        {/* Add more categories if desired */}
                    </Select>
                </FormControl>

                {/* Min Price */}
                <TextField
                    label="Min Price"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    sx={{ width: 100 }}
                />

                {/* Max Price */}
                <TextField
                    label="Max Price"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    sx={{ width: 100 }}
                />

                {/* Search Text */}
                <TextField
                    label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ width: 200 }}
                />

                <Button
                    variant="contained"
                    onClick={handleApplyFilter}
                    sx={{ height: 'fit-content' }}
                >
                    Apply Filter
                </Button>
            </Box>

            {/* PRODUCTS GRID */}
            <Grid container spacing={4}>
                {products.map((p) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%'
                            }}
                        >
                            {p.imageUrl && (
                                <CardMedia
                                    component="img"
                                    image={p.imageUrl}
                                    alt={p.name}
                                    sx={{ height: 200, objectFit: 'cover' }}
                                />
                            )}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {p.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {p.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Price: ${p.price}
                                </Typography>
                                {p.category && (
                                    <Typography variant="body2">
                                        Category: {p.category}
                                    </Typography>
                                )}
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    onClick={() => handleAddToCart(p)}
                                    fullWidth
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* GO TO CART BUTTON */}
            <Box textAlign="center" sx={{ mt: 4 }}>
                <Button variant="outlined" onClick={() => navigate('/cart')}>
                    Go to Cart
                </Button>
            </Box>
        </Container>
    );
}

export default ProductList;
