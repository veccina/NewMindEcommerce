import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Register from './components/User/Register';
import Login from './components/User/Login';
import Profile from './pages/Profile';
import ProductList from './components/Product/ProductList';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment';
import AdminPanel from './components/Admin/AdminPanel';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';
import AdminInvoices from './pages/AdminInvoices';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />

                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/orders" element={<AdminOrders />} />
                    <Route path="/admin/invoices" element={<AdminInvoices />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
