// src/apiService.js

import axios from 'axios';

const API_URL = 'https://api.example.com'; // Replace with your API URL

export const getData = async () => {
    try {
        const response = await axios.get(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
