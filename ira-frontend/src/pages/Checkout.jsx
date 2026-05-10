import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
    const { cart, totalItems } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [address, setAddress] = useState({ street: '', city: '', zip: '' });
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();

        const orderPayload = {
            userMail: user?.userMail, // Linking the order to the logged-in user
            items: cart,
            totalPrice: subtotal,
            shippingAddress: `${address.street}, ${address.city}, ${address.zip}`
        };

        try {
            await placeOrder(orderPayload);
            alert("Order archived successfully. Your artifacts are being prepared.");
            // Logic to clear cart would go here
            navigate('/shop');
        } catch (err) {
            console.error("Order failed", err);
            alert("The Archive could not process this order. Please check your connection.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2]">
            <Navbar />

            <div className="max-w-4xl mx-auto py-24 px-6">
                <h1 className="font-serif text-5xl italic mb-16 text-center">Finalize Acquisition.</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    {/* LEFT: SHIPPING FORM */}
                    <form onSubmit={handleCheckout} className="space-y-8">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-10">Shipping Logistics</h2>

                        <div className="space-y-6">
                            <input
                                type="text" placeholder="STREET ADDRESS" required
                                className="w-full bg-transparent border-b border-black/10 py-3 outline-none focus:border-black text-[10px] tracking-widest"
                                onChange={(e) => setAddress({...address, street: e.target.value})}
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text" placeholder="CITY" required
                                    className="w-1/2 bg-transparent border-b border-black/10 py-3 outline-none focus:border-black text-[10px] tracking-widest"
                                    onChange={(e) => setAddress({...address, city: e.target.value})}
                                />
                                <input
                                    type="text" placeholder="ZIP CODE" required
                                    className="w-1/2 bg-transparent border-b border-black/10 py-3 outline-none focus:border-black text-[10px] tracking-widest"
                                    onChange={(e) => setAddress({...address, zip: e.target.value})}
                                />
                            </div>
                        </div>

                        <button className="w-full bg-[#1A1A1A] text-white py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black transition-all mt-10">
                            Confirm Purchase — ${subtotal}
                        </button>
                    </form>

                    {/* RIGHT: SUMMARY */}
                    <div className="bg-white/30 p-10 border border-black/5">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-8">Manifest</h2>
                        <div className="space-y-4 mb-8">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.size}`} className="flex justify-between text-[11px] tracking-tighter">
                                    <span>{item.title} (x{item.quantity})</span>
                                    <span className="tabular-nums">${item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-black/5 pt-6 flex justify-between font-serif text-xl italic">
                            <span>Total</span>
                            <span>${subtotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;