import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../services/api'; // We'll add this next

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on startup
    useEffect(() => {
        const savedUser = localStorage.getItem('ira_user');
        if (savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const res = await loginUser(credentials);
            const userData = res.data; // This usually contains the user info + token
            setUser(userData);
            localStorage.setItem('ira_user', JSON.stringify(userData));
            return { success: true };
        } catch (err) {
            console.error("Login failed", err);
            return { success: false, message: err.response?.data?.message || "Invalid credentials" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ira_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);