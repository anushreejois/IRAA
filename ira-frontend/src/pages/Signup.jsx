import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../services/api'; // Changed from 'signup' to 'signupUser'
import Navbar from '../components/Navbar';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signupUser(formData);
            alert("Account created successfully. Please sign in.");
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try a different username.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            <Navbar />
            <div className="flex justify-center items-center h-[calc(100vh-100px)] px-6">
                <div className="w-full max-w-md">
                    <header className="text-center mb-12">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-3 font-bold">New Archivist</span>
                        <h1 className="font-serif text-5xl italic tracking-tight">Create Account.</h1>
                    </header>

                    {error && (
                        <div className="bg-red-50 text-red-500 text-[10px] uppercase tracking-widest p-4 mb-8 text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold block mb-2">Username</label>
                            <input type="text" name="username" onChange={handleChange} required className="w-full bg-transparent border-b border-black/10 py-3 focus:border-black outline-none transition-colors font-serif italic text-lg" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold block mb-2">Email</label>
                            <input type="email" name="email" onChange={handleChange} required className="w-full bg-transparent border-b border-black/10 py-3 focus:border-black outline-none transition-colors font-serif italic text-lg" />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold block mb-2">Password</label>
                            <input type="password" name="password" onChange={handleChange} required className="w-full bg-transparent border-b border-black/10 py-3 focus:border-black outline-none transition-colors font-serif italic text-lg" />
                        </div>
                        <button type="submit" className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all cursor-pointer mt-6">
                            Join the Archive
                        </button>
                    </form>

                    <div className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] opacity-40">
                        Already have an account? <Link to="/login" className="border-b border-black text-black ml-2">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;