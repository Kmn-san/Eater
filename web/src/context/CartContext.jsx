import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

const selectionKey = (selected = []) =>
    selected.map((v) => `${v.optionId}:${v.id}`).sort().join("|");

const isSameItem = (cartItem, item) => {
    return (cartItem.id === item.id
        && cartItem.specialNote === item.specialNote
        && selectionKey(cartItem.selectedOption) === selectionKey(item.selectedOption)
    )
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const cartId = crypto.randomUUID();
        setCartItems(prev => {
            const existingItem = prev.find(cartItem => isSameItem(cartItem, item)
            )
            if (existingItem) {
                return prev.map(cartItem => cartItem ===
                    existingItem ? {
                    ...cartItem,
                    quantity: cartItem.quantity + item.quantity
                }
                    : cartItem
                )
            }
            return [
                ...prev,
                {
                    ...item, cartId
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