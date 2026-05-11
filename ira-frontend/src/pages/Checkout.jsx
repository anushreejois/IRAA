import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [address, setAddress] = useState({ street: '', city: '', zip: '' });

    // Calculate total precisely
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();

        // 1. Map cart items to the DTO format the Backend expects
        const items = cart.map(item => ({
            product: { id: item.id },
            quantity: item.quantity,
            price: item.price
        }));

        // 2. Prepare the Request Body
        const orderPayload = {
            items: items,
            totalPrice: subtotal,
            shippingAddress: `${address.street}, ${address.city}, ${address.zip}`
        };

        try {
            // 3. Extract the User ID from the Auth context
            const userId = user?.id || user?.userId;

            if (!userId) {
                alert("Member identity not found. Please sign in again.");
                return;
            }

            // 4. POST request with userId as a Query Parameter
            await API.post(`/orders/place?userId=${userId}`, orderPayload);

            // 5. Success Flow
            alert("Acquisition Successful. The Archive has recorded your manifest.");

            if (clearCart) clearCart(); // Clean up the bag
            navigate('/orders'); // Redirect to the Archivist's Log

        } catch (err) {
            console.error("Acquisition Failed:", err.response?.data || err.message);
            alert("The Archive could not process this order. Please verify your connection.");
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white">
            <Navbar />

            <div className="max-w-5xl mx-auto py-24 px-12">
                <header className="mb-20 text-center">
                    <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 block mb-4">Secure Checkout</span>
                    <h1 className="font-serif text-6xl italic text-[#1A1A1A] tracking-tighter">Finalize Acquisition.</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* LEFT: Logistics Form */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleCheckout} className="space-y-12">
                            <section>
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-10 pb-4 border-b border-black/5">
                                    Shipping Logistics
                                </h2>
                                <div className="space-y-8">
                                    <input
                                        type="text" placeholder="STREET ADDRESS" required
                                        className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-black text-[11px] tracking-[0.2em] transition-colors"
                                        onChange={(e) => setAddress({...address, street: e.target.value})}
                                    />
                                    <div className="grid grid-cols-2 gap-8">
                                        <input
                                            type="text" placeholder="CITY" required
                                            className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-black text-[11px] tracking-[0.2em] transition-colors"
                                            onChange={(e) => setAddress({...address, city: e.target.value})}
                                        />
                                        <input
                                            type="text" placeholder="ZIP CODE" required
                                            className="w-full bg-transparent border-b border-black/10 py-4 outline-none focus:border-black text-[11px] tracking-[0.2em] transition-colors"
                                            onChange={(e) => setAddress({...address, zip: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </section>

                            <button type="submit" className="w-full bg-[#1A1A1A] text-white py-8 text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-black transition-all duration-500 shadow-xl">
                                Confirm Purchase — ${subtotal.toLocaleString()}
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: Order Manifest Summary */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 bg-white/40 p-10 border border-black/5 backdrop-blur-sm">
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mb-10">Manifest Summary</h2>

                            <div className="space-y-6 mb-12">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center group">
                                        <div className="flex flex-col">
                                            <span className="font-serif italic text-lg text-[#1A1A1A]">{item.title}</span>
                                            <span className="text-[9px] uppercase tracking-widest opacity-30 mt-1">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="font-serif italic opacity-60 text-sm">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-black/10 pt-8 flex justify-between items-baseline">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Total Valuation</span>
                                <span className="font-serif text-4xl italic text-[#1A1A1A]">
                                    ${subtotal.toLocaleString()}
                                </span>
                            </div>

                            <p className="mt-12 text-[8px] uppercase tracking-widest opacity-20 text-center leading-relaxed">
                                By confirming, you agree to the archival storage <br/> and logistics terms of IRA.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;