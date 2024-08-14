import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import Profile from './Profile';
import Orders from './Orders';
import Cart from './Cart';

const RouterPage = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </Router>
    )
}

export default RouterPage;