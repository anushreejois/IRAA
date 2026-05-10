import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. Import Auth hook

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth(); // 2. Get user data and logout function

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center px-12 py-8 bg-transparent border-b border-black/5">
      {/* Left Side */}
      <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em]">
        <Link to="/shop" className="hover:opacity-50 transition-opacity">Shop</Link>
        <Link to="#" className="hover:opacity-50 transition-opacity text-black/20">Heritage</Link>
      </div>

      {/* Center Logo */}
      <Link to="/" className="text-4xl font-serif italic font-black tracking-tighter cursor-pointer">
        IRA
      </Link>

      {/* Right Side */}
      <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] items-center">
        {/* 3. Conditional Rendering based on Login Status */}
        {user ? (
          <div className="flex gap-6 items-center">
            <span className="opacity-40 italic font-serif normal-case text-xs">
              Welcome, {user.username}
            </span>
            <button
              onClick={logout}
              className="hover:opacity-50 transition-opacity cursor-pointer border-b border-black/20 pb-0.5"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/login" className="hover:opacity-50 transition-opacity">Sign In</Link>
        )}

        <Link to="/cart" className="hover:opacity-50 transition-opacity flex items-center gap-1">
          Bag <span className="opacity-40">({totalItems})</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;