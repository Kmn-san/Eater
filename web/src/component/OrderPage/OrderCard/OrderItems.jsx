import React from 'react'
import { formatPrice } from '../../../utlis/formatPrice'
import { UtensilsCrossed } from 'lucide-react'

function OrderItems({ order }) {

    return (
        <div className="space-y-4 mb-4">
            {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                    {/* Image / Fallback */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <UtensilsCrossed
                                    size={22}
                                    className="text-[#D6402C]"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                            {item.name}
                        </p>
                        {item.options.length > 0 && (
                            <div className="text-[11px] text-gray-500 mt-0.5">
                                {item.options.map((option) => `${option.value}`)
                                    .join(" · ")}
                            </div>
                        )}
                        {item.note && (
                            <p className="text-[11px] text-gray-500 italic">
                                Note: {item.note}
                            </p>
                        )}
                        <p className="text-xs font-bold text-[#FF5A3C] mt-0.5">
                            {formatPrice(item.unitPriceCents)}
                        </p>
                    </div>

                    <div className="w-12 text-center">
                        <span className="text-sm font-semibold text-gray-600">
                            × {item.quantity}
                        </span>
                    </div>

                    <div className="w-20 text-right">
                        <span className="text-sm font-bold">
                            {formatPrice(item.subtotalCents)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderItems