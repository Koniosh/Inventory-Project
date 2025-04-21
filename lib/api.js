// lib/api.js
import axios from 'axios';

const API_URL = 'https://67f7183e42d6c71cca6403bd.mockapi.io/v1/api/products';

// Fetch all products
export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
