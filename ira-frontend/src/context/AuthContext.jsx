import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('ira_user'); // Consistent naming
        const token = localStorage.getItem('token');

        if (savedUser && token && token !== "undefined") {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const res = await loginUser(credentials);

            // Log this to your console to see EXACTLY what the backend is sending
            console.log("Backend Response:", res.data);

            // 1. Destructure exactly what comes from your AuthResponse DTO
            const { token, id, name, email, role } = res.data;

            if (!token) {
                throw new Error("Token missing from server response");
            }

            // 2. Save the raw token string
            localStorage.setItem('token', token);

            // 3. Save the user object (including the role for the Curator's Desk)
            const userData = { id, name, email, role };
            localStorage.setItem('ira_user', JSON.stringify(userData));

            setUser(userData);
            return { success: true };
        } catch (err) {
            console.error("Login attempt failed:", err);
            return {
                success: false,
                message: typeof err.response?.data === 'string'
                    ? err.response.data
                    : "Access Denied. Check your credentials."
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('ira_user');
        localStorage.removeItem('token');
        // Optional: Redirect to home or login after logout
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);