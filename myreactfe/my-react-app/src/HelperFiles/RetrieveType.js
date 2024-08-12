import React, { useState } from 'react';
import axios from 'axios';

const RetrieveType = () => {
    const [types, setTypes] = useState('');

    const retrieveType = async () => {
        try {
            const response = await axios.get('https://localhost:5000/api/Users/GetTypes');
            /*console.log(response.data);*/
            setTypes(response.data);

        } catch (error) {
            console.log("Error fetch data: " + error);
            setTypes('');
        }
    }

    return { types, retrieveType };
};

export default RetrieveType; 