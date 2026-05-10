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
            setCart(JSON.parse(savedCart));
        }
        if (user) {
            syncCartWithBackend();
        }
    }, [user]);

    const syncCartWithBackend = async () => {
        try {
            const res = await API.get(`/cart/${user.id}`);
            const backendItems = res.data.items.map(item => ({
                ...item.product,
                quantity: item.quantity,
                size: item.size || 'M'
            }));
            setCart(backendItems);
            localStorage.setItem('ira_bag', JSON.stringify(backendItems));
        } catch (err) {
            console.error("Archive sync failed:", err);
        }
    };

    // UI CONTROL METHODS
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // ADD TO CART (Now triggers the drawer to open automatically)
    const addToCart = async (product, selectedSize) => {
        const newItem = { ...product, quantity: 1, size: selectedSize };

        setCart((prevCart) => {
            const exists = prevCart.find(item =>
                item.id === product.id && item.size === selectedSize
            );

            let updatedCart;
            if (exists) {
                updatedCart = prevCart.map(item =>
                    (item.id === product.id && item.size === selectedSize)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                updatedCart = [...prevCart, newItem];
            }
            localStorage.setItem('ira_bag', JSON.stringify(updatedCart));
            return updatedCart;
        });

        // Trigger the luxury experience: Open the drawer immediately
        openCart();

        if (user) {
            try {
                await API.post(`/cart/add/${user.id}`, {
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
            const updatedCart = prev.filter(item =>
                !(item.id === productId && item.size === size)
            );
            localStorage.setItem('ira_bag', JSON.stringify(updatedCart));
            return updatedCart;
        });

        if (user) {
            try {
                await API.delete(`/cart/remove/${user.id}/${productId}`);
            } catch (err) {
                console.error("Remote remove failed", err);
            }
        }
    };

    const updateQuantity = async (productId, size, amount) => {
        setCart((prev) => {
            const updatedCart = prev.map(item =>
                (item.id === productId && item.size === size)
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            );
            localStorage.setItem('ira_bag', JSON.stringify(updatedCart));
            return updatedCart;
        });

        // Potential backend update logic here...
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
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);