import React from 'react'
import { formatPrice } from '../../utlis/formatPrice';

function ItemDetail({ item }) {

    return (
        <div className="mb-6 flex items-start justify-between gap-4">

            <div className="min-w-0">

                <h1 className="text-2xl font-bold">
                    {item.item_name}
                </h1>

                <p className="mt-1 text-sm leading-snug text-gray-500">
                    {item.description || ""}
                </p>

            </div>

            <span className="shrink-0 text-xl font-bold text-[#FF5A3C]">
                {formatPrice(item.price_cents)}
            </span>

        </div>

    )
}

export default ItemDetail