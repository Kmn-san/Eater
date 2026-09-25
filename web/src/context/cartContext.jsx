import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(null);

// Compares two selectedOptions objects by the set of selected value ids,
// regardless of key order or array order.
function sameOptions(a = {}, b = {}) {
    const flattenIds = (selectedOptions) =>
        Object.values(selectedOptions)
            .flat()
            .map((value) => value.id)
            .sort()
            .join('|')

    return flattenIds(a) === flattenIds(b)
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])

    const addToCart = (cartItem) => {
        const hasNote = Boolean(cartItem.specialNote?.trim())

        setCart((previous) => {
            // Only merge into an existing line when neither the new nor the
            // existing item has a note attached — a note always gets its own line.
            const existingIndex = hasNote
                ? -1
                : previous.findIndex(
                      (item) =>
                          item.id === cartItem.id &&
                          !item.specialNote?.trim() &&
                          sameOptions(item.selectedOptions, cartItem.selectedOptions)
                  )

            if (existingIndex !== -1) {
                return previous.map((item, index) =>
                    index === existingIndex
                        ? { ...item, quantity: item.quantity + (cartItem.quantity ?? 1) }
                        : item
                )
            }

            return [
                ...previous,
                {
                    ...cartItem,
                    quantity: cartItem.quantity ?? 1,
                    cartItemId: crypto.randomUUID(),
                },
            ]
        })
    }

    const handleIncrease = (cartItemId) => {
        setCart((previous) =>
            previous.map((item) =>
                item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
            )
        )
    }

    const handleDecrease = (cartItemId) => {
        setCart((previous) =>
            previous
                .map((item) =>
                    item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        )
    }

    const handleRemove = (cartItemId) => {
        setCart((previous) =>
            previous.filter((item) => item.cartItemId !== cartItemId)
        )
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, handleIncrease, handleDecrease, handleRemove }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}