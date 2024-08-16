import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
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

    const gridContainer = {
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: '300px 300px 300px 300px',
        gridTemplateRows: '300px 300px 300px 300px',
        gridGap: '5px', 
        justifyContent: 'center'
    }

    const gridItem = {
        backgroundColor: '#dedfe0',
        textAlign: 'center',
        fontSize: '20px', 
        margin: '20px',
        color: '#333',
        borderStyle: 'solid',
        borderRadius: '20px',
    }

    const [medicineList, setMedicines] = useState([])

    useEffect(() => {
        const getMedicines = async () => {
            axios.get('https://localhost:5000/GetAllMedicines').then((response) => {
                /*console.log(response.data);*/
                setMedicines(response.data);
            }).catch((error) => {
                console.log(error)
            })
        }
        getMedicines(); 
    }, [])

    // console.log(medicineList); // check

    // xem lại
    const handleQuantityChange = (id, newQuantity) => {
        setMedicines((prevMedicines) =>
            prevMedicines.map((medicine) =>
                medicine.id === id ? { ...medicine, quantity: newQuantity } : medicine
            )
        );
    };

    const navigate = useNavigate(); 

    const navigateToHomePage = () => {
        navigate('/homepage');
    }

    const navigateToProfilePage = () => {
        navigate('/profile');
    }

    const navigateToOrdersPage = () => {
        navigate('/orders');
    }

    const navigateToCartPage = () => {
        navigate('/cart');
    }

    const logout = () => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        navigate('/')
    }

    const [cartItems, setCartItems] = useState([]); 
    
    const addToCart = (medicine) => {
        setCartItems((prevCartItems) => [...prevCartItems, medicine]);
    }; 

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); 
    console.log(JSON.stringify(cartItems, null, 2));
    
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

            <div style={gridContainer}>
                {medicineList.map((medicine) => {
                    return (
                        <div style={gridItem} key={medicine.id}>
                            <h3>{medicine.name}</h3>
                            <h4>Price: {medicine.unitPrice}</h4>
                            <div style={{ display: 'flex', marginLeft: '10px', marginRight: '10px' }}>
                                <h4>Quantity: </h4>

                                <input
                                    style={{ marginLeft: '10px' }}
                                    type="number" id="quantity"
                                    class="form-control"
                                    value={medicine.quantity}
                                    onChange={(e) => handleQuantityChange(medicine.id, e.target.value)}
                                />
                            </div>
                            
                            <h4>Status: {medicine.status}</h4>
                            <button onClick={() => addToCart(medicine)}>Add To Cart</button>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

export default HomePage;