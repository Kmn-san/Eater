import { Minus, Plus, Trash2, UtensilsCrossed } from 'lucide-react';

function CartItemCard({ item, onIncrease, onDecrease, onRemove }) {
    const formatPrice = (cents) => `RM ${(cents / 100).toFixed(2)}`;

    // selectedOptions looks like: { [optionId]: [{ id, name, price_delta_cents }, ...] }
    const optionsSummary = item.selectedOptions
        ? Object.values(item.selectedOptions)
              .flat()
              .map((value) => value.name)
              .join(', ')
        : '';

    return (
        <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
            <div className="flex gap-3">
                {/* Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                            <UtensilsCrossed
                                size={25}
                                color="#9ca3af"
                            />
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-semibold text-sm text-[#1F1F1F] truncate">
                            {item.name}
                        </h3>
                        <button
                            onClick={() => onRemove(item.cartItemId)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>

                    {optionsSummary && (
                        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                            {optionsSummary}
                        </p>
                    )}

                    {item.specialNote && (
                        <p className="text-[11px] text-gray-400 italic mt-0.5 line-clamp-1">
                            Note: {item.specialNote}
                        </p>
                    )}

                    <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-[#FF5A3C] text-sm">
                            {formatPrice(item.price_cents)}
                        </span>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onDecrease(item.cartItemId)}
                                className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
                            >
                                <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => onIncrease(item.cartItemId)}
                                className="w-6 h-6 rounded-full bg-[#FF5A3C] hover:bg-[#e04a30] text-white flex items-center justify-center"
                            >
                                <Plus size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItemCard