import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Login = () => {
    // 1. Changed 'username' to 'email'
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(credentials);

        if (result.success) {
            navigate('/shop');
        } else {
            setError(result.message || "Invalid credentials. Please check your email and password.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            <Navbar />

            <div className="flex justify-center items-center h-[calc(100vh-100px)] px-6">
                <div className="w-full max-w-md">
                    <header className="text-center mb-12">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-3 font-bold">
                            Member Access
                        </span>
                        <h1 className="font-serif text-5xl italic tracking-tight text-[#1A1A1A]">Sign In.</h1>
                    </header>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-[10px] uppercase tracking-widest p-4 mb-8 text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div>
                            {/* 2. Label changed to Email */}
                            <label className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold block mb-3">Email Address</label>
                            <input
                                type="email"
                                name="email" // 3. Name must be 'email'
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-black/10 py-3 focus:border-black outline-none transition-colors font-serif italic text-lg"
                                placeholder="archivist@ira.com"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold block mb-3">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-black/10 py-3 focus:border-black outline-none transition-colors font-serif italic text-lg"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all cursor-pointer mt-8"
                        >
                            Enter the Archive
                        </button>
                    </form>

                    <div className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] opacity-40">
                        New to the collection? <Link to="/signup" className="border-b border-black text-black ml-2">Create Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;