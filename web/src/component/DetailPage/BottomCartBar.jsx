import React, { useState } from 'react'
import { formatPrice } from '../../utlis/formatPrice'

function BottomCartBar({ totalPrice, isOptionValue, item, handleAddToCart, showNotice }) {

    return (
        <>
            {/* Notice */}
            {
                showNotice && !isOptionValue && (
                    <div className="fixed bottom-24 left-4 right-4 z-40">
                        <div className="mx-auto max-w-md rounded-xl bg-gray-900 px-4 py-3 text-center text-sm text-white shadow-lg">
                            Please select the required options first.
                        </div>
                    </div>
                )
            }
            <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-100 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">

                <div className="mx-auto flex max-w-md items-center gap-4">

                    <div className="flex shrink-0 flex-col">

                        <span className="text-[10px] uppercase tracking-wide text-gray-500">
                            Total
                        </span>
                        <span className="text-lg font-bold text-[#FF5A3C]">
                            {formatPrice(totalPrice)}
                        </span>
                    </div>

                    <button
                        type='button'
                        disabled={!item.is_available}
                        className={`btn flex-1 rounded-full border-none font-semibold text-white ${isOptionValue
                            ? "bg-[#FF5A3C] hover:bg-[#e04a30]"
                            : "cursor-not-allowed bg-gray-300"
                            }`}
                        onClick={handleAddToCart}
                    >
                        {item.is_available
                            ? `Add to Cart — ${formatPrice(totalPrice)}`
                            : "Sold Out"}
                    </button>
                </div>
            </div >
        </>
    )
}

export default BottomCartBar