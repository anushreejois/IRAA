import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// REQUEST INTERCEPTOR: Automatically attaches the JWT to every request if it exists
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Standard format for JWT is 'Bearer <token>'
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR: Handles global errors (like expired tokens)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Logic for when a token is invalid or expired
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optional: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth Exports
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const signupUser = (userData) => API.post('/auth/signup', userData);

// Product Exports
export const fetchProducts = () => API.get('/products');
export const fetchProductById = (id) => API.get(`/products/${id}`);

// Order Exports (Now protected by JWT)
export const placeOrder = (orderData) => API.post('/orders/place', orderData);

export default API;