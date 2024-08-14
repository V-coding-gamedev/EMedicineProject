import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom'
import './css/Login.css'; // Nhập tệp CSS
import 'bootstrap/dist/css/bootstrap.min.css';
/*import RetrieveType from './HelperFiles/RetrieveType';*/
import axios from 'axios';

const Register = () => {
    const bgColor = {
        backgroundColor: '#eee'
    }

    const formBdRadius = {
        borderRadius: '25px',
    }

    // gọi hàm RetrieveTypes và gắn các giá trị trả về vào types
    // types là state (trạng thái) chứa dữ liệu mà bạn lấy được từ API.
    // retrieveType là một hàm async được dùng để thực hiện việc gọi API và cập nhật lại state types.
    // const { types, setRetrieveType } = RetrieveType(); // object

    const [types, setRetrieveType] = useState([]); 
    const [hasRetrieved, setHasRetrieved] = useState(false); // array
    const navigate = useNavigate(); 

    const handleRetrieveType = async () => {
        const response = await axios.get('https://localhost:5000/api/Users/GetTypes');
        setRetrieveType(response.data); 
        setHasRetrieved(true)
    }

    useEffect(() => {
        handleRetrieveType(); 
    });

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fund, setFund] = useState('');

    const getInitialValue = () => {
        return 'Premium'; 
    }
    const [type, setType] = useState(getInitialValue);

    const retrieveFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const retrieveLastName = (event) => {
        setLastName(event.target.value);
    }

    const retrieveEmail = (event) => {
        setEmail(event.target.value);
    }

    const retrievePassword = (event) => {
        setPassword(event.target.value);
    }

    const retrieveFund = (event) => {
        setFund(event.target.value);
    }

    const retrieveType = (event) => {
        setType(event.target.value);
    }

    const handleRegister = async () => {
        axios({
            method: 'post',
            url: 'https://localhost:5000/api/Users',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                fund: fund,
                type: type, 
                status: 1,
            }
        }).then((response) => {
            console.log('response: ' + response.data);
            navigate('/');
        }, (error) => {
            /*console.log('error: ' + error);*/
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
        });
    }

    return (
        <section class="vh-100" style={bgColor}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style={formBdRadius}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form class="mx-1 mx-md-4">
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="text" id="firstName" class="form-control" onChange={retrieveFirstName} />
                                                    <label class="form-label" for="firstName">First Name</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="text" id="lastName" class="form-control" onChange={retrieveLastName} />
                                                    <label class="form-label" for="lastName">Last Name</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="email" id="inputtedEmail" class="form-control" onChange={retrieveEmail} />
                                                    <label class="form-label" for="inputtedEmail">Email</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="password" id="inputtedPassword" class="form-control" onChange={retrievePassword} />
                                                    <label class="form-label" for="inputtedPassword">Password</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="password" id="repeatPassword" class="form-control" />
                                                    <label class="form-label" for="repeatPassword">Repeat your password</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <input type="number" id="fund" class="form-control" onChange={retrieveFund} />
                                                    <label class="form-label" for="fund">Fund</label>
                                                </div>
                                            </div>
                                                
                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init class="form-outline flex-fill mb-0">
                                                    <label class="form-label" for="type">Type</label>
                                                    {/*onLoad={handleRetrieveType}*/}
                                                    <select className="form-control" id="inputtedType" onChange={retrieveType}  >
                                                        {types.map((type, index) => {
                                                            return (
                                                                <option key={index} value={type}>
                                                                    {type}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button"
                                                    data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
                                                    onClick={handleRegister}>
                                                    Register
                                                </button>
                                            </div>
                                        </form>

                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img
                                            src="https://uploads.turbologo.com/uploads/design/hq_preview_image/881852/draw_svg20210625-19886-u8ghol.svg.png"
                                            class="img-fluid" alt="Sample img"/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register;