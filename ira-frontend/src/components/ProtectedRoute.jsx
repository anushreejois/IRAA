import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute
 * @param {boolean} isAdminRequired - If true, only users with ROLE_ADMIN can enter.
 * If false (default), any logged-in user can enter.
 */
const ProtectedRoute = ({ children, isAdminRequired = false }) => {
    const { user, loading } = useAuth();

    // 1. While AuthContext is checking localStorage, show a minimal loader
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F9F7F2] flex justify-center items-center">
                <span className="font-serif italic opacity-30 text-xl animate-pulse">
                    Authenticating...
                </span>
            </div>
        );
    }

    // 2. Not logged in? Send them to the login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. Admin required but user isn't an admin? Send them home
    if (isAdminRequired && user.role !== 'ROLE_ADMIN') {
        console.warn("Access denied: Admin privileges required.");
        return <Navigate to="/" replace />;
    }

    // 4. All checks passed? Render the actual page (the children)
    return children;
};

export default ProtectedRoute;