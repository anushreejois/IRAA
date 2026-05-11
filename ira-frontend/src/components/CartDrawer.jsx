import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartDrawer = () => {
    const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Dark Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] cursor-pointer"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-[#F4F1EA] z-[101] shadow-2xl flex flex-col"
                    >
                        <div className="p-10 flex flex-col h-full">
                            <header className="flex justify-between items-center mb-12">
                                <h2 className="font-serif text-4xl text-[#2D2D2D] italic">Your Bag.</h2>
                                <button onClick={closeCart} className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">
                                    Close [X]
                                </button>
                            </header>

                            {/* ITEM LIST - Structured as cards */}
                            <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                                {cart.length === 0 ? (
                                    <p className="font-serif italic opacity-30 text-center mt-20 text-xl">The archive is empty.</p>
                                ) : (
                                    cart.map(item => (
                                        <div key={`${item.id}-${item.size}`} className="bg-white border border-[#E5E1DA] p-5 rounded-sm flex gap-6 relative shadow-sm">
                                            <div className="w-24 h-24 bg-[#F9F7F2] p-3 flex-shrink-0">
                                                <img src={item.image_url || item.imageUrl} className="w-full h-full object-contain" alt="" />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-center">
                                                <h4 className="font-serif text-lg text-[#2D2D2D] leading-tight mb-1">{item.title}</h4>
                                                <div className="text-[8px] font-bold uppercase tracking-widest text-[#B3541E] mb-3">
                                                    Size: {item.size}
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <span className="text-[#B3541E] font-bold text-base">₹{item.price.toLocaleString('en-IN')}</span>

                                                    {/* Compact Quantity Toggle */}
                                                    <div className="flex items-center border border-[#E5E1DA] rounded-sm bg-white">
                                                        <button onClick={() => updateQuantity(item.id, item.size, -1)} className="px-3 py-1 text-xs">-</button>
                                                        <span className="px-3 py-1 text-[10px] border-x border-[#E5E1DA] font-bold">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.size, 1)} className="px-3 py-1 text-xs">+</button>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id, item.size)}
                                                className="absolute top-4 right-4 text-[10px] opacity-20 hover:opacity-100 transition-opacity"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* FOOTER */}
                            <footer className="mt-auto pt-10 border-t border-[#E5E1DA]">
                                <div className="flex justify-between items-baseline mb-10">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">Total Estimate</span>
                                    <span className="font-serif text-4xl italic text-[#B3541E]">
                                        ₹{total.toLocaleString('en-IN')}
                                    </span>
                                </div>

                                <button
                                    onClick={() => { closeCart(); navigate('/cart'); }}
                                    className="w-full bg-[#2D2D2D] text-white py-6 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-black transition-all shadow-xl active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </button>
                                <p className="text-center mt-6 text-[8px] uppercase tracking-[0.3em] opacity-20 font-bold">
                                    Inventory secured by IRA Protocol.
                                </p>
                            </footer>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;