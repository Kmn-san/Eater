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

    const deleteFromCart = (item) => {
        setCartItems(prev => {
            return prev.filter(cartItem => cartItem.cartId !== item.cartId)
        })
    }

    const decreaseQuantity = (item) => {
        // item is use to tell what to edit
        if (item.quantity <= 1) {
            deleteFromCart(item)
            return
        }
        setCartItems(prev => {

            return prev.map((cartItem) => cartItem.cartId === item.cartId ? {
                ...cartItem,
                quantity: cartItem.quantity - 1
            }
                : cartItem
            )
        })
    }

    const increaseQuantity = (item) => {

        setCartItems(prev => {

            return prev.map((cartItem) => cartItem.cartId === item.cartId ? {
                ...cartItem,
                quantity: cartItem.quantity + 1
            }
                : cartItem
            )
        })
    }

    const clearCart = () => setCartItems([])

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                deleteFromCart,
                decreaseQuantity,
                increaseQuantity,
                clearCart
            }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}