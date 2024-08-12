import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [loginStatus, setLoginStatus] = useState(null);
    const [error, setError] = useState(null); 

    const login = async (email, password) => {
        try {
            const response = await axios.get(`https://localhost:5000/api/Users/GetUserByEmail/${email}/${password}`);
            setLoginStatus(response.data);
            setError(null); 
        } catch (err) {
            console.log("Error fetch data: " + err);
            setError("Login failed. Check your inputted information");
            setLoginStatus(null); 
        }
        
    };

    return { loginStatus, login, error };
};

export default useLogin;
