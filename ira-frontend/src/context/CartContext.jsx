import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // 1. Load cart from local storage on startup
    useEffect(() => {
        const savedCart = localStorage.getItem('ira_bag');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    // 2. Save to local storage whenever cart changes
    useEffect(() => {
        localStorage.setItem('ira_bag', JSON.stringify(cart));
    }, [cart]);

    // 3. Add to Cart (Now handles Size)
    const addToCart = (product, selectedSize) => {
        setCart((prevCart) => {
            // We check for BOTH the ID and the Size to find a match
            const exists = prevCart.find(item =>
                item.id === product.id && item.size === selectedSize
            );

            if (exists) {
                return prevCart.map(item =>
                    (item.id === product.id && item.size === selectedSize)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            // If it's new, we add the product + the selected size
            return [...prevCart, { ...product, quantity: 1, size: selectedSize }];
        });

        alert(`${product.title} (Size: ${selectedSize}) added to your Bag.`);
    };

    // 4. Remove from Cart (Needs ID and Size to be specific)
    const removeFromCart = (productId, size) => {
        setCart((prev) => prev.filter(item =>
            !(item.id === productId && item.size === size)
        ));
    };

    // 5. Update Quantity (Needs ID and Size to be specific)
    const updateQuantity = (productId, size, amount) => {
        setCart((prev) =>
            prev.map(item =>
                (item.id === productId && item.size === size)
                    ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                    : item
            )
        );
    };

    // 6. Provide all these tools to the rest of the app
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);