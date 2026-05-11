import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLog = async () => {
            const userId = user?.id || user?.userId;
            if (!userId) return;
            try {
                const res = await API.get(`/orders/user/${userId}`);
                setOrders(res.data);
            } catch (err) {
                console.error("Log retrieval failed:", err);
            } finally {
                setTimeout(() => setLoading(false), 400);
            }
        };
        fetchLog();
    }, [user]);

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.215, 0.61, 0.355, 1] } }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white overflow-x-hidden">
            <Navbar />

            <div className="px-12 py-24 max-w-7xl mx-auto">
                <header className="mb-24 border-b border-black/5 pb-16">
                    <span className="text-[10px] uppercase tracking-[0.6em] opacity-40 font-bold block mb-4">
                        Member Archive Log
                    </span>
                    <h1 className="text-8xl font-serif italic text-[#1A1A1A] tracking-tighter">Acquisitions.</h1>
                    <div className="mt-10 flex items-center gap-6">
                        <div className="h-[1px] w-12 bg-black/20"></div>
                        <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">
                            Member ID: {user?.email}
                        </p>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            className="flex justify-center items-center h-64 italic font-serif text-2xl"
                        >
                            Accessing Archive Vault...
                        </motion.div>
                    ) : orders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-32 text-center border border-black/5 bg-white/20 backdrop-blur-sm"
                        >
                            <p className="font-serif italic text-3xl opacity-20">The archive is currently empty.</p>
                            <button
                                onClick={() => window.location.href = '/shop'}
                                className="mt-10 text-[10px] uppercase tracking-[0.5em] font-bold border-b border-black/20 pb-1 hover:border-black transition-all"
                            >
                                Explore Collection →
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-40"
                        >
                            {orders.map((order) => (
                                <motion.div key={order.id} variants={itemVariants} className="group">
                                    <div className="flex justify-between items-end mb-12 border-b border-black/10 pb-8">
                                        <div>
                                            <h3 className="text-[12px] font-bold uppercase tracking-[0.5em] text-[#1A1A1A]">
                                                Manifest № {order.id.toString().padStart(6, '0')}
                                            </h3>
                                            <p className="text-[10px] opacity-40 mt-3 uppercase tracking-[0.3em] font-medium">
                                                {new Date(order.orderDate).toLocaleDateString('en-IN', {
                                                    day: 'numeric', month: 'long', year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="px-5 py-2 border border-black/10 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 rounded-full bg-black/5">
                                                {order.status || 'Archived'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                                        {/* LEFT: PRODUCTS LIST */}
                                        <div className="lg:col-span-7 space-y-12">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-10 items-start group/item">
                                                    <div className="w-28 aspect-[3/4] bg-[#EFEEEA] overflow-hidden relative shadow-sm border border-black/5">
                                                        {/* FIX: image_url property logic */}
                                                        <img
                                                            src={item.product?.image_url || item.product?.imageUrl || "/landing page.png"}
                                                            className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-[1500ms]"
                                                            alt=""
                                                            onError={(e) => { e.target.src = "/landing page.png"; }}
                                                        />
                                                    </div>
                                                    <div className="flex-1 py-1 border-b border-black/5 pb-10">
                                                        <h4 className="font-serif italic text-3xl text-[#1A1A1A] group-hover/item:opacity-60 transition-opacity">
                                                            {item.product?.title}
                                                        </h4>
                                                        <div className="flex gap-10 mt-6 font-bold">
                                                            <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                                                                {/* FIX: Rupee Formatting */}
                                                                Unit: ₹{item.price?.toLocaleString('en-IN')}
                                                            </p>
                                                            <p className="text-[9px] uppercase tracking-[0.3em] opacity-40">
                                                                Qty: {item.quantity}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* RIGHT: LOGISTICS & TOTAL */}
                                        <div className="lg:col-span-5 lg:border-l lg:border-black/5 lg:pl-20 flex flex-col justify-center">
                                            <div className="space-y-6">
                                                <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 block font-bold">
                                                    Shipping Logistics
                                                </span>
                                                <p className="font-serif italic text-2xl text-[#1A1A1A] opacity-80 leading-relaxed max-w-sm">
                                                    {order.shippingAddress}
                                                </p>
                                            </div>
                                            <div className="mt-16 pt-10 border-t border-black/5">
                                                <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 block mb-4 font-bold">
                                                    Total Valuation
                                                </span>
                                                {/* FIX: Rupee Formatting for Total */}
                                                <div className="font-serif text-7xl italic text-[#1A1A1A] tracking-tighter">
                                                    ₹{order.totalPrice?.toLocaleString('en-IN') || order.totalAmount?.toLocaleString('en-IN')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default OrderHistory;