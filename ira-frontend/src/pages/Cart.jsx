import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    // Calculate subtotal with proper Indian formatting logic
    const totalMRP = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-[#F4F1EA] selection:bg-[#B3541E] selection:text-white">
            <Navbar />

            <div className="max-w-6xl mx-auto py-16 px-6 md:px-12">
                {/* --- CENTERED BOUTIQUE HEADER --- */}
                <header className="text-center mb-16">
                    <h1 className="font-serif text-5xl text-[#2D2D2D] mb-4 tracking-tight">Shopping Cart</h1>
                    <div className="w-16 h-[2px] bg-[#B3541E] mx-auto opacity-40"></div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN: THE ITEMS LOG */}
                    <div className="lg:col-span-7 space-y-6">
                        {cart.length === 0 ? (
                            <div className="bg-white border border-[#E5E1DA] p-24 text-center rounded-sm shadow-sm">
                                <p className="font-serif italic text-2xl opacity-20 mb-8">Your archive is empty.</p>
                                <button
                                    onClick={() => navigate('/shop')}
                                    className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#B3541E] border-b border-[#B3541E]/20 pb-1 hover:border-[#B3541E] transition-all"
                                >
                                    Return to Gallery →
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="bg-white border border-[#E5E1DA] p-6 rounded-sm flex flex-col sm:flex-row gap-8 relative shadow-sm transition-all hover:shadow-md">
                                    {/* 1. IMAGE BOX: Contained & Padded */}
                                    <div className="w-full sm:w-32 h-40 sm:h-32 bg-[#F9F7F2] p-4 flex-shrink-0 flex items-center justify-center">
                                        <img
                                            src={item.image_url || item.imageUrl}
                                            className="w-full h-full object-contain"
                                            alt={item.title}
                                            onError={(e) => { e.target.src = "/landing page.png"; }}
                                        />
                                    </div>

                                    {/* 2. ITEM DETAILS */}
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="font-serif text-2xl text-[#2D2D2D] mb-1">{item.title}</h3>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B3541E] mb-4 opacity-80">
                                            {item.department} / Size: {item.size}
                                        </span>

                                        <div className="flex flex-wrap items-center gap-8">
                                            <span className="text-[#B3541E] font-bold text-xl tabular-nums">
                                                ₹{item.price?.toLocaleString('en-IN')}
                                            </span>

                                            {/* Quantity Selection Toggle */}
                                            <div className="flex items-center border border-[#E5E1DA] rounded-sm bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, -1)}
                                                    className="px-4 py-1 hover:bg-[#F4F1EA] transition-colors font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="px-5 py-1 text-xs border-x border-[#E5E1DA] font-bold tabular-nums">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, 1)}
                                                    className="px-4 py-1 hover:bg-[#F4F1EA] transition-colors font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove X */}
                                    <button
                                        onClick={() => removeFromCart(item.id, item.size)}
                                        className="absolute top-6 right-6 text-[10px] font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        ✕ Remove
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* RIGHT COLUMN: PRICE DETAILS & LOGISTICS */}
                    <div className="lg:col-span-5">
                        <div className="bg-white border border-[#E5E1DA] p-10 rounded-sm shadow-sm sticky top-32">
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] mb-10 pb-4 border-b border-[#E5E1DA] text-[#2D2D2D]">
                                Price Details
                            </h2>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between text-[11px] uppercase tracking-wider">
                                    <span className="opacity-50">Total MRP ({cart.length} Items)</span>
                                    <span className="tabular-nums">₹{totalMRP.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-wider">
                                    <span className="opacity-50">Shipping Fee</span>
                                    <span className="text-green-600 font-bold tracking-widest">FREE</span>
                                </div>
                                <div className="flex justify-between text-2xl font-serif italic pt-6 border-t border-[#E5E1DA] text-[#2D2D2D]">
                                    <span>Total Amount</span>
                                    <span className="font-bold not-italic tabular-nums">₹{totalMRP.toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            {/* LOGISTICS SECTION */}
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 block">Delivery Address:</label>
                                    <textarea
                                        placeholder="STREET, CITY, ZIP CODE..."
                                        className="w-full bg-[#FAF9F6] border border-[#E5E1DA] p-4 text-[11px] tracking-widest outline-none focus:border-[#B3541E] transition-colors h-28 resize-none uppercase"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 block">Payment Method:</label>
                                    <div className="space-y-3">
                                        {['Credit / Debit Card', 'UPI / Google Pay', 'Cash on Delivery'].map((method) => (
                                            <label key={method} className="flex items-center gap-4 cursor-pointer group">
                                                <input type="radio" name="payment" className="accent-[#B3541E]" />
                                                <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-100 transition-opacity font-bold">
                                                    {method}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => alert("Acquisition recorded. Payment Successful.")}
                                className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] mt-12 hover:bg-black transition-all shadow-xl active:scale-[0.98] cursor-pointer"
                            >
                                Pay ₹{totalMRP.toLocaleString('en-IN')}
                            </button>

                            <p className="mt-8 text-[8px] uppercase tracking-[0.3em] opacity-20 text-center leading-relaxed font-bold">
                                Transactions secured by IRA Archival Protocol.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;