import react, { useState } from 'react';
import axios from 'axios'; 

const UseRegister = () => {
    const [registerStatus, setRegisterStatus] = useState(null);
    const [error, setError] = useState(null);

    const register = async (firstName, lastName, email, password, fund, type) => {
        //try {
        //    const response = await axios.get('https://localhost:5000/api/Users');
        //    setRegisterStatus(response.data);
        //    setError(null);
        //} catch (error) {
        //    console.log("Error fetch data: " + error);
        //    setError(error);
        //    setRegisterStatus(null);
        //}

        axios({
            method: 'post',
            url: 'https://localhost:5000/api/Users',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                fund: fund,
                type: type
            }
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }); 
    };

    return { registerStatus, error, register };

}

export default UseRegister; 
