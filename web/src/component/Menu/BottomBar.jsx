import React from "react";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "../../utlis/formatPrice";

function BottomBar({
    itemCount,
    totalCents,
    onButtonClick,
    disabled = false,
}) {

    return (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="max-w-md mx-auto flex items-center justify-between gap-4">
                {/* Left: Cart Summary */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-[#FF5A3C]/10 flex items-center justify-center">
                            <ShoppingCart size={18} className="text-[#FF5A3C]" />
                        </div>
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-[#FF5A3C] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {itemCount > 99 ? "99+" : itemCount}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <span className="text-[10px] uppercase tracking-wide text-gray-500">
                            Total
                        </span>
                        <span className="text-base font-bold text-[#FF5A3C] truncate">
                            {formatPrice(totalCents)}
                        </span>
                    </div>
                </div>

                {/* Right: CTA Button */}
                <button
                    onClick={onButtonClick}
                    disabled={disabled || itemCount === 0}
                    className={`btn rounded-full border-none px-6 font-semibold flex-1 max-w-[200px] ${disabled || itemCount === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#FF5A3C] hover:bg-[#e04a30] text-white"
                        }`}
                >
                    View Cart
                </button>
            </div>
        </div>
    );
}

export default BottomBar;