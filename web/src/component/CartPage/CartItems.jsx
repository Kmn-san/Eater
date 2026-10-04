import { Minus, Plus, Trash2, UtensilsCrossed, StickyNote } from 'lucide-react'
import { formatPrice } from '../../utlis/formatPrice'
import { useCart } from '../../context/CartContext'

function CartItems({ cartItems, availability }) {
    const { deleteFromCart, decreaseQuantity, increaseQuantity } = useCart()

    return (
        <section className="space-y-3">
            {cartItems.map((item) => {
                const availableItem = availability.find(
                    (available) => available.id === item.id
                )

                const isAvailable = availableItem?.is_available === true

                const optionValue = item.selectedOption.reduce(
                    (sum, value) => sum + value.price_delta_cents,
                    0
                )

                const itemprice =
                    (item.basePrice + optionValue) * item.quantity

                return (
                    <div
                        key={item.cartId}
                        className="flex gap-4 rounded-xl border border-[#241A12]/10 bg-[#FFFDF8] p-4"
                    >
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-24 w-24 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-[#FBF3DF]">
                                <UtensilsCrossed size={24} />
                            </div>
                        )}

                        <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="font-semibold">
                                        {item.name}
                                    </h2>

                                    {item.selectedOption.length > 0 && (
                                        <p className="text-sm text-[#241A12]/60">
                                            {item.selectedOption
                                                .map((option) => option.name)
                                                .join(", ")}
                                        </p>
                                    )}

                                    {item.specialNote && (
                                        <div className="mt-1 flex items-center gap-1 text-sm text-[#241A12]/60">
                                            <StickyNote size={14} />
                                            <span>{item.specialNote}</span>
                                        </div>
                                    )}

                                    {!isAvailable && (
                                        <p className="mt-1 text-sm text-red-500">
                                            Currently unavailable
                                        </p>
                                    )}
                                </div>

                                <button
                                    onClick={() => deleteFromCart(item)}
                                >
                                    <Trash2 />
                                </button>
                            </div>

                            <div className="mt-auto flex items-end justify-between pt-3">
                                <span>{formatPrice(itemprice)}</span>

                                {isAvailable ? (
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item)
                                            }
                                        >
                                            <Minus />
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(item)
                                            }
                                        >
                                            <Plus />
                                        </button>
                                    </div>
                                ) : (
                                    <span className="text-sm text-red-500">
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}
        </section>
    )
}

export default CartItems
