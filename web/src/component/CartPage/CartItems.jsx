import { Minus, Plus, Trash2, UtensilsCrossed, StickyNote } from 'lucide-react'
import { formatPrice } from '../../utlis/formatPrice'
import { useCart } from '../../context/CartContext'

function CartItems({ cartItems }) {
    const { deleteFromCart, decreaseQuantity, increaseQuantity } = useCart()
    return (
        <section className="space-y-3">
            {cartItems.map((item) => (
                <div
                    key={item.cartId}
                    className="flex gap-4 rounded-xl border border-[#241A12]/10 bg-[#FFFDF8] p-4"
                >
                    {/* Image */}
                    {item.image ?
                        (<img
                            src={item.image}
                            alt={item.name}
                            className="h-24 w-24 rounded-lg object-cover"
                        />) :
                        (<div className="h-24 w-24 rounded-lg bg-[#241A12]/5 flex items-center justify-center shrink-0">
                            <UtensilsCrossed size={32} className="text-[#D6402C]" />
                        </div>)}

                    {/* Information */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex justify-between gap-4">
                            <div className="min-w-0">
                                <h2 className="font-semibold">{item.name}</h2>

                                {item.selectedOption.length > 0 && (
                                    <p className="mt-1 text-sm text-[#241A12]/50">
                                        {item.selectedOption.map((v) => v.name).join(" · ")}
                                    </p>
                                )}
                                {/* Note */}
                                {item.specialNote && (
                                    <div className="mt-1.5 flex items-start gap-1.5 text-xs text-[#241A12]/60">
                                        <StickyNote size={14} className="text-[#E3A73B] mt-0.5 shrink-0" />
                                        <p className="min-w-0 wrap-break-word">{item.specialNote}</p>
                                    </div>
                                )}
                            </div>

                            <button
                                className="text-[#241A12]/30 hover:text-[#D6402C] shrink-0"
                                onClick={() => deleteFromCart(item)}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="mt-auto flex items-end justify-between pt-3">
                            {/* Price */}
                            <span className="inline-block -rotate-2 bg-[#D6402C] text-white text-xs font-bold px-2 py-1 rounded-sm">
                                {formatPrice(item.totalPrice)}
                            </span>

                            {/* Quantity */}
                            <div className="flex items-center rounded-lg border border-[#241A12]/15 overflow-hidden">
                                <button
                                    className="p-2 text-[#241A12] hover:bg-[#0F6660] hover:text-white transition-colors"
                                    onClick={() => decreaseQuantity(item)}
                                >
                                    <Minus size={16} />
                                </button>

                                <span className="min-w-8 text-center text-sm font-medium">
                                    {item.quantity}
                                </span>

                                <button
                                    className="p-2 text-[#241A12] hover:bg-[#0F6660] hover:text-white transition-colors"
                                    onClick={() => increaseQuantity(item)}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default CartItems