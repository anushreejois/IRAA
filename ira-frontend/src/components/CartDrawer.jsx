import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { cart, isCartOpen, closeCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    return (
        <>
            {/* 1. BLUR OVERLAY */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
                    isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeCart}
            />

            {/* 2. SIDE PANEL */}
            <div className={`fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#F9F7F2] z-[101] shadow-2xl transition-transform duration-700 ease-in-out ${
                isCartOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="p-10 h-full flex flex-col">
                    <header className="flex justify-between items-center mb-12">
                        <h2 className="font-serif text-3xl italic">Your Bag.</h2>
                        <button onClick={closeCart} className="text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">
                            Close [X]
                        </button>
                    </header>

                    {/* 3. SCROLLABLE ITEMS */}
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
                        {cart.length === 0 ? (
                            <p className="font-serif italic opacity-30 text-center mt-20">The archive is empty.</p>
                        ) : (
                            cart.map(item => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-6 items-center border-b border-black/5 pb-8">
                                    <img src={item.imageUrl} className="w-20 h-24 object-cover bg-[#EFEEEA]" alt="" />
                                    <div className="flex-1">
                                        <h4 className="font-serif text-lg italic">{item.title}</h4>
                                        <div className="text-[9px] uppercase tracking-widest opacity-40 mt-1">
                                            Size: {item.size} — Qty: {item.quantity}
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.size)}
                                            className="text-[9px] uppercase tracking-widest border-b border-black mt-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <div className="font-serif italic">${item.price * item.quantity}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* 4. FOOTER */}
                    <footer className="mt-auto pt-10 border-t border-black/10">
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-[10px] uppercase tracking-widest font-bold">Total Estimate</span>
                            <span className="font-serif text-2xl italic">
                                ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                            </span>
                        </div>
                        <button
                            onClick={() => { closeCart(); navigate('/checkout'); }}
                            className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#222] transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default CartDrawer;