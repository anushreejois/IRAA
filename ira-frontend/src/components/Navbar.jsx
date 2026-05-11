import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { cart } = useCart();
    const { user, logout } = useAuth();

    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

    return (
        <nav className="flex justify-between items-center px-12 py-10 bg-transparent border-b border-black/5 sticky top-0 z-50 backdrop-blur-sm">
            {/* Left */}
            <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em]">
                <Link to="/shop" className="hover:opacity-50 transition-opacity">Archive</Link>
                {user?.role === 'ROLE_ADMIN' && (
                    <Link to="/admin" className="text-black/40 hover:text-black transition-colors">Desk</Link>
                )}
            </div>

            {/* Center Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-4xl font-serif italic font-black tracking-tighter hover:opacity-70 transition-opacity">
                IRA
            </Link>

            {/* Right */}
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.3em] items-center">
                {user ? (
                    <div className="flex gap-8 items-center border-r border-black/10 pr-8">
                        <div className="flex flex-col items-end leading-none gap-1">
                            <span className="opacity-30 text-[8px] tracking-[0.2em]">Member</span>
                            <span className="font-serif italic normal-case text-sm tracking-normal">{user.name}</span>
                        </div>

                        <div className="flex gap-6">
                            <Link to="/orders" className="hover:opacity-50 transition-opacity border-b border-black/10 pb-0.5">
                                Manifest
                            </Link>
                            <button onClick={logout} className="opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                                Leave
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" className="hover:opacity-50 transition-opacity">Sign In</Link>
                )}

                <Link to="/cart" className="group flex items-center gap-2">
                    <span className="group-hover:opacity-50 transition-opacity">Bag</span>
                    <span className="bg-black text-white px-2 py-0.5 rounded-full text-[8px] tabular-nums">
                        {totalItems}
                    </span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;