import logo from './img/logo.svg';
import './css/App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RouterPage from './RouterPage'

const App = () => {
    // data là 1 mảng rỗng ban đầu
    // setData đc sd để cập nhật hàm data
    const [data, setData] = useState([]);

    // useEffect: 1 hook đc sd để xử lý các tác vụ
    //useEffect(() => {
    //    // sd useEffect để gửi request tới api
    //    axios.get('https://localhost:5000/api/Orders')
    //        .then(response => {
    //            // gắn các data từ response vào trong mảng data
    //            console.log(response.data)
    //            setData(response.data);
    //        })
    //        .catch(error => {
    //            console.error('Error fetching data:', error);
    //        });
    //}, []);

    return (
        <div>
            <RouterPage/>
        </div>
    );
}

export default App;

