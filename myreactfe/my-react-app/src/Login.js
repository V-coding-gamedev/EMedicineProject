import React, {useEffect, useState} from 'react';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import useLogin from './HelperFiles/useLogin'; 

// Custom hook để xử lý logic đăng nhập
//const useLogin = (email, password) => {
//    const [loginStatus, setLoginStatus] = useState(null);

//    useEffect(() => {
//        axios.get(`https://localhost:5000/api/Users/GetUserByEmail/${email}/${password}`)
//            .then(response => {
//                console.log(response.data)
//                setLoginStatus(response.data);
//            })
//            .catch(error => {
//                console.error('Error fetching data:', error);
//            });
//    }, []);
//    // [email, password]

//    return loginStatus; 
//}

const Login = () => {
    const btnStyle = {
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem'
    }

    // Khai báo state để lưu trữ giá trị input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loginStatus, error } = useLogin();
    const navigate = useNavigate(); // Khai báo hook useNavigate

    let errorMessage = null; 

    // Hàm xử lý sự kiện thay đổi input email
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    // Hàm xử lý sự kiện thay đổi input password
    const handlePasswordChange = (event) => {
        setPassword(event.target.value); 
    }

    // Hàm xử lý sự kiện khi ấn nút login
    const handleLogin = async () => {
        // Call the login function from the custom hook
        await login(email, password); 
    }

    useEffect(() => {
        if (loginStatus) {
            console.log('Login successful, data: ', loginStatus);
            navigate('/homepage');
        } else if (error) {
            console.log('Error:', error.message);
        }
        // Mảng [loginStatus, error, navigate] trong useEffect xác định khi nào useEffect cần chạy lại, dựa trên sự thay đổi của các giá trị trong mảng này.
    }, [loginStatus, error, navigate]); 

    if (error) {
        errorMessage = <div className="alert alert-danger" role="alert">{error}</div>;
    }

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/07/medical-logo.jpg"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
                            <div className="form-outline mb-4">
                                <input type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" onChange={handleEmailChange} />
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Enter password" onChange={handlePasswordChange} />
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>
                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg"
                                    style={btnStyle} onClick={handleLogin}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/register"
                                    className="link-danger">Register</Link></p>
                            </div>

                            {/*kiểm tra xem error có giá trị truthy hay không (không phải là null, false, 0, undefined)*/}
                            {/*{error && <div className="alert alert-danger" role="alert">{error}</div>}*/}
                            {errorMessage}
                            
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
