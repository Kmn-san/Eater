import React from 'react'
import { formatPrice } from '../../utlis/formatPrice'

function BottomCartBar({totalPrice,handleAddToCart,item}) {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wide text-gray-500">
                        Total
                    </span>
                    <span className="text-lg font-bold text-[#FF5A3C]">
                        {formatPrice(totalPrice)}
                    </span>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={!item.is_available}
                    className={`btn flex-1 rounded-full border-none font-semibold max-w-55 ${item.is_available
                        ? "bg-[#FF5A3C] hover:bg-[#e04a30] text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                >
                    {item.is_available
                        ? `Add to Cart — ${formatPrice(totalPrice)}`
                        : "Sold Out"}
                </button>
            </div>
        </div>
    )
}

export default BottomCartBar