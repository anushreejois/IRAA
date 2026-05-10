import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            <Navbar />

            <div className="px-12 py-20 max-w-7xl mx-auto">
                <header className="mb-20 border-b border-black/5 pb-10">
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 block mb-3 font-bold">
                        Archive Bag
                    </span>
                    <h1 className="font-serif text-6xl italic tracking-tight text-[#1A1A1A]">Your Selection.</h1>
                </header>

                {cart.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="font-serif text-2xl italic opacity-30 mb-8">The bag is currently empty.</p>
                        <Link to="/shop" className="text-[10px] uppercase tracking-[0.4em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
                            Return to Gallery
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-24">
                        {/* LEFT: ITEM LIST */}
                        <div className="lg:w-2/3 space-y-12">
                            {cart.map((item) => (
                                /* Key should be a combination of ID and Size to be truly unique */
                                <div key={`${item.id}-${item.size}`} className="flex gap-10 border-b border-black/5 pb-12 items-center">
                                    <div className="w-32 h-44 bg-gray-100 overflow-hidden">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale-[20%]"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-serif text-2xl italic">{item.title}</h3>
                                            {/* Updated: Pass both ID and Size to remove */}
                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="text-[9px] uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity cursor-pointer"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <p className="text-[9px] uppercase tracking-widest opacity-40 mb-1">
                                            Artifact No. 00{item.id}
                                        </p>
                                        {/* Display the Size selection */}
                                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 italic">
                                            Size: {item.size}
                                        </p>

                                        <div className="flex items-center gap-6">
                                            <div className="flex border border-black/10 items-center">
                                                {/* Updated: Pass ID, Size, and Amount */}
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, -1)}
                                                    className="px-4 py-2 hover:bg-black/5 cursor-pointer transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-2 text-xs tabular-nums w-12 text-center border-x border-black/10">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, 1)}
                                                    className="px-4 py-2 hover:bg-black/5 cursor-pointer transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-sm font-medium tabular-nums">
                                                ${item.price * item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* RIGHT: SUMMARY */}
                        <div className="lg:w-1/3">
                            <div className="bg-white/50 p-10 border border-black/5 sticky top-32">
                                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold mb-10 opacity-60">Summary</h2>

                                <div className="space-y-4 mb-10 border-b border-black/5 pb-10">
                                    <div className="flex justify-between text-xs uppercase tracking-widest opacity-60">
                                        <span>Subtotal</span>
                                        <span className="tabular-nums">${subtotal}</span>
                                    </div>
                                    <div className="flex justify-between text-xs uppercase tracking-widest opacity-60">
                                        <span>Shipping</span>
                                        <span>Calculated next</span>
                                    </div>
                                </div>

                                <div className="flex justify-between font-serif text-2xl italic mb-12 text-[#1A1A1A]">
                                    <span>Total</span>
                                    <span className="tabular-nums">${subtotal}</span>
                                </div>

                                <button className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all cursor-pointer">
                                    Proceed to Checkout
                                </button>

                                <p className="mt-8 text-[8px] uppercase tracking-[0.3em] text-center opacity-30 leading-relaxed">
                                    Complimentary shipping on all archive orders.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;