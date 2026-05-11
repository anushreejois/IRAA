import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLog = async () => {
            if (!user?.id) return;
            try {
                const res = await API.get(`/orders/user/${user.id}`);
                setOrders(res.data);
            } catch (err) {
                console.error("Log retrieval failed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchLog();
    }, [user]);

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] selection:bg-black selection:text-white">
            <Navbar />

            <div className="px-12 py-24 max-w-6xl mx-auto">
                <header className="mb-24 border-b border-black/5 pb-12">
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold block mb-4">
                        Member Archive Log
                    </span>
                    <h1 className="text-7xl font-serif italic text-[#1A1A1A] tracking-tighter">Acquisitions.</h1>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-black/20"></div>
                        <p className="text-[9px] uppercase tracking-widest opacity-40">
                            Member Identifier: {user?.email}
                        </p>
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64 italic font-serif opacity-30 text-xl animate-pulse">
                        Accessing Vault...
                    </div>
                ) : orders.length === 0 ? (
                    <div className="py-32 text-center border border-dashed border-black/10">
                        <p className="font-serif italic text-2xl opacity-20">The archive is currently empty.</p>
                        <button
                            onClick={() => window.location.href = '/shop'}
                            className="mt-8 text-[9px] uppercase tracking-[0.4em] font-bold hover:tracking-[0.6em] transition-all"
                        >
                            Explore Collection →
                        </button>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-32"
                    >
                        {orders.map((order) => (
                            <motion.div key={order.id} variants={itemVariants} className="group">
                                <div className="flex justify-between items-end mb-10 border-b border-black/10 pb-6">
                                    <div>
                                        <h3 className="text-[11px] font-bold uppercase tracking-[0.4em]">
                                            Manifest № {order.id.toString().padStart(6, '0')}
                                        </h3>
                                        <p className="text-[10px] opacity-40 mt-2 uppercase tracking-widest">
                                            {new Date(order.orderDate).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'long', year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        {/* FIXED: Closing tag was </div>, now corrected to </span> */}
                                        <span className="px-3 py-1 border border-black/10 text-[8px] font-bold uppercase tracking-widest opacity-40 rounded-full">
                                            {order.status || 'Archived'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                                    <div className="lg:col-span-7 space-y-8">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-8 items-center group/item">
                                                <div className="w-24 aspect-[3/4] bg-[#EFEEEA] overflow-hidden relative">
                                                    <img
                                                        src={item.product?.imageUrl || "https://images.unsplash.com/photo-1434389677669-e08b4cac3105"}
                                                        className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-700"
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-serif italic text-2xl text-[#1A1A1A] group-hover/item:opacity-60 transition-opacity">
                                                        {item.product?.title}
                                                    </h4>
                                                    <div className="flex gap-6 mt-3">
                                                        <p className="text-[9px] uppercase tracking-widest opacity-40">
                                                            Unit Price: ${item.price}
                                                        </p>
                                                        <p className="text-[9px] uppercase tracking-widest opacity-40">
                                                            Quantity: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="lg:col-span-5 lg:border-l lg:border-black/5 lg:pl-16 flex flex-col justify-center">
                                        <div className="space-y-4">
                                            <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 block">
                                                Shipping Logistics
                                            </span>
                                            <p className="font-serif italic text-lg opacity-70 leading-relaxed">
                                                {order.shippingAddress}
                                            </p>
                                        </div>
                                        <div className="mt-12 pt-8 border-t border-black/5">
                                            <span className="text-[9px] uppercase tracking-[0.4em] opacity-30 block mb-2">
                                                Total Valuation
                                            </span>
                                            <div className="font-serif text-5xl italic text-[#1A1A1A]">
                                                ${order.totalPrice?.toLocaleString() || order.totalAmount?.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;