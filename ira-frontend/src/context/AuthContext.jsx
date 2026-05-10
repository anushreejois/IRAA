import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Check for both user data and token on app startup
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const res = await loginUser(credentials);

            // 2. Extract JWT and User details from backend AuthResponse
            const { token, ...userData } = res.data;

            // 3. Store the token separately for the API interceptor
            localStorage.setItem('token', token);

            // 4. Store the rest of the user info (name, email, role)
            localStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);
            return { success: true };
        } catch (err) {
            console.error("Login failed", err);
            return {
                success: false,
                message: err.response?.data || "Invalid credentials"
            };
        }
    };

    const logout = () => {
        // 5. Clean up all security credentials on logout
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);