import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (cartItem) => {
        setCart((previous) => [
            ...previous,
            cartItem
        ])
    }
    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}