import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 

const Profile = () => {

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

    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    const [_id, setId] = useState('');
    const [_firstName, setFirstName] = useState('');
    const [_lastName, setLastName] = useState('');
    const [_email, setEmail] = useState('');
    const [_password, setPassword] = useState('');
    const [_type, setType] = useState('');

    useEffect(() => {
        const getUserByEmailAndPassword = async () => {
            const url = 'https://localhost:5000/api/Users/GetUserByEmail/' + email + '/' + password; 

            axios.get(url).then((response) => {
                setId(response.data.id);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setType(response.data.type);
            }).catch((error => {
                // In ra thông tin chi tiết về lỗi
                if (error.response) {
                    // Lỗi từ phía server, ví dụ: 404, 500, vv.
                    console.log('Error status:', error.response.status);
                    console.log('Error data:', error.response.data);
                    console.log('Error headers:', error.response.headers);
                } else if (error.request) {
                    // Không nhận được phản hồi từ server, vấn đề có thể xảy ra ở request
                    console.log('Error request:', error.request);
                } else {
                    // Lỗi xảy ra khi tạo request
                    console.log('Error message:', error.message);
                } 
            }))
        }

        getUserByEmailAndPassword(); 
    })

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

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
                <table style={{ borderCollapse: 'collapse', width: '50%', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                            <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', fontSize: '16px' }}>Field</th>
                            <th style={{ border: '1px solid #dee2e6', padding: '12px', textAlign: 'left', fontSize: '16px' }}>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>Id</td>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>{_id}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>LastName</td>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>{_lastName}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>FirstName</td>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>{_firstName}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>Email</td>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>{_email}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>Password</td>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>{_password}</td>
                        </tr>
                        <tr>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>Type</td>
                            <td style={{ border: '1px solid #dee2e6', padding: '12px', fontSize: '14px' }}>{_type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>    
        </div>
    );
}

export default Profile; 