import React from 'react'
import { formatPrice } from '../../utlis/formatPrice'

function ItemDetail({ item, basePrice }) {
    return (
        <div className="flex justify-between items-start mb-6 gap-4">
            <div className="min-w-0">
                <h1 className="text-2xl font-bold mb-1">{item.name}</h1>
                <p className="text-sm text-gray-500 leading-snug">
                    {item.description || "Deliciously crafted for you."}
                </p>
            </div>
            <span className="text-xl font-bold text-[#FF5A3C] whitespace-nowrap">
                {formatPrice(item.price_cents)}
            </span>
        </div>
    )
}

export default ItemDetail