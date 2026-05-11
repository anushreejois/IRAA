import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import API from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    // UI STATE: Controls the Slide-out Drawer visibility
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Initial Load Logic
    useEffect(() => {
        const savedCart = localStorage.getItem('ira_bag');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse local bag", e);
            }
        }

        // Only attempt sync if we have a valid user ID
        if (user?.id || user?.userId) {
            syncCartWithBackend();
        }
    }, [user]);

    const syncCartWithBackend = async () => {
        const userId = user?.id || user?.userId;
        if (!userId) return;

        try {
            const res = await API.get(`/cart/${userId}`);

            // CRITICAL FIX: Ensure res.data and res.data.items exist before mapping
            if (res.data && res.data.items) {
                const backendItems = res.data.items.map(item => ({
                    ...item.product,
                    quantity: item.quantity,
                    size: item.size || 'M'
                }));
                setCart(backendItems);
                localStorage.setItem('ira_bag', JSON.stringify(backendItems));
            }
        } catch (err) {
            console.error("Archive sync failed:", err);
            // Don't crash the UI if the backend is unreachable
        }
    };

    // UI CONTROL METHODS
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // CLEAR CART: Needed after successful purchase
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('ira_bag');
    };

    // ADD TO CART
    const addToCart = async (product, selectedSize) => {
        const newItem = { ...product, quantity: 1, size: selectedSize };

        setCart((prevCart) => {
            // Safety check for empty prevCart
            const currentCart = prevCart || [];
            const exists = currentCart.find(item =>
                item.id === product.id && item.size === selectedSize
            );

            let updatedCart;
            if (exists) {
                updatedCart = currentCart.map(item =>
                    (item.id === product.id && item.size === selectedSize)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...currentCart, newItem];
            }
            localStorage.setItem('ira_bag', JSON.stringify(updatedCart));
            return updatedCart;
        });

        openCart();

        const userId = user?.id || user?.userId;
        if (userId) {
            try {
                await API.post(`/cart/add/${userId}`, {
                    productId: product.id,
                    quantity: 1,
                    size: selectedSize
                });
            } catch (err) {
                console.error("Remote add failed", err);
            }
        }
    };

    const removeFromCart = async (productId, size) => {
        setCart((prev) => {
            const updatedCart = (prev || []).filter(item =>
                !(item.id === productId && item.size === size)
            );
            localStorage.setItem('ira_bag', JSON.stringify(updatedCart));
            return updatedCart;
        });

        const userId = user?.id || user?.userId;
        if (userId) {
            try {
                await API.delete(`/cart/remove/${userId}/${productId}`);
            } catch (err) {
                console.error("Remote remove failed", err);
            }
        }
    };

    const updateQuantity = async (productId, size, amount) => {
        setCart((prev) => {
            const updatedCart = (prev || []).map(item =>
                (item.id === productId && item.size === size)
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            );
            localStorage.setItem('ira_bag', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{
            cart,
            isCartOpen,
            openCart,
            closeCart,
            toggleCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart // Exporting this for Checkout.jsx
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);