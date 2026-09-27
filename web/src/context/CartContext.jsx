import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const isSameItem = (cartItem, item) => {
        cartItem.id === item.id &&
        cartItem.specialNote === item.specialNote &&
        cartItem.selectedOptions === item.selectedOptions
    }

    const addToCart = (item) => {
        setCartItems(prev => {
            const existingItem = prev.find(cartItem => isSameItem(cartItem, item)
            )
            if (existingItem) {
                return prev.map(cartItem =>
                    isSameItem(cartItem, item) ? {
                        ...cartItem,
                        quantity: cartItem.quantity + item.quantity
                    }
                        : cartItem
                )
            }
            return [
                ...prev,
                {
                    ...item
                }
            ]
        })
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}