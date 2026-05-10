import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);

// Ensure these specific names are used:
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const signupUser = (userData) => API.post('/auth/signup', userData);
// In src/services/api.js
export const placeOrder = (orderData) => API.post('/orders/place', orderData);
export default API;