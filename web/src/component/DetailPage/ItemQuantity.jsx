import { Minus, Plus } from 'lucide-react'
import React from 'react'

function ItemQuantity({ setQuantity, quantity }) {
    return (
        <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Extra Pearls</h3>
            <div className="flex items-center gap-3">
                <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className={`btn btn-circle btn-sm border ${quantity <= 1
                        ? "bg-gray-100 border-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                >
                    <Minus size={14} />
                </button>
                <span className="font-bold text-sm w-6 text-center">
                    {quantity}
                </span>
                <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="btn btn-circle btn-sm bg-[#FF5A3C] hover:bg-[#e04a30] text-white border-none"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    )
}

export default ItemQuantity