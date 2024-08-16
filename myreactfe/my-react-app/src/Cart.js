import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const Carts = () => {
    const headerStyle = {
        background: '#333',
        color: '#fff',
        display: 'flex',
        padding: '15px'
    }

    const logoutBtnStyle = {
        marginLeft: '900px',
        background: '#333',
        color: '#ff1100',
        borderColor: '#ff1100',
        borderStyle: 'solid'
    }

    const navigate = useNavigate();

    const navigateToHomePage = () => {
        navigate('/homepage');
    }

    const navigateToProfilePage = () => {
        console.log("my profile");
        navigate('/profile');
    }

    const navigateToOrdersPage = () => {
        console.log("my order");
        navigate('/orders');
    }

    const navigateToCartPage = () => {
        console.log("my cart");
        navigate('/cart');
    }

    const logout = () => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        navigate('/')
    }

    const [cartItems, setCartItems] = useState([]); 

    const storedMedicineArray = JSON.parse(sessionStorage.getItem('cartItems'));

    // console.log(storedMedicineArray);
    /*setCartItems(storedMedicineArray); */
    /*console.log(cartItems);*/

    useEffect(() => {
        const storedMedicineArray = JSON.parse(sessionStorage.getItem('cartItems'));

        if (storedMedicineArray && Array.isArray(storedMedicineArray)) {
            setCartItems(storedMedicineArray);
        }
    }, []);

    console.log(cartItems)


    return (
        <div>
            <header style={headerStyle}>
                <div style={{ display: 'flex' }}>
                    <h2 style={{ marginLeft: '20px', fontSize: '20px' }} onClick={navigateToHomePage}>E-Medicine Web</h2>
                    <h2 style={{ marginLeft: '40px', fontSize: '20px' }} onClick={navigateToProfilePage}>My Profile</h2>
                    <h2 style={{ marginLeft: '40px', fontSize: '20px' }} onClick={navigateToOrdersPage}>My Orders</h2>
                    <h2 style={{ marginLeft: '40px', fontSize: '20px' }} onClick={navigateToCartPage}>Cart</h2>
                </div>

                <button style={logoutBtnStyle} onClick={logout}>
                    Logout
                </button>

            </header>

            <div>
                Carts
            </div>

            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <p>Name: {item.name}</p>
                        <p>Manufacturer: {item.manufacturer}</p>
                        <p>Unit Price: {item.unitPrice}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Discount: {item.discount}</p>
                        <p>Expiration Date: {item.expDate}</p>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Carts; 