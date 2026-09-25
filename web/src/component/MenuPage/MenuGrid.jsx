import { Plus } from 'lucide-react';
import React from 'react'
import { formatPrice } from '../../utlis/formatPrice';

function MenuGrid({ filteredItems, handleOpenDetail, handleAddToCart }) {
    return (
        <div className="grid grid-cols-2 gap-3 px-4">
            {filteredItems.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleOpenDetail(item)}
                    className="relative bg-[#FFFDF8] rounded-xl overflow-hidden border border-[#241A12]/10 flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                >
                    {/* Image */}
                    <div className="relative h-32 w-full bg-[#241A12]/5 overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className={`w-full h-full object-cover ${!item.isAvailable ? "grayscale opacity-60" : ""
                                }`}
                        />
                        {!item.isAvailable && (
                            <div className="absolute -left-9 top-3 w-32 -rotate-45 bg-[#241A12] text-[#FBF3DF] text-[10px] font-bold py-1 text-center shadow-sm">
                                Sold out
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="p-3 flex flex-col flex-1">
                        <h3 className="font-semibold text-sm mb-0.5 leading-snug line-clamp-2">
                            {item.name}
                        </h3>
                        <p className="text-[11px] text-[#241A12]/50 mb-3 line-clamp-1">
                            {item.description}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="inline-block -rotate-2 bg-[#D6402C] text-white text-xs font-bold px-2 py-1 rounded-sm">
                                {formatPrice(item.price)}
                            </span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // prevent card click
                                    handleAddToCart(item);
                                }}
                                disabled={!item.isAvailable}
                                className={`btn btn-xs btn-circle border-none ${item.isAvailable
                                    ? "bg-[#241A12] hover:bg-[#0F6660] text-[#FBF3DF]"
                                    : "bg-[#241A12]/10 text-[#241A12]/30 cursor-not-allowed"
                                    }`}
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MenuGrid